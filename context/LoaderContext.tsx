"use client";

import { createContext, useContext, useState, useLayoutEffect } from 'react';

interface LoaderContextType {
    isLoading: boolean;
    setIsLoading: (v: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType>({
    isLoading: true,
    setIsLoading: () => {},
});

export function LoaderProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    // useLayoutEffect runs before paint — if session already loaded, resolve immediately
    // so there's no visible flash of hidden content for returning users
    useLayoutEffect(() => {
        if (sessionStorage.getItem('pageLoaded')) {
            setIsLoading(false);
        }
    }, []);

    return (
        <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoaderContext.Provider>
    );
}

export const useLoader = () => useContext(LoaderContext);
