"use client";
import React, { useState, useEffect, useRef } from "react";
import { FileUpload } from "@/components/ui/FileUpload";
import { IconSend2 } from "@tabler/icons-react";
import { FileList } from "@/components/ui/FileList";

const ChatArea = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [inputFocused, setInputFocused] = useState(false);
    const [chatHistory, setChatHistory] = useState<{ sender: string; message: string; files?: File[] }[]>([]);
    const [userInput, setUserInput] = useState("");
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const handleFileUpload = (uploadedFiles: File[]) => {
        // Add file upload as a chat message
        setChatHistory(prevChat => [
            { sender: "user", message: "File uploaded:", files: uploadedFiles },
            ...prevChat
        ]);

        // Simulate a response from the "other side"
        setTimeout(() => {
            setChatHistory(prevChat => [
                { sender: "bot", message: "Your image is uploaded successfully. How can I help you with this?" },
                ...prevChat
            ]);
        }, 1000);

        // Update file state
        setFiles(uploadedFiles);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (userInput.trim() === "") return;

        // Add user message to chat history
        setChatHistory(prevChat => [
            { sender: "user", message: userInput },
            ...prevChat
        ]);

        // Simulate a response from the "other side"
        setTimeout(() => {
            setChatHistory(prevChat => [
                { sender: "bot", message: `Response to "${userInput}"` },
                ...prevChat
            ]);
        }, 1000);

        setUserInput("");
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = 0;
        }
    }, [chatHistory]);

    return (
        <div className="w-full  min-h-screen items-center flex flex-col p-4">
            {/* Display FileUpload component until files are uploaded */}
            {files.length === 0 ? (
                <div className="flex-grow flex items-center justify-center">
                    <FileUpload onChange={handleFileUpload} />
                </div>
            ) : (
                <div className="flex flex-col flex-grow w-[70%]">
                    {/* Chat messages */}
                    <div
                        ref={chatContainerRef}
                        className="flex-grow bg-neutral-100 dark:bg-neutral-950 p-4 rounded-md overflow-y-auto flex flex-col-reverse"
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

                    {/* Chat input form */}
                    <form className="flex mt-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={userInput}
                            onChange={handleInputChange}
                            placeholder={inputFocused ? "" : "Type a message..."}
                            className={`p-4 flex-1 border-none outline-none rounded-l bg-neutral-200 dark:bg-neutral-950 dark:text-neutral-300 text-neutral-950
                                placeholder:text-neutral-500 focus:placeholder-transparent transition duration-300`}
                            onFocus={() => setInputFocused(true)}
                            onBlur={() => setInputFocused(false)}
                        />
                        <button type="submit" className="bg-sky-400 p-4 rounded-r">
                            <IconSend2 />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatArea;
