import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-main text-[#F9F7F2] min-h-screen rounded-t-[3rem] p-8 md:p-12 lg:p-16 flex flex-col relative z-10 overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">

            {/* --- HAUT DU FOOTER --- */}
            <div className="flex flex-col md:flex-row justify-between items-start w-full gap-8">

                {/* 1. Gauche : Adresse & Horaires */}
                <div className="flex flex-col gap-6 text-sm md:text-base font-sans font-light">
                    <div>
                        <p>12 Rue des Oliviers</p>
                        <p>13000 Marseille</p>
                    </div>
                    <div className="text-[#F9F7F2]/80">
                        <p>Le restaurant est ouvert</p>
                        <p>du jeudi au dimanche.</p>
                    </div>
                </div>

                {/* 2. Droite : Contacts & Réseaux */}
                <div className="flex gap-8 md:gap-16 text-sm md:text-base font-sans font-light md:text-right">
                    <div className="flex flex-col gap-1">
                        <a href="mailto:info@latabledesoliviers.fr" className="hover:opacity-60 transition-opacity">
                            info@latable.fr
                        </a>
                        <a href="tel:+33400000000" className="hover:opacity-60 transition-opacity">
                            04 00 00 00 00
                        </a>
                    </div>
                    <div className="flex flex-col gap-1">
                        <a href="#" className="hover:opacity-60 transition-opacity">instagram</a>
                        <a href="#" className="hover:opacity-60 transition-opacity">facebook</a>
                    </div>
                </div>

            </div>

            {/* --- CENTRE DU FOOTER (PARFAITEMENT CENTRÉ) --- */}
            {/* flex-1 permet à cette zone de pousser le haut vers le haut, et le bas vers le bas */}
            <div className="flex-1 flex flex-col items-center justify-center gap-8 w-full py-12">
                <Image
                    src="/logo.svg"
                    alt="Logo La Table des Oliviers"
                    width={120}
                    height={100}
                    className="w-24 md:w-32 h-auto brightness-0 invert"
                />
                <h2 className="font-title text-6xl md:text-8xl lg:text-9xl tracking-wider uppercase leading-none text-center">
                    La Table<br />des Oliviers
                </h2>
            </div>

            {/* --- BAS DU FOOTER --- */}
            <div className="flex flex-col md:flex-row justify-between items-end w-full gap-8 text-xs font-sans text-[#F9F7F2]/60">

                {/* Bas Gauche : Infos légales */}
                <div className="flex flex-col gap-1 max-w-xs">
                    <p>LA TABLE DES OLIVIERS S.A.S</p>
                    <p>12 Rue des Oliviers • 13000 Marseille</p>
                    <p>SIRET 123 456 789 00012</p>
                </div>

                {/* Bas Centre : La signature */}
                <div className="text-center hidden md:block">
                    <span className="font-title italic text-2xl text-[#F9F7F2]/80">
                        depuis 2021
                    </span>
                </div>

                {/* Bas Droite : Liens */}
                <div className="flex flex-col md:items-end gap-1 text-left md:text-right">
                    <Link href="/mentions-legales" className="hover:text-[#F9F7F2] transition-colors">
                        Privacy Policy
                    </Link>
                    <Link href="/confidentialite" className="hover:text-[#F9F7F2] transition-colors">
                        Cookie Policy
                    </Link>
                    <p className="mt-4">Designed by toi</p>
                </div>

            </div>

        </footer>
    );
}