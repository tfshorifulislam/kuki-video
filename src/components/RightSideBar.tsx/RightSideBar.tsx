import React from 'react';

const RightSideBar = () => {
    return (
        <aside className="hidden xl:block w-80 xl:w-90">
            <div className="sticky top-6 flex flex-col gap-6">

                {/* Search / Discover Box */}
                <div className="p-5">
                    <h3 className="font-bold text-base mb-3 text-gray-900 dark:text-zinc-100">
                        Discover More
                    </h3>
                    <input
                        type="text"
                        placeholder="Search articles, topics..."
                        className="w-full rounded-xl bg-gray-100 dark:bg-zinc-800 px-3.5 py-2 text-sm text-gray-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                </div>

                {/* Trending / Recommended Topics */}
                <div className="p-5">
                    <h3 className="font-bold text-base mb-3 text-gray-900 dark:text-zinc-100">
                        Recommended Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {["Technology", "Design", "Programming", "Artificial Intelligence", "Startup", "Writing"].map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-gray-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-gray-600 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Staff Picks / Footer info */}
                <div className="px-5 text-xs text-gray-500 dark:text-zinc-400 space-y-2">
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                        <a href="#" className="hover:underline">Help</a>
                        <a href="#" className="hover:underline">Status</a>
                        <a href="#" className="hover:underline">Writers</a>
                        <a href="#" className="hover:underline">Blog</a>
                        <a href="#" className="hover:underline">Careers</a>
                        <a href="#" className="hover:underline">Privacy</a>
                    </div>
                    <p>© 2026 BlogSpace Inc.</p>
                </div>

            </div>
        </aside>
    );
};

export default RightSideBar;