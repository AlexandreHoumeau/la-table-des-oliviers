"use client";

import { useState, MouseEvent } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

const menuData = {
    "Entrées": [
        { name: "Burrata crémeuse, tomates anciennes et pesto maison", image: "/cover_1.png" },
        { name: "Velouté de légumes de saison", image: "/cover_2.png" },
        { name: "Tartare de saumon, citron vert et aneth", image: "/cover_3.png" },
    ],
    "Plats": [
        { name: "Filet de bar rôti, déclinaison de fenouil et jus d'arêtes", image: "/cover_1.png" },
        { name: "Suprême de volaille fermière, purée truffée et légumes glacés", image: "/cover_2.png" },
        { name: "Risotto crémeux aux champignons de bois et parmesan affiné", image: "/cover_3.png" },
    ],
    "Desserts": [
        { name: "Tartelette déstructurée au citron de Menton", image: "/cover_1.png" },
        { name: "Mille-feuille revisité à la vanille de Madagascar", image: "/cover_2.png" },
        { name: "Fondant au chocolat grand cru et glace fève tonka", image: "/cover_3.png" },
    ]
};

const categories = Object.keys(menuData) as Array<keyof typeof menuData>;

export default function MenuPage() {
    const [activeCategory, setActiveCategory] = useState<keyof typeof menuData>("Entrées");

    const [hoveredImage, setHoveredImage] = useState<string | null>(null);
    const [hoveredName, setHoveredName] = useState<string | null>(null);
    const [imageRotateZ, setImageRotateZ] = useState<number>(0);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(springY, [-1, 1], [15, -15]);
    const rotateY = useTransform(springX, [-1, 1], [-15, 15]);

    const handleMouseMove = (e: MouseEvent) => {
        if (typeof window !== "undefined") {
            const normalizedX = (e.clientX / window.innerWidth - 0.5) * 2;
            const normalizedY = (e.clientY / window.innerHeight - 0.5) * 2;
            mouseX.set(normalizedX);
            mouseY.set(normalizedY);
        }
    };

    const handleMouseEnter = (item: { name: string, image: string }) => {
        setHoveredImage(item.image);
        setHoveredName(item.name);
        setImageRotateZ(Math.random() * 10 - 5);
    };

    const handleMouseLeave = () => {
        setHoveredImage(null);
        setHoveredName(null);
    };

    return (
        <div
            className="min-h-screen pt-20 pb-30 px-6 relative bg-[#FAF8F5] overflow-x-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* --- LE CONTENEUR D'IMAGES --- */}
            <div
                className="fixed inset-0 pointer-events-none z-30 flex items-center justify-end pr-6 md:pr-10 lg:pr-24"
                style={{ perspective: 1200 }} 
            >
                <AnimatePresence>
                    {hoveredImage && (
                        <motion.div
                            key={hoveredImage}
                            initial={{ clipPath: "inset(50% 0 50% 0)", scale: 0.8, opacity: 0, rotateZ: imageRotateZ }}
                            animate={{ clipPath: "inset(0% 0 0% 0)", scale: 1, opacity: 1, rotateZ: imageRotateZ }}
                            exit={{ clipPath: "inset(50% 0 50% 0)", scale: 0.8, opacity: 0, rotateZ: imageRotateZ }}
                            transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
                            style={{
                                rotateX,
                                rotateY,
                            }}
                            className="w-[28rem] h-[20rem] md:w-[38rem] md:h-[26rem] lg:w-[48rem] lg:h-[32rem] absolute rounded-md overflow-hidden shadow-2xl"
                        >
                            <motion.div
                                initial={{ scale: 1.2 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="w-full h-full relative"
                            >
                                <Image
                                    src={hoveredImage}
                                    alt="Aperçu du plat"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* --- EN-TÊTE DU MENU --- */}
            <div className="max-w-3xl mx-auto text-center mb-16 relative z-20 pointer-events-none">
                <h1 className="font-title text-6xl text-content mb-4">Le menu</h1>
                <p className="font-sans text-content/80 text-lg">
                    Chaque plat raconte un souvenir, une saison, un produit du terroir.
                </p>
            </div>

            {/* --- LE SLIDER DES CATÉGORIES --- */}
            <div className="flex justify-center mb-24 relative z-20">
                <div className="bg-secondary p-1 rounded-full flex relative shadow-md">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`relative px-8 py-3 rounded-full text-sm font-sans tracking-wide transition-colors z-10 ${activeCategory === category ? 'text-secondary' : 'text-white/80 hover:text-white'
                                }`}
                        >
                            {activeCategory === category && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-white rounded-full z-[-1]"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- LA LISTE DES PLATS --- */}
            {/* RETOUR AU CENTRAGE ICI (mx-auto au lieu de mr-auto ml-10) */}
            <div className="max-w-4xl mx-auto flex flex-col relative z-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col"
                    >
                        {menuData[activeCategory].map((item, index) => {
                            const isActive = hoveredName === item.name;
                            const isAnotherHovered = hoveredName !== null && hoveredName !== item.name;

                            return (
                                <div
                                    key={index}
                                    onMouseEnter={() => handleMouseEnter(item)}
                                    onMouseLeave={handleMouseLeave}
                                    className={`border-b border-secondary/30 py-8 cursor-pointer flex justify-between items-center transition-all duration-500 ${isAnotherHovered ? 'opacity-30' : 'opacity-100'
                                        }`}
                                >
                                    <p className={`font-sans text-xl transition-all duration-300 origin-left ${isActive
                                        ? 'text-black translate-x-4 font-medium'
                                        : 'text-content font-normal'
                                        }`}>
                                        {item.name}
                                    </p>
                                </div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}