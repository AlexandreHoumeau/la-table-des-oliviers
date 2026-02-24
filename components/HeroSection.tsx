"use client";

import Image from 'next/image';
import { motion, AnimatePresence, Variants, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    const transitionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: transitionRef,
        offset: ["start end", "end start"]
    });

    const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
    const xRight = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

    useEffect(() => {
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += Math.floor(Math.random() * 12) + 2;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }
            setProgress(currentProgress);
        }, 150);

        return () => clearInterval(interval);
    }, []);

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <div className="min-h-screen">

            {/* ÉCRAN DE CHARGEMENT CIRCULAIRE */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF8F5] text-content"
                    >
                        <div className="relative flex items-center justify-center w-64 h-64">
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 12, ease: "linear" }} className="absolute inset-0 w-full h-full">
                                <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                                    <path id="circlePath" d="M 100, 30 a 70,70 0 1,1 0,140 a 70,70 0 1,1 0,-140" fill="none" />
                                    <text fill="currentColor" className="font-title text-[13px] uppercase tracking-[0.15em]">
                                        <textPath href="#circlePath" startOffset="0" textLength="439" lengthAdjust="spacing">
                                            LA TABLE DES OLIVIERS • LA TABLE DES OLIVIERS •
                                        </textPath>
                                    </text>
                                </svg>
                            </motion.div>
                            <Image src="/logo.svg" alt="Logo" width={80} height={80} className="w-20 h-auto" priority />
                        </div>
                        <div className="mt-8 font-title text-xl tracking-widest">{progress}%</div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 1. SECTION TEXTE */}
            <motion.section
                initial="hidden"
                animate={isLoading ? "hidden" : "visible"}
                transition={{ staggerChildren: 0.2, delayChildren: 0.2 }}
                className="pt-32 pb-20 px-6 max-w-3xl mx-auto text-center flex flex-col items-center"
            >
                <motion.h1 variants={fadeUp} className="font-title text-5xl md:text-6xl text-content mb-6">
                    La table des Oliviers
                </motion.h1>
                <motion.p variants={fadeUp} className="font-sans text-content leading-relaxed mb-10 max-w-xl">
                    Un restaurant où la tradition provençale rencontre la créativité contemporaine.
                    Notre chef sélectionne chaque jour des produits frais, locaux et de saison pour
                    vous proposer une cuisine généreuse, raffinée et pleine de saveurs.
                </motion.p>
                <motion.button variants={fadeUp} className="bg-secondary text-white font-title text-xl tracking-wide uppercase px-8 py-4 rounded-tl-none rounded-tr-4xl rounded-br-none rounded-bl-4xl hover:bg-[#6A5443] transition-colors shadow-md">
                    LE MENU
                </motion.button>
            </motion.section>

            {/* 2. SECTION GALERIE AU SCROLL (Maintenant 100% responsive) */}
            <section className="relative w-full max-w-7xl mx-auto h-[300vh]">

                <div className="absolute top-0 left-0 w-full h-[100vh] z-30 pointer-events-none">
                    <div className="sticky top-48 md:top-32 flex justify-center items-center pointer-events-auto px-6">
                        {/* Sur mobile : w-full. Sur desktop : w-auto */}
                        <motion.div
                            initial={{ opacity: 0, y: 60, scale: 0.9 }}
                            animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 60 : 0, scale: isLoading ? 0.9 : 1 }}
                            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }} 
                            className="w-full sm:w-10/12 md:w-auto rounded-sm -rotate-2 shadow-2xl"
                        >
                            {/* Hauteur fixe sur mobile (45vh) pour un rendu propre, puis max-h sur desktop */}
                            <Image src="/cover_1.png" alt="Plat 1" width={1200} height={675} className="w-full h-[45vh] md:h-auto md:max-h-[70vh] md:w-auto object-cover rounded-sm" priority />
                        </motion.div>
                    </div>
                </div>

                <div className="absolute top-0 left-0 w-full h-[200vh] z-20 pointer-events-none">
                    {/* Note les "md:translate-x-4" : le décalage horizontal ne se fait plus que sur grand écran ! */}
                    <div className="sticky top-48 md:top-32 flex justify-center items-center pointer-events-auto px-6 translate-y-4 md:translate-y-6 md:translate-x-4">
                        <motion.div
                            initial={{ opacity: 0, y: 60, scale: 0.9 }}
                            animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 60 : 0, scale: isLoading ? 0.9 : 1 }}
                            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full sm:w-10/12 md:w-auto rounded-sm rotate-2 shadow-2xl"
                        >
                            <Image src="/cover_2.png" alt="Plat 2" width={1200} height={675} className="w-full h-[45vh] md:h-auto md:max-h-[70vh] md:w-auto object-cover rounded-sm" />
                        </motion.div>
                    </div>
                </div>

                <div className="relative w-full h-[300vh] z-10 pointer-events-none">
                    <div className="sticky top-48 md:top-32 flex justify-center items-center pointer-events-auto px-6 translate-y-8 md:translate-y-12 md:-translate-x-3">
                        <motion.div
                            initial={{ opacity: 0, y: 60, scale: 0.9 }}
                            animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 60 : 0, scale: isLoading ? 0.9 : 1 }}
                            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full sm:w-10/12 md:w-auto rounded-sm -rotate-1 md:-rotate-2 shadow-2xl"
                        >
                            <Image src="/cover_3.png" alt="Plat 3" width={1000} height={1000} className="w-full h-[45vh] md:h-auto md:max-h-[70vh] md:w-auto object-cover rounded-sm" />
                        </motion.div>
                    </div>
                </div>

            </section>

            {/* --- TRANSITION : LE MARQUEE PARALLAX --- */}
            <section ref={transitionRef} className="py-20 md:py-32 overflow-hidden flex flex-col gap-4 md:gap-8">
                <motion.div style={{ x: xLeft }} className="whitespace-nowrap flex gap-8 items-center">
                    {[...Array(4)].map((_, i) => (
                        <span key={`left-${i}`} className="text-6xl md:text-8xl lg:text-[8rem] font-title italic text-main/30 tracking-tight">
                            TERROIR & PASSION •
                        </span>
                    ))}
                </motion.div>

                <motion.div style={{ x: xRight }} className="whitespace-nowrap flex gap-8 items-center">
                    {[...Array(4)].map((_, i) => (
                        <span key={`right-${i}`} className="text-6xl md:text-8xl lg:text-[8rem] font-title italic text-secondary/30 tracking-tight">
                            CUISINE AUTHENTIQUE •
                        </span>
                    ))}
                </motion.div>
            </section>

            {/* --- SECTION : À PROPOS --- */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ staggerChildren: 0.2 }}
                className="mb-32 md:mb-48 px-6 max-w-7xl mx-auto"
            >
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 items-center">

                    {/* Colonne Gauche : Texte */}
                    <div className="flex flex-col items-start gap-8 lg:w-5/12">
                        <motion.div variants={fadeUp} className="flex items-center gap-4">
                            <span className="w-12 h-[1px] bg-secondary"></span>
                            <span className="font-sans text-secondary tracking-widest uppercase text-sm font-medium">Notre Maison</span>
                        </motion.div>

                        <motion.h2 variants={fadeUp} className="font-title text-4xl md:text-5xl lg:text-6xl text-content leading-tight">
                            Une histoire de <span className="italic text-secondary">passion</span> et de terroir.
                        </motion.h2>

                        <motion.p variants={fadeUp} className="font-sans text-content/80 leading-relaxed text-lg">
                            Fondée en 2021, La Table des Oliviers est née de l'envie de partager une cuisine sincère inspirée du sud de la France. Notre équipe travaille avec des producteurs locaux afin de garantir qualité, fraîcheur et respect des saisons.
                        </motion.p>

                        <motion.p variants={fadeUp} className="font-sans text-content/80 leading-relaxed">
                            Dans une ambiance chaleureuse et élégante, nous vous accueillons pour des déjeuners conviviaux, des dîners romantiques ou des moments entre amis.
                        </motion.p>

                        <motion.button variants={fadeUp} className="mt-4 bg-transparent border border-secondary text-secondary font-title text-sm tracking-widest uppercase px-8 py-4 rounded-tl-none rounded-tr-3xl rounded-br-none rounded-bl-3xl hover:bg-secondary hover:text-white transition-colors">
                            EN SAVOIR PLUS
                        </motion.button>
                    </div>

                    {/* Colonne Droite : Images */}
                    <div className="flex items-center w-full lg:w-7/12 relative mt-10 lg:mt-0">
                        <motion.div
                            variants={{ hidden: { opacity: 0, scale: 0.95, x: 20 }, visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.8 } } }}
                            className="w-[65%] z-10"
                        >
                            <Image
                                src="/cover_1.png"
                                alt="Dressage d'une assiette"
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover shadow-2xl"
                            />
                        </motion.div>

                        <motion.div
                            variants={{ hidden: { opacity: 0, scale: 0.95, x: 20 }, visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } } }}
                            // Marges réduites sur mobile (-ml-10 mt-16) pour éviter que ça ne sorte de l'écran
                            className="w-[45%] -ml-10 mt-16 md:-ml-16 md:mt-32 z-20"
                        >
                            <Image
                                src="/cover_3.png"
                                alt="Chef en cuisine"
                                width={600}
                                height={800}
                                className="w-full h-auto object-cover shadow-2xl"
                            />
                        </motion.div>
                    </div>

                </div>
            </motion.section>
        </div >
    );
}