'use client'

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type FileListProps = {
    files: File[];
};

export const FileList: React.FC<FileListProps> = ({ files }) => {
    return (
        <div className="w-full mt-4">
            {files.map((file, idx) => (
                <motion.div
                    key={idx}
                    layout
                    className={cn(
                        "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                        "shadow-sm"
                    )}
                >
                    <div className="flex justify-between w-full items-center gap-4">
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            layout
                            className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                        >
                            {file.name}
                        </motion.p>
                    </div>

                    <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            layout
                            className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 "
                        >
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </motion.p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
