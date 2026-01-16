import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "../libs/utils";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [dragOver, setDragOver] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      onFileSelect?.(file);
      setDragOver(false);
    },
    [onFileSelect]
  );

  const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
    maxSize: maxFileSize,
    onDragEnter: () => setDragOver(true),
    onDragLeave: () => setDragOver(false),
  });

  const file = acceptedFiles[0] || null;

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          relative p-8 text-center transition-all duration-300 cursor-pointer rounded-2xl min-h-[200px]
          border-2 border-dashed
          ${
            isDragActive || dragOver
              ? "border-indigo-400 bg-indigo-50/50 scale-[1.02]"
              : "border-slate-200 bg-slate-50/50 hover:border-indigo-300 hover:bg-indigo-50/30"
          }
        `}
      >
        <input {...getInputProps()} />

        <div className="space-y-4">
          {file ? (
            <div
              className="uploader-selected-file"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center">
                  <img src="/images/pdf.png" alt="pdf" className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-700 truncate max-w-[200px] md:max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-sm text-slate-500">{formatSize(file.size)}</p>
                </div>
              </div>
              <button
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onFileSelect?.(null);
                }}
              >
                <svg
                  className="w-5 h-5 text-slate-400 hover:text-rose-500 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              {/* Upload icon */}
              <div
                className={`
                  w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300
                  ${
                    isDragActive
                      ? "bg-indigo-100 scale-110"
                      : "bg-gradient-to-br from-indigo-100 to-violet-100"
                  }
                `}
              >
                <svg
                  className={`w-10 h-10 transition-colors ${
                    isDragActive ? "text-indigo-600" : "text-indigo-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>

              {/* Text */}
              <div>
                <p className="text-lg text-slate-700">
                  {isDragActive ? (
                    <span className="font-semibold text-indigo-600">
                      Drop your resume here
                    </span>
                  ) : (
                    <>
                      <span className="font-semibold text-indigo-600 hover:text-indigo-700">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </>
                  )}
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  PDF only • Max {formatSize(maxFileSize)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
