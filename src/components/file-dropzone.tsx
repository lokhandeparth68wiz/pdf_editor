"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

interface FileDropzoneProps {
  onFilesDropped: (files: File[]) => void;
  accept?: Record<string, string[]>;
  multiple?: boolean;
}

export function FileDropzone({
  onFilesDropped,
  accept = { "application/pdf": [".pdf"] },
  multiple = true,
}: FileDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFilesDropped(acceptedFiles);
      }
    },
    [onFilesDropped]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
  });

  return (
    <div
      {...getRootProps()}
      className={`relative border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-colors max-w-3xl w-full mx-auto
        ${
          isDragActive
            ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10"
            : "border-neutral-300 dark:border-neutral-700 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        }
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="p-4 bg-white dark:bg-neutral-800 rounded-full shadow-sm">
          <UploadCloud className="w-10 h-10 text-blue-500" />
        </div>
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
          {isDragActive ? "Drop files here" : "Choose files or drag & drop"}
        </h3>
        <p className="text-neutral-500 dark:text-neutral-400 max-w-xs">
          Supported formats: PDF. Up to 100MB per file.
        </p>
        <button type="button" className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full shadow-sm transition-colors">
          Select Files
        </button>
      </div>
    </div>
  );
}
