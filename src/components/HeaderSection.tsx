'use client'

import { IconMoonStars, IconPencilPlus, IconSunFilled, IconUserCircle } from '@tabler/icons-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const HeaderSection = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const root = window.document.documentElement;
        const initialColorValue = root.classList.contains('dark');
        setIsDarkMode(initialColorValue);
    }, []);

    const toggleDarkMode = () => {
        const root = window.document.documentElement;
        root.classList.toggle('dark');
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div
            className={`h-screen fixed top-0 left-0 z-50 px-3 py-7 flex flex-col justify-between transition-all duration-300 text-neutral-700 dark:text-neutral-300 text-base ${isExpanded ? 'w-64 dark:bg-neutral-900 bg-neutral-300' : 'w-32 '}`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <Link href='#' className={`text-center font-semibold hover:text-sky-400`}>
                The Chatbot
            </Link>
            <ul className='flex flex-col justify-evenly ml-2'>
                <li className='hover:text-sky-400 mb-5 flex items-center'>
                    <button className='flex items-center'>
                        <IconPencilPlus />
                        <span className={`ml-2 ${isExpanded ? 'inline opacity-100' : 'hidden opacity-0'} transition-opacity duration-300`}>New Chat</span>
                    </button>
                </li>
                <li className='hover:text-sky-400 mb-5 flex items-center'>
                    <Link href='#' className='flex items-center'>
                        <IconUserCircle />
                        <span className={`ml-2 ${isExpanded ? 'inline opacity-100' : 'hidden opacity-0'} transition-opacity duration-300`}>User Profile</span>
                    </Link>
                </li>
                <li className='hover:text-sky-400 mb-5 flex items-center'>
                    <button onClick={toggleDarkMode} className='flex items-center'>
                        {isDarkMode ? <><IconSunFilled /><span className={`ml-2 ${isExpanded ? 'inline opacity-100' : 'hidden opacity-0'} transition-opacity duration-300`}>Light Mode</span></> : <><IconMoonStars /><span className={`ml-2 ${isExpanded ? 'inline opacity-100' : 'hidden opacity-0'} transition-opacity duration-300`}>Dark Mode</span></>}
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default HeaderSection
