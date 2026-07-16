import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Copy,
  Calendar,
  AlignLeft,
  Clock,
  FileX2,
} from "lucide-react";

const formatDate = (isoString) => {
  try {
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return isoString;
  }
};

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#0D1117]">
        <div className="max-w-[1200px] mx-auto px-6 py-24 flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#161B22] border border-[#30363D] mb-5">
            <FileX2 size={24} strokeWidth={1.75} className="text-gray-500" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-1.5">
            Paste not found
          </h3>
          <p className="text-gray-500 text-sm max-w-xs mb-6">
            This paste may have been deleted or the link is incorrect.
          </p>
          <Link
            to="/pastes"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#30363D] text-sm font-medium text-gray-300 hover:text-white hover:border-gray-500 transition-all duration-200"
          >
            <ArrowLeft size={15} strokeWidth={2} />
            Back to pastes
          </Link>
        </div>
      </div>
    );
  }

  const wordCount =
    paste.content.trim() === "" ? 0 : paste.content.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const handleCopy = () => {
    navigator.clipboard.writeText(paste.content);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#0D1117]">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Back button */}
        <Link
          to="/pastes"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors duration-200"
        >
          <ArrowLeft size={15} strokeWidth={2} />
          Back to pastes
        </Link>

        {/* Document card */}
        <div className="rounded-2xl border border-[#30363D] bg-[#161B22] shadow-[0_8px_30px_rgba(0,0,0,0.25)] overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-[#30363D]">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight break-words">
                {paste.title || "Untitled paste"}
              </h1>

              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#0D1117] text-sm font-semibold hover:bg-gray-200 active:scale-[0.98] transition-all duration-200 shrink-0"
              >
                <Copy size={15} strokeWidth={2.2} />
                Copy
              </button>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-5 mt-5 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <Calendar size={13} strokeWidth={2} />
                <span>{formatDate(paste.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <AlignLeft size={13} strokeWidth={2} />
                <span>{wordCount} words</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={13} strokeWidth={2} />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>

          {/* Read-only content */}
          <div className="p-8">
            <pre className="whitespace-pre-wrap break-words font-mono text-[14.5px] leading-relaxed text-gray-200 bg-[#0D1117] border border-[#30363D] rounded-xl p-6 min-h-[300px]">
              {paste.content}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
