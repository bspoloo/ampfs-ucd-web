"use client";

import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "@/app/context/toast-context";

function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ToastProvider>
                {children}
            </ToastProvider>
        </SessionProvider>
    )
}

export default Providers;
