"use client";

import React, { useRef } from "react";
import { useScroll } from "framer-motion";
import { StickyCard_001 } from "../ui/skiper-ui/skiper16";

const projects = [
    {
        title: "Holistic Healing",
        src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200",
    },
    {
        title: "Ayurvedic Spa",
        src: "https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?q=80&w=1200",
    },
    {
        title: "Mindfulness Retreat",
        src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200",
    },
];

const ScrollStackSections = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    return (
        <main
            ref={container}
            className="relative flex w-full flex-col items-center justify-center py-[50vh]"
        >
            {projects.map((project, i) => {
                const targetScale = Math.max(
                    0.5,
                    1 - (projects.length - i - 1) * 0.1,
                );
                return (
                    <StickyCard_001
                        key={`p_${i}`}
                        i={i}
                        {...project}
                        progress={scrollYProgress}
                        range={[i * 0.25, 1]}
                        targetScale={targetScale}
                    />
                );
            })}
        </main>
    );
};

export default ScrollStackSections;
