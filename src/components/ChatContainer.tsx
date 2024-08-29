'use client'

import React, { useRef, useEffect } from "react";
import { FileList } from "@/components/ui/FileList";

interface ChatContainerProps {
    chatHistory: { sender: string; message: string; files?: File[] }[];
}

const ChatContainer: React.FC<ChatContainerProps> = ({ chatHistory }) => {
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = 0;
        }
    }, [chatHistory]);

    return (
        <div
            ref={chatContainerRef}
            className="flex-grow bg-neutral-100 dark:bg-neutral-950 p-4 rounded-md overflow-y-auto flex flex-col-reverse "
        >
            {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-2`}>
                    <div className={`p-2 rounded-md ${msg.sender === "user" ? "bg-sky-400 text-white" : "bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-300 text-neutral-700"}`}>
                        {msg.message}
                        {/* Display files if available */}
                        {msg.files && <FileList files={msg.files} />}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatContainer;
