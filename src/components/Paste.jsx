import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  Search,
  Pencil,
  Eye,
  Copy,
  Trash2,
  Share2,
  FileX2,
  Calendar,
  AlignLeft,
} from "lucide-react";

const formatDate = (isoString) => {
  try {
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return isoString;
  }
};

const getWordCount = (text = "") =>
  text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShare = async (paste) => {
    const shareData = {
      title: paste.title,
      text: paste.content,
      url: `${window.location.origin}/pastes/${paste._id}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success("Shared Successfully");
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success("Link copied to clipboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#0D1117]">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col gap-3 mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
            My Pastes
          </h1>
          <p className="text-gray-400 text-[15px]">
            {pastes.length} {pastes.length === 1 ? "paste" : "pastes"} saved
            locally on this device.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative mb-8 max-w-md">
          <Search
            size={16}
            strokeWidth={2}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
          <input
            className="w-full rounded-xl bg-[#161B22] border border-[#30363D] pl-11 pr-4 py-3 text-[14px] text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
            type="search"
            placeholder="Search pastes by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Grid / Empty state */}
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredData.map((paste) => (
              <div
                key={paste?._id}
                className="group flex flex-col rounded-2xl border border-[#30363D] bg-[#161B22] p-5 transition-all duration-200 hover:border-gray-500/50 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
              >
                {/* Title */}
                <h3 className="text-[16px] font-semibold text-white mb-2 truncate">
                  {paste.title || "Untitled paste"}
                </h3>

                {/* Preview */}
                <p className="text-[13.5px] text-gray-400 leading-relaxed line-clamp-3 mb-4 min-h-[60px]">
                  {paste.content || "No content"}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pb-4 border-b border-[#30363D]">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} strokeWidth={2} />
                    <span>{formatDate(paste.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <AlignLeft size={13} strokeWidth={2} />
                    <span>{getWordCount(paste.content)} words</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 mt-auto">
                  <Link
                    to={`/?pasteId=${paste?._id}`}
                    title="Edit"
                    className="flex items-center justify-center w-9 h-9 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-[#30363D] transition-all duration-200"
                  >
                    <Pencil size={15} strokeWidth={2} />
                  </Link>

                  <Link
                    to={`/pastes/${paste._id}`}
                    title="View"
                    className="flex items-center justify-center w-9 h-9 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-[#30363D] transition-all duration-200"
                  >
                    <Eye size={15} strokeWidth={2} />
                  </Link>

                  <button
                    title="Copy"
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard");
                    }}
                    className="flex items-center justify-center w-9 h-9 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-[#30363D] transition-all duration-200"
                  >
                    <Copy size={15} strokeWidth={2} />
                  </button>

                  <button
                    title="Share"
                    onClick={() => handleShare(paste)}
                    className="flex items-center justify-center w-9 h-9 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-[#30363D] transition-all duration-200"
                  >
                    <Share2 size={15} strokeWidth={2} />
                  </button>

                  <button
                    title="Delete"
                    onClick={() => handleDelete(paste?._id)}
                    className="flex items-center justify-center w-9 h-9 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200 ml-auto"
                  >
                    <Trash2 size={15} strokeWidth={2} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-24 rounded-2xl border border-dashed border-[#30363D]">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#161B22] border border-[#30363D] mb-5">
              <FileX2 size={24} strokeWidth={1.75} className="text-gray-500" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-1.5">
              {searchTerm ? "No pastes match your search" : "No pastes yet"}
            </h3>
            <p className="text-gray-500 text-sm max-w-xs">
              {searchTerm
                ? "Try a different search term or clear the search."
                : "Create your first paste from the Home page to see it here."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Paste;
