import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { FilePlus2, Save, Type, AlignLeft, Clock, X } from "lucide-react";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      // update
      dispatch(updateToPastes(paste));
    } else {
      // create
      dispatch(addToPastes(paste));
    }

    // after creation or updation
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  function cancelEdit() {
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  const charCount = value.length;
  const wordCount = value.trim() === "" ? 0 : value.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  const isEditing = Boolean(pasteId);
  const canSubmit = title.trim().length > 0 && value.trim().length > 0;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#0D1117]">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col gap-3 mb-10">
          <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
            {isEditing ? "Edit your paste" : "Create a new paste"}
          </h1>
          <p className="text-gray-400 text-[15px] max-w-xl">
            Write, format, and store your snippets in one place. Everything
            saves locally and stays available whenever you come back.
          </p>
        </div>

        {/* Editor card */}
        <div className="rounded-2xl border border-[#30363D] bg-[#161B22] shadow-[0_8px_30px_rgba(0,0,0,0.25)] overflow-hidden">
          {/* Title row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-5 border-b border-[#30363D]">
            <div className="relative flex-1">
              <Type
                size={16}
                strokeWidth={2}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />
              <input
                className="w-full rounded-xl bg-[#0D1117] border border-[#30363D] pl-11 pr-4 py-3 text-[15px] text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
                type="text"
                placeholder="Untitled paste"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {isEditing && (
                <button
                  onClick={cancelEdit}
                  className="flex items-center gap-1.5 px-4 py-3 rounded-xl border border-[#30363D] text-sm font-medium text-gray-300 hover:text-white hover:border-gray-500 transition-all duration-200"
                >
                  <X size={15} strokeWidth={2} />
                  Cancel
                </button>
              )}

              <button
                onClick={createPaste}
                disabled={!canSubmit}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-[#0D1117] text-sm font-semibold hover:bg-gray-200 active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
              >
                {isEditing ? (
                  <>
                    <Save size={16} strokeWidth={2.2} />
                    Update Paste
                  </>
                ) : (
                  <>
                    <FilePlus2 size={16} strokeWidth={2.2} />
                    Create Paste
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Textarea */}
          <div className="p-5">
            <textarea
              className="w-full min-h-[420px] rounded-xl bg-[#0D1117] border border-[#30363D] p-5 text-[15px] leading-relaxed text-gray-200 placeholder:text-gray-500 outline-none resize-y transition-all duration-200 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 font-mono"
              value={value}
              placeholder="Start typing or paste your content here..."
              onChange={(e) => setValue(e.target.value)}
              rows={16}
            />
          </div>

          {/* Stats footer */}
          <div className="flex flex-wrap items-center gap-6 px-5 py-4 border-t border-[#30363D] bg-[#0D1117]/40">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <AlignLeft size={14} strokeWidth={2} className="text-gray-500" />
              <span className="text-gray-200 font-medium">{charCount}</span>
              <span>characters</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Type size={14} strokeWidth={2} className="text-gray-500" />
              <span className="text-gray-200 font-medium">{wordCount}</span>
              <span>words</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Clock size={14} strokeWidth={2} className="text-gray-500" />
              <span className="text-gray-200 font-medium">{readingTime}</span>
              <span>min read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
