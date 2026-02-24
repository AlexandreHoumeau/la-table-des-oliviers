import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">

            {/* 1. Zone Gauche : Le Logo */}
            <div className="flex-1 flex justify-start">
                <Link href="/">
                    <Image
                        src="/logo.svg"
                        alt="Logo La Table des Olivier"
                        width={60}
                        height={40}
                        className="h-10 w-auto" // Laisse la hauteur dicter la taille
                        priority
                    />
                </Link>
            </div>

            {/* 2. Zone Centrale : Les liens de navigation */}
            <ul className="hidden md:flex flex-1 justify-center gap-10">
                <li>
                    <Link href="/menu" className="text-content hover:text-main transition-colors text-sm font-medium">
                        Le menu
                    </Link>
                </li>
                <li>
                    <Link href="/a-propos" className="text-content hover:text-main transition-colors text-sm font-medium">
                        A propos
                    </Link>
                </li>
                <li>
                    <Link href="/infos-pratiques" className="text-content hover:text-main transition-colors text-sm font-medium">
                        Infos pratiques
                    </Link>
                </li>
            </ul>

            {/* 3. Zone Droite : Les icônes réseaux sociaux */}
            <div className="flex-1 flex justify-end">
                <Link
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-content hover:text-main transition-colors"
                >
                    {/* SVG direct de l'icône Instagram pour t'éviter d'installer une librairie */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                    >
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                </Link>
            </div>

        </nav>
    );
}