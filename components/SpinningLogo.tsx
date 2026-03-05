"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function SpinningLogo() {
    return (
        <div className="relative flex items-center justify-center w-64 h-64">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                className="absolute inset-0 w-full h-full"
            >
                <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                    <path id="footerCirclePath" d="M 100, 30 a 70,70 0 1,1 0,140 a 70,70 0 1,1 0,-140" fill="none" />
                    <text fill="currentColor" className="font-title text-[13px] uppercase tracking-[0.15em]">
                        <textPath href="#footerCirclePath" startOffset="0" textLength="439" lengthAdjust="spacing">
                            LA TABLE DES OLIVIERS • LA TABLE DES OLIVIERS •
                        </textPath>
                    </text>
                </svg>
            </motion.div>
            <Image src="/logo.svg" alt="Logo La Table des Oliviers" width={80} height={80} className="w-20 h-auto brightness-0 invert" />
        </div>
    );
}
