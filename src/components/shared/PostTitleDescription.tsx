'use client';

import { ShareModalProps } from "@/types/shareModalProps";
import { useState } from "react";

const PostTitleDescription = ({ description, title }: ShareModalProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div>
            {title && (
                <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-zinc-100">
                    {title}
                </h2>
            )}

            {description && (
                <div>
               
                    <p 
                        className={`text-sm leading-relaxed text-gray-600 dark:text-zinc-300 ${
                            !isExpanded ? "line-clamp-3" : ""
                        }`}
                    >
                        {description}
                    </p>

               
                    {description.length > 150 && (
                        <button
                            type="button"
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="mt-1 text-xs font-semibold text-primary hover:underline focus:outline-none"
                        >
                            {isExpanded ? "See less" : "See more"}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default PostTitleDescription;