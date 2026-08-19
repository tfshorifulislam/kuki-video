"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import type { CarouselApi } from "@/components/ui/carousel";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { PostMediaProps } from "@/types/post";
import { useVideoVolume } from "./VideoVolumeProvider"; 
import VideoPlayer from "./VideoPlayer";

const PostMedia = ({ media, title }: PostMediaProps) => {
    const [carouselApi, setCarouselApi] = useState<CarouselApi>();
    const [currentSlide, setCurrentSlide] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { volume } = useVideoVolume();

    useEffect(() => {
        if (!carouselApi) return;
        const updateSlide = () => setCurrentSlide(carouselApi.selectedScrollSnap());
        updateSlide();
        carouselApi.on("select", updateSlide);
        return () => { carouselApi.off("select", updateSlide); };
    }, [carouselApi]);

    if (!media?.length) return null;

    return (
        <div className="relative w-full overflow-hidden bg-gray-900">
            <Carousel setApi={setCarouselApi} className="w-full" opts={{ loop: media.length > 1 }}>
                <CarouselContent>
                    {media.map((item, index) => (
                        <CarouselItem key={`${item.url}-${index}`} className="pl-0">
                            <div className="relative aspect-video w-full">
                                {item.type === "video" ? (
                                    <VideoPlayer ref={videoRef} url={item.url} volume={volume} />
                                ) : (
                                    <Image
                                        src={item.url}
                                        alt={title ? `${title} - Cover ${index + 1}` : `Blog media ${index + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 700px"
                                        className="object-cover"
                                    />
                                )}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {media.length > 1 && (
                    <div className="hidden md:flex">
                        <CarouselPrevious className="left-3 h-8 w-8 bg-black/60 text-white border-0 hover:bg-black/80" />
                        <CarouselNext className="right-3 h-8 w-8 bg-black/60 text-white border-0 hover:bg-black/80" />
                    </div>
                )}
            </Carousel>

            {media.length > 1 && (
                <div className="absolute bottom-3 right-3 z-20 rounded-md bg-black/70 px-2 py-0.5 text-xs font-medium text-white backdrop-blur">
                    {currentSlide + 1} / {media.length}
                </div>
            )}
        </div>
    );
};

export default PostMedia;