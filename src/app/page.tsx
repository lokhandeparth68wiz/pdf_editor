"use client";

import Link from "next/link";
import { CopyPlus, FileEdit, FileArchive, FileType2, FileText, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const tools = [
  {
    title: "Merge PDF",
    description: "Combine multiple PDFs into one unified document.",
    icon: <CopyPlus className="h-8 w-8 text-blue-500" />,
    href: "/merge",
    color: "bg-blue-500/10 dark:bg-blue-500/20",
    border: "border-blue-200 dark:border-blue-900",
  },
  {
    title: "Edit PDF",
    description: "Add text, shapes, images, and freehand annotations.",
    icon: <FileEdit className="h-8 w-8 text-emerald-500" />,
    href: "/edit",
    color: "bg-emerald-500/10 dark:bg-emerald-500/20",
    border: "border-emerald-200 dark:border-emerald-900",
  },
  {
    title: "Compress PDF",
    description: "Reduce file size while optimizing for maximal PDF quality.",
    icon: <FileArchive className="h-8 w-8 text-amber-500" />,
    href: "/compress",
    color: "bg-amber-500/10 dark:bg-amber-500/20",
    border: "border-amber-200 dark:border-amber-900",
  },
  {
    title: "PDF to DOCX",
    description: "Convert PDFs to editable Word documents easily.",
    icon: <FileText className="h-8 w-8 text-purple-500" />,
    href: "/pdf-to-docx",
    color: "bg-purple-500/10 dark:bg-purple-500/20",
    border: "border-purple-200 dark:border-purple-900",
  },
  {
    title: "DOCX to PDF",
    description: "Make DOCX files easy to read by converting them to PDF.",
    icon: <FileType2 className="h-8 w-8 text-rose-500" />,
    href: "/docx-to-pdf",
    color: "bg-rose-500/10 dark:bg-rose-500/20",
    border: "border-rose-200 dark:border-rose-900",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 md:px-8">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mb-16">
        <motion.h1 
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Every tool you need to work with PDFs in one place
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          PDFly provides the best and easiest ways to merge, edit, compress, and convert your documents securely, fast, and for free.
        </motion.p>
      </div>

      {/* Tools Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {tools.map((tool) => (
          <Link key={tool.title} href={tool.href}>
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex flex-col h-full p-6 rounded-2xl border ${tool.border} bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-all group`}
            >
              <div className={`w-16 h-16 rounded-xl ${tool.color} flex items-center justify-center mb-6`}>
                {tool.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {tool.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 flex-1">
                {tool.description}
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-neutral-900 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 transform duration-300">
                Try it now <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
