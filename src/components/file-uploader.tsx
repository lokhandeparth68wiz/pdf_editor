"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, File, X } from "lucide-react";

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  accept?: Record<string, string[]>;
  multiple?: boolean;
}

export function FileUploader({
  onFilesSelected,
  maxFiles = 10,
  accept = { "application/pdf": [".pdf"] },
  multiple = true,
}: FileUploaderProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = multiple ? [...selectedFiles, ...acceptedFiles] : acceptedFiles;
      
      if (newFiles.length > maxFiles) {
        alert(`You can only upload up to ${maxFiles} files.`);
        return;
      }

      setSelectedFiles(newFiles);
      onFilesSelected(newFiles);
    },
    [maxFiles, multiple, onFilesSelected, selectedFiles]
  );

  const removeFile = (fileToRemove: File, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFiles = selectedFiles.filter((file) => file !== fileToRemove);
    setSelectedFiles(newFiles);
    onFilesSelected(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    multiple,
  });

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-colors
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
            Supported formats: PDF. Maximum file size 100MB.
          </p>
          <button className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full shadow-sm transition-colors">
            Select Files
          </button>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-medium mb-4 text-neutral-900 dark:text-white">Selected Files</h4>
          <div className="space-y-3">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm"
              >
                <div className="flex items-center space-x-3 truncate">
                  <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                    <File className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => removeFile(file, e)}
                  className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
