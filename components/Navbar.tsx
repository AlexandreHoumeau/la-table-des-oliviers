"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    // Récupère l'URL actuelle (ex: "/menu" ou "/a-propos")
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-content/5">
            <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">

                {/* 1. Zone Gauche : Le Logo */}
                <div className="flex-1 flex justify-start">
                    <Link href="/">
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

                {/* 2. Zone Centrale : Les liens de navigation */}
                <ul className="hidden md:flex flex-1 justify-center gap-12">
                    <li>
                        <Link 
                            href="/menu" 
                            // Si le pathname est "/menu", on met le texte en couleur secondaire (marron), sinon on laisse la couleur par défaut
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

                {/* 3. Zone Droite : Vide, mais indispensable pour garder les liens centrés */}
                <div className="flex-1 flex justify-end">
                    {/* Instagram et Infos pratiques ont été retirés */}
                </div>

            </nav>
        </header>
    );
}