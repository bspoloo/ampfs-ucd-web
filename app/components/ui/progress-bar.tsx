import { Dispatch, SetStateAction } from "react";


type ProgresBarProps = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    min: number,
    max: number,
    current: number,
    message: string
}

export default function ProgresBar({ min, max, current, message, isOpen, setIsOpen }: ProgresBarProps) {
    if (min < 0) return null;
    // if (!isOpen) return null;
    return <>
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className={`
                absolute inset-0
                flex items-center justify-center
                bg-black/70
                backdrop-blur-md
                transition-all duration-300
                ${!isOpen ? "animate-fade-out" : "animate-fade-in"}
            `}>

                <div className={`
                    relative w-full max-w-lg overflow-hidden rounded-3xl
                    border border-white/10
                    bg-(--bg-sidebar)
                    shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                    backdrop-blur-xl
                    ${!isOpen ? "animate-popup-out" : "animate-popup-in"}
                `}>
                    <div className="px-3 py-5">
                        <div className="flex flex-col py-1">
                            <h2 className="text-base font-semibold text-(--text-sidebar)">
                                {message}
                            </h2>

                            <span className="text-xs text-white/40">
                                Sistema de notificaciones
                            </span>
                        </div>
                        <div className="w-full h-4 bg-gray-400 rounded-full">
                            <div
                                style={{
                                    width: `${Math.ceil((current / max) * 100)}%`
                                }}
                                className="h-full text-center text-xs text-white bg-(--color-primary) rounded-full"
                            >
                                {Math.ceil((current / max) * 100)}%
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </>
}