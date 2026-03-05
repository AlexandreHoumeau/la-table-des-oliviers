"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const pathname = usePathname();
    
    // État pour contrôler l'ouverture du menu mobile
    const [isOpen, setIsOpen] = useState(false);

    // Bloque le défilement de la page quand le menu mobile est ouvert
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-content/5">
            {/* relative z-50 garantit que la barre de nav reste au-dessus du menu mobile qui va s'ouvrir */}
            <nav className="relative z-50 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full bg-transparent">

                {/* 1. Zone Gauche : Le Logo */}
                <div className="flex-1 flex justify-start">
                    <Link href="/" onClick={() => setIsOpen(false)}>
                        <Image
                            src="/logo.svg"
                            alt="Logo La Table des Oliviers"
                            width={60}
                            height={40}
                            className="h-10 w-auto" 
                            priority
                        />
                    </Link>
                </div>

                {/* 2. Zone Centrale : Les liens de navigation (Cachés sur mobile) */}
                <ul className="hidden md:flex flex-1 justify-center gap-12">
                    <li>
                        <Link 
                            href="/menu" 
                            className={`transition-colors text-sm tracking-wide ${
                                pathname === '/menu' 
                                ? 'text-secondary font-semibold' 
                                : 'text-content font-medium hover:text-secondary'
                            }`}
                        >
                            Le menu
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/a-propos" 
                            className={`transition-colors text-sm tracking-wide ${
                                pathname === '/a-propos' 
                                ? 'text-secondary font-semibold' 
                                : 'text-content font-medium hover:text-secondary'
                            }`}
                        >
                            À propos
                        </Link>
                    </li>
                </ul>

                {/* 3. Zone Droite : Le bouton Burger (Visible uniquement sur mobile) */}
                <div className="flex-1 flex justify-end md:block">
                    {/* Wrapper invisible sur desktop (md:hidden) */}
                    <div className="md:hidden flex justify-end w-full">
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none"
                            aria-label="Menu"
                        >
                            {/* Les 3 lignes du burger animées en croix */}
                            <span className={`block w-6 h-[2px] bg-content transition-transform duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
                            <span className={`block w-6 h-[2px] bg-content transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                            <span className={`block w-6 h-[2px] bg-content transition-transform duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
                        </button>
                    </div>
                </div>

            </nav>

            {/* --- LE MENU MOBILE (Plein écran) --- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        // Fixé en dessous de la navbar (z-40) et prend tout l'écran
                        className="fixed inset-0 z-40 bg-[#FAF8F5] flex flex-col items-center justify-center h-screen w-full"
                    >
                        <ul className="flex flex-col items-center gap-8">
                            <li>
                                <Link 
                                    href="/" 
                                    onClick={() => setIsOpen(false)} // Ferme le menu au clic
                                    className={`font-title text-3xl transition-colors ${
                                        pathname === '/' ? 'text-secondary' : 'text-content'
                                    }`}
                                >
                                    Accueil
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/menu" 
                                    onClick={() => setIsOpen(false)}
                                    className={`font-title text-3xl transition-colors ${
                                        pathname === '/menu' ? 'text-secondary' : 'text-content'
                                    }`}
                                >
                                    Le menu
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/a-propos" 
                                    onClick={() => setIsOpen(false)}
                                    className={`font-title text-3xl transition-colors ${
                                        pathname === '/a-propos' ? 'text-secondary' : 'text-content'
                                    }`}
                                >
                                    À propos
                                </Link>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

        </header>
    );
}