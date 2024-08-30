import React from "react";
import { IconSend2 } from "@tabler/icons-react";

interface ChatInputProps {
    userInput: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    inputFocused: boolean;
    onFocus: () => void;
    onBlur: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ userInput, onChange, onSubmit, inputFocused, onFocus, onBlur }) => {
    return (
        <form className="flex mt-4 sticky pb-5 bottom-0 z-40 dark:bg-black bg-neutral-100" onSubmit={onSubmit}>
            <input
                type="text"
                value={userInput}
                onChange={onChange}
                placeholder={inputFocused ? "" : "Type a message..."}
                className={`p-4 flex-1 border-none outline-none rounded-l bg-neutral-200 dark:bg-neutral-950 dark:text-neutral-300 text-neutral-950
                    placeholder:text-neutral-500 focus:placeholder-transparent transition duration-300`}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <button type="submit" className="bg-sky-400 p-4 rounded-r">
                <IconSend2 />
            </button>
        </form>
    );
};

export default ChatInput;
