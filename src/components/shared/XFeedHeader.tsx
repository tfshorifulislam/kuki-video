"use client";

import { Settings } from "lucide-react";

export default function XFeedHeader() {

    return (
        <header className="
            sticky
            top-0
            z-30
            flex
            h-14
            items-center
            justify-between
            border-b
            border-gray-200
            bg-white/90
            px-4
            backdrop-blur-md
        ">

            <h1 className="
                text-xl
                font-bold
            ">
                Home
            </h1>

            <button
                type="button"
                className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    hover:bg-gray-100
                "
            >
                <Settings size={19} />
            </button>

        </header>
    );
}