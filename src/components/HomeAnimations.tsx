"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

/* ────────────────────────────────────────────────────────────
   FadeIn – triggers a CSS class when element enters viewport
─────────────────────────────────────────────────────────────*/
export function FadeIn({
    children,
    className = "",
    delay = 0,
    direction = "up",
}: {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "left" | "right" | "none";
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.style.transitionDelay = `${delay}ms`;
                    el.classList.add("is-visible");
                    observer.unobserve(el);
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [delay]);

    const dirClass =
        direction === "up"
            ? "fade-up"
            : direction === "left"
                ? "fade-left"
                : direction === "right"
                    ? "fade-right"
                    : "fade-none";

    return (
        <div ref={ref} className={`fade-in-el ${dirClass} ${className}`}>
            {children}
        </div>
    );
}

/* ────────────────────────────────────────────────────────────
   Typewriter – cycles through subtitle strings
─────────────────────────────────────────────────────────────*/
export function Typewriter({ strings }: { strings: string[] }) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        let sIdx = 0;
        let cIdx = 0;
        let deleting = false;
        let timer: ReturnType<typeof setTimeout>;

        function tick() {
            const el = ref.current;
            if (!el) return;
            const current = strings[sIdx];

            if (!deleting) {
                cIdx++;
                el.textContent = current.slice(0, cIdx);
                if (cIdx === current.length) {
                    deleting = true;
                    timer = setTimeout(tick, 1800);
                    return;
                }
            } else {
                cIdx--;
                el.textContent = current.slice(0, cIdx);
                if (cIdx === 0) {
                    deleting = false;
                    sIdx = (sIdx + 1) % strings.length;
                }
            }
            timer = setTimeout(tick, deleting ? 45 : 90);
        }

        timer = setTimeout(tick, 600);
        return () => clearTimeout(timer);
    }, [strings]);

    return (
        <span ref={ref} className="typewriter-text" aria-live="polite" />
    );
}



/* ────────────────────────────────────────────────────────────
   ScrollIndicator – animated scroll-down arrow in hero
─────────────────────────────────────────────────────────────*/
export function ScrollIndicator() {
    return (
        <div className="scroll-indicator" aria-hidden="true">
            <div className="scroll-mouse">
                <div className="scroll-wheel" />
            </div>
        </div>
    );
}
