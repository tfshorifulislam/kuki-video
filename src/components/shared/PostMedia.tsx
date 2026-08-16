"use client";

import { useEffect, useState } from "react";
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


const PostMedia = ({ media, title }: PostMediaProps) => {
    const [carouselApi, setCarouselApi] = useState<CarouselApi>();
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (!carouselApi) return;

        const updateSlide = () => {
            setCurrentSlide(carouselApi.selectedScrollSnap());
        };

        updateSlide();

        carouselApi.on("select", updateSlide);

        return () => {
            carouselApi.off("select", updateSlide);
        };
    }, [carouselApi]);

    if (!media?.length) {
        return null;
    }

    return (
        <div className="relative w-full overflow-hidden bg-black">
            <Carousel
                setApi={setCarouselApi}
                className="w-full"
                opts={{
                    loop: media.length > 1,
                }}
            >
                <CarouselContent>
                    {media.map((item, index) => (
                        <CarouselItem
                            key={`${item.url}-${index}`}
                            className="pl-0"
                        >
                            <div className="relative aspect-square w-full">
                                {item.type === "video" ? (
                                    <video
                                        src={item.url}
                                        controls
                                        playsInline
                                        preload="metadata"
                                        className="h-full w-full object-contain"
                                    />
                                ) : (
                                    <Image
                                        src={item.url}
                                        alt={
                                            title
                                                ? `${title} - ${index + 1}`
                                                : `Post media ${index + 1}`
                                        }
                                        fill
                                        sizes="(max-width: 640px) 100vw, 620px"
                                        className="object-cover"
                                    />
                                )}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {media.length > 1 && (
                    <>
                        <CarouselPrevious className="left-3 h-9 w-9 border-0 bg-black/50 text-white shadow-none hover:bg-black/70 hover:text-white" />

                        <CarouselNext className="right-3 h-9 w-9 border-0 bg-black/50 text-white shadow-none hover:bg-black/70 hover:text-white" />
                    </>
                )}
            </Carousel>

            {media.length > 1 && (
                <div className="absolute right-3 top-3 z-20 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                    {currentSlide + 1} / {media.length}
                </div>
            )}

            {media.length > 1 && (
                <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1.5 backdrop-blur">
                    {media.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() =>
                                carouselApi?.scrollTo(index)
                            }
                            aria-label={`Go to media ${index + 1}`}
                            className={`h-1.5 rounded-full transition-all duration-200 ${currentSlide === index
                                ? "w-4 bg-white"
                                : "w-1.5 bg-white/50 hover:bg-white/80"
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PostMedia;