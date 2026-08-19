import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

import "./globals.css";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar";
import BottomMenuBar from "@/components/shared/BottomMenuBar";
import { VideoVolumeProvider } from "@/components/shared/VideoVolumeProvider";
import RightSideBar from "@/components/RightSideBar.tsx/RightSideBar";

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


              <AppSidebar />


              <main className="flex w-full min-w-0 max-w-3xl flex-1 flex-col  min-h-screen ">
                {children}
              </main>

              <RightSideBar />
            </div>

            <BottomMenuBar />
          </SidebarProvider>

          <ToastContainer position="bottom-right" />
        </VideoVolumeProvider>
      </body>
    </html>
  );
};