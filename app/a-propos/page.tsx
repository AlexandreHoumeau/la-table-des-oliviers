"use client";

import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

const aboutData = [
    {
        title: "Une aventure née de la passion",
        text: "La Table des Oliviers est avant tout une histoire humaine. Fondé par un couple passionné de gastronomie et amoureux du sud, le restaurant est né d'un rêve simple : créer un lieu chaleureux où l'on vient autant pour bien manger que pour passer un moment sincère et convivial.",
        tags: ["familial", "convivial", "chaleureux"]
    },
    {
        title: "Un ancrage fort à Marseille et en Méditerranée",
        text: "Installé au cœur de Marseille, le restaurant puise son identité dans les richesses culinaires de la Méditerranée. Chaque plat raconte un souvenir, une saison, un produit du terroir. L'huile d'olive provient d'un petit moulin familial, les légumes sont sélectionnés chez des maraîchers locaux, et les poissons arrivent chaque matin directement du port.",
        tags: ["produits locaux", "circuit court", "terroir provençal"]
    },
    {
        title: "Une cuisine maison entre tradition et créativité",
        text: "En cuisine, notre chef privilégie une approche authentique : tout est préparé sur place, à partir de produits bruts. Les recettes s'inspirent des traditions provençales tout en laissant place à la créativité moderne, afin d'offrir une expérience à la fois familière et surprenante.",
        tags: ["fait maison", "chef créatif", "cuisine moderne"]
    }
];

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 40,
        damping: 20,
        restDelta: 0.001
    });

    // --- ANIMATIONS DE SCROLL (Inchangées) ---
    const scale0 = useTransform(smoothProgress, [0, 0.35], [1, 0.8]);
    const y0 = useTransform(smoothProgress, [0, 0.35], ["0vh", "5vh"]);

    const y1 = useTransform(smoothProgress, [0, 0.35, 0.7], ["100vh", "0vh", "5vh"]);
    const scale1 = useTransform(smoothProgress, [0, 0.35, 0.7], [1, 1, 0.8]);

    const y2 = useTransform(smoothProgress, [0.35, 0.7], ["100vh", "0vh"]);
    const scale2 = useTransform(smoothProgress, [0, 1], [1, 1]);

    const styles = [
        { scale: scale0, y: y0 },
        { scale: scale1, y: y1 },
        { scale: scale2, y: y2 }
    ];

    return (
        <div ref={containerRef} className="relative h-[400vh]">

            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* --- ANIMATION : LE RIDEAU DE FOND --- */}
                <motion.div
                    initial={{ clipPath: "inset(0 50% 0 50%)" }} // Fermé au milieu horizontalement
                    animate={{ clipPath: "inset(0 0% 0 0%)" }} // Totalement ouvert
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} // Courbe très élégante (easeInOut)
                    className="absolute inset-0 z-0"
                >
                    {/* Léger effet de zoom en arrière sur l'image pendant l'ouverture du rideau */}
                    <motion.div
                        initial={{ scale: 1.15 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="w-full h-full relative"
                    >
                        <Image
                            src="/about_background.png"
                            alt="Feuilles d'olivier en arrière-plan"
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                </motion.div>

                <div className="relative z-10 w-full max-w-4xl px-6 flex items-center justify-center">

                    {aboutData.map((data, index) => (
                        // 1. LE PARENT : Gère uniquement la physique du scroll
                        <motion.div
                            key={index}
                            style={styles[index]}
                            className="absolute w-full origin-top"
                        >
                            {/* 2. L'ENFANT : C'est toute la carte visuelle (fond, ombre, padding) */}
                            {/* On lui applique l'animation d'apparition uniquement si c'est la 1ère carte (index 0) */}
                            <motion.div
                                initial={index === 0 ? { opacity: 0, y: 60 } : false}
                                animate={index === 0 ? { opacity: 1, y: 0 } : false}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.8, // Attend l'ouverture du rideau
                                    ease: [0.16, 1, 0.3, 1] // Une courbe d'animation ultra-douce
                                }}
                                className="w-full bg-[#FCFAF8] shadow-[0_-15px_50px_rgba(0,0,0,0.15)] rounded-sm p-12 md:p-20 flex flex-col items-center text-center"
                            >
                                <h2 className="font-title text-3xl md:text-5xl text-content mb-8">
                                    {data.title}
                                </h2>

                                <p className="font-sans text-content/80 text-base md:text-lg leading-relaxed max-w-3xl mb-12">
                                    {data.text}
                                </p>

                                <div className="flex flex-wrap justify-center gap-4">
                                    {data.tags.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="border border-secondary/40 text-secondary font-sans text-sm px-6 py-2 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}

                </div>
            </div>
        </div>
    );
}