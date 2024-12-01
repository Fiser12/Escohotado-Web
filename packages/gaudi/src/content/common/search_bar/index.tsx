"use client";

import { useState } from "react";

type Props = {
    initialValue?: string;
    applyText: (text: string) => void;
};

export const SearchBar = (props: Props): JSX.Element => {
    const [inputValue, setInputValue] = useState<string>(props.initialValue ?? "");
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSearch = () => {
        props.applyText(inputValue);
    };

    return (
        <form className="w-full max-w-sm min-w-[200px]"
            onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
            }}
        >
            <div className="relative flex items-center h-[40px]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                </svg>
                <input
                    value={inputValue}
                    onChange={handleInputChange}
                    className="w-full bg-transparent placeholder:text-gray-disabled text-black font-body text-sm border border-primary-900 rounded-l-lg pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary-500 hover:border-primary-500 shadow-sm focus:shadow"
                    placeholder="Buscar..."
                />
                <button
                    className="rounded-r-lg bg-primary-900 py-2 px-4 border border-transparent font-body text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-primary-500 focus:shadow-none active:bg-primary-400 hover:bg-primary-500 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="submit"
                >
                    Buscar
                </button>
            </div>
        </form>
    );
}