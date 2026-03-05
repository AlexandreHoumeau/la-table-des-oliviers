"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLoader } from '@/context/LoaderContext';

export default function PageLoader() {
    const { isLoading, setIsLoading } = useLoader();
    const [progress, setProgress] = useState(0);

    // Use a ref to read the latest isLoading value inside the effect
    // without adding it to the dependency array (avoids stale closure)
    const isLoadingRef = useRef(isLoading);
    isLoadingRef.current = isLoading;

    useEffect(() => {
        // Already resolved (returning user in same session) — skip entirely
        if (!isLoadingRef.current) return;

        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += Math.floor(Math.random() * 8) + 2;
            if (currentProgress >= 85) {
                currentProgress = 85;
                clearInterval(interval);
            }
            setProgress(currentProgress);
        }, 150);

        const handleLoad = () => {
            clearInterval(interval);
            setProgress(100);
            setTimeout(() => {
                setIsLoading(false);
                sessionStorage.setItem('pageLoaded', '1');
            }, 500);
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad, { once: true });
        }

        return () => {
            clearInterval(interval);
            window.removeEventListener('load', handleLoad);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF8F5] text-content"
                >
                    <div className="relative flex items-center justify-center w-64 h-64">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                            className="absolute inset-0 w-full h-full"
                        >
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
    );
}
