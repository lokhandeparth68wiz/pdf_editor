"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { File, GripVertical, X } from "lucide-react";

interface SortableFileItemProps {
  id: string;
  file: File;
  onRemove: (id: string) => void;
}

export function SortableFileItem({ id, file, onRemove }: SortableFileItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-4 bg-white dark:bg-neutral-900 border ${
        isDragging ? "border-blue-500 shadow-lg" : "border-neutral-200 dark:border-neutral-800"
      } rounded-xl shadow-sm transition-colors group`}
    >
      <div className="flex items-center space-x-3 truncate">
        <button
          {...attributes}
          {...listeners}
          className="p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-5 h-5" />
        </button>
        <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg shrink-0">
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
        onClick={() => onRemove(id)}
        className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-colors shrink-0"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
