"use client";

import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "@/app/context/toast-context";
import { MessageProvider } from "./context/message-context";
import { ThemeProvider } from "./context/theme-context";
import { useEffect, useState } from "react";

function ClientOnlyProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <MessageProvider>
                <ToastProvider>
                    {children}
                </ToastProvider>
            </MessageProvider>
        </ThemeProvider>
    )
}

function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ClientOnlyProviders>
                {children}
            </ClientOnlyProviders>
        </SessionProvider>
    )
}

export default Providers;
