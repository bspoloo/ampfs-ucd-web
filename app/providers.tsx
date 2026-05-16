"use client";

import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "@/app/context/toast-context";
import { MessageProvider } from "./context/message-context";

function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <MessageProvider>
                <ToastProvider>
                    {children}
                </ToastProvider>
            </MessageProvider>
        </SessionProvider>
    )
}

export default Providers;
