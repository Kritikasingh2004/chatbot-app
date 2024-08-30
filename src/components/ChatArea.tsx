"use client";
import React, { useState, useEffect, useRef } from "react";
import { FileUpload } from "@/components/ui/FileUpload";

import ChatContainer from "./ChatContainer";
import ChatInput from "./ChatInput";

const ChatArea = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [inputFocused, setInputFocused] = useState(false);
    const [chatHistory, setChatHistory] = useState<{ sender: string; message: string; files?: File[] }[]>([]);
    const [userInput, setUserInput] = useState("");

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

    return (
        <div className="w-full min-h-screen items-center flex flex-col p-4">
            {/* Display FileUpload component until files are uploaded */}
            {files.length === 0 ? (
                <div className="flex-grow flex items-center justify-center">
                    <FileUpload onChange={handleFileUpload} />
                </div>
            ) : (
                <div className="flex flex-col flex-grow w-[70%] ">
                    {/* Chat messages */}
                    <ChatContainer chatHistory={chatHistory} />

                    {/* Chat input form */}
                    <ChatInput
                        userInput={userInput}
                        onChange={handleInputChange}
                        onSubmit={handleSubmit}
                        inputFocused={inputFocused}
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default ChatArea;
