import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

import "./globals.css";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar";
import BottomMenuBar from "@/components/shared/BottomMenuBar";
import { VideoVolumeProvider } from "@/components/shared/VideoVolumeProvider";

const inter = Inter({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BlogSpace - Discover Stories & Ideas",
  description: "A modern blogging platform to read, write, and share stories.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-full antialiased`}
    >
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <VideoVolumeProvider>
          <SidebarProvider>

            <div className="mx-auto flex justify-center min-h-screen w-full max-w-7xl">

              {/* Navigation Sidebar */}
              <AppSidebar />

              {/* Main Feed / Article Content Area */}
              <main className="flex w-full min-w-0 max-w-4xl flex-1 flex-col border-x border-gray-200 bg-white min-h-screen shadow-sm">
                {children}
              </main>

              {/* Blog Right Sidebar (Trending Topics, Categories, Staff Picks) */}
              <aside className="hidden lg:block w-80 xl:w-96 px-6 py-6">
                <div className="sticky top-6 flex flex-col gap-6">

                  {/* Search / Discover Box */}
                  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h3 className="font-bold text-base mb-3 text-gray-900">
                      Discover More
                    </h3>
                    <input 
                      type="text" 
                      placeholder="Search articles, topics..." 
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>

                  {/* Trending / Recommended Topics */}
                  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h3 className="font-bold text-base mb-3 text-gray-900">
                      Recommended Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["Technology", "Design", "Programming", "Artificial Intelligence", "Startup", "Writing"].map((tag) => (
                        <span 
                          key={tag}
                          className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Staff Picks / Footer info */}
                  <div className="px-2 text-xs text-gray-500 space-y-2">
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

            </div>

            <BottomMenuBar />
          </SidebarProvider>

          <ToastContainer position="bottom-right" />
        </VideoVolumeProvider>
      </body>
    </html>
  );
};