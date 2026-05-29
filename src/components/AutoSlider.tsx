"use client";

import { useEffect, useRef } from "react";

export default function AutoSlider({ children, interval = 4000 }: { children: React.ReactNode; interval?: number }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const slider = scrollRef.current;
        if (!slider) return;

        const timer = setInterval(() => {
            const { scrollLeft, scrollWidth, clientWidth } = slider;

            // If we've reached the end (allowing a tiny 5px margin for rounding)
            if (scrollLeft + clientWidth >= scrollWidth - 5) {
                slider.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                slider.scrollBy({ left: clientWidth * 0.8, behavior: "smooth" });
            }
        }, interval);

        return () => clearInterval(timer);
    }, [interval]);

    return (
        <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x snap-mandatory hide-scrollbar"
        >
            {children}
        </div>
    );
}
