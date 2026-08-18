"use client";

import Image from "next/image";
import { ImageIcon, Smile } from "lucide-react";

export default function XPostComposer() {

    return (
        <div className="border-b  border-gray-200 px-4 py-3 ">

            <div className="flex gap-3">

                {/* Avatar */}

                <div className="relative h-10 w-10  shrink-0  overflow-hidden rounded-full  bg-gray-200 ">
                    <Image
                        src="/avatar.png"
                        alt="Profile"
                        fill
                        className="object-cover"
                    />
                </div>


                {/* Composer */}

                <div className="min-w-0 flex-1">

                    <textarea
                        placeholder="What is happening?!"
                        rows={2}
                        className="w-full resize-none border-none bg-transparent text-xl outline-none placeholder:text-gray-500 " />


                    <div className="mt-2 flex items-center justify-between ">

                        <div className="flex gap-1">

                            <button
                                type="button"
                                className=" rounded-full p-2 text-blue-500 hover:bg-blue-50">
                                <ImageIcon size={19} />
                            </button>

                            <button
                                type="button"
                                className="rounded-full p-2  text-blue-500  hover:bg-blue-50" >
                                <Smile size={19} />
                            </button>

                        </div>


                        <button
                            type="button"
                            className="rounded-full bg-black px-5 py-2 text-sm font-bold  text-white hover:bg-gray-800 " >
                            Post
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}