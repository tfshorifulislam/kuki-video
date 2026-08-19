import React from 'react';

const BloggerHeader = () => {
    return (
        <div className="flex flex-col gap-2 border-b border-gray-200 pb-5">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                Explore Stories & Ideas
            </h1>
            <p className="text-sm text-gray-600">
                Discover thoughts, writing, and expertise from various writers.
            </p>
        </div>
    );
};

export default BloggerHeader;