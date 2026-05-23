"use client";

import { X, TextCursorInput, Loader2, CircleUser, CircleUserRound, Upload } from "lucide-react";
import { FormDataProps } from "@/app/props/form-data.props";
import { Club } from "@/app/interfaces/club.interface";
import { useEffect, useRef, useState } from "react";
import DefaultLogo from "../../../public/logo_default.jpg";
import { usePostClubs } from "@/app/hooks/clubs/use-post-clubs";
import { useToast } from "@/app/context/toast-context";

const ONLY_LETTERS_RE = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;

function capitalizeWords(str: string): string {
    return str.replace(/(^|\s)([a-záéíóúüñ])/gi, (_, sep, char) => sep + char.toUpperCase());
}

const EMPTY_CLUB: Club = { name: "", president: "", delegate: "", logo_url: "" };

export default function FormClub({ data: club, isOpen, onAccept, onClose }: FormDataProps<Club>) {
    const [clubData, setClubData] = useState<Club>(club ?? EMPTY_CLUB);
    const [hasLogo, setHasLogo] = useState(false);
    const [onSend, setOnSend] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { response, loading, error: serverError } = usePostClubs(clubData, onSend);
    const { showToast } = useToast();

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const base64 = event.target?.result as string;
            setClubData(prev => ({ ...prev, logo_url: base64 }));
            setHasLogo(true);
        };
        reader.readAsDataURL(file);
    }

    function handleNameChange(value: string) {
        if (value && !ONLY_LETTERS_RE.test(value)) return;
        setClubData(prev => ({ ...prev, name: value }));
    }

    function handlePersonChange(field: "president" | "delegate", value: string) {
        if (value && !ONLY_LETTERS_RE.test(value)) return;
        setClubData(prev => ({ ...prev, [field]: capitalizeWords(value) }));
    }

    function validateForm(): boolean {
        if (!hasLogo) {
            showToast("Debes subir un logo para el club", "error");
            return false;
        }
        if (!clubData.name.trim()) {
            showToast("El nombre del club es obligatorio", "error");
            return false;
        }
        if (!clubData.president.trim()) {
            showToast("El nombre del presidente es obligatorio", "error");
            return false;
        }
        if (!clubData.delegate.trim()) {
            showToast("El nombre del delegado es obligatorio", "error");
            return false;
        }
        return true;
    }

    function handleForm(e: { preventDefault(): void }) {
        e.preventDefault();
        if (validateForm()) setOnSend(true);
    }

    useEffect(() => {
        if (!response) return;
        setOnSend(false);
        setClubData(EMPTY_CLUB);
        setHasLogo(false);
        showToast(`Club "${response.name}" registrado correctamente`, "success");
        onAccept?.();
        onClose?.();
    }, [response]);

    useEffect(() => {
        if (!serverError) return;
        setOnSend(false);
        showToast(serverError, "error");
    }, [serverError]);

    useEffect(() => {
        if (!club) return;
        setClubData(club);
        setHasLogo(!!club.logo_url);
    }, [club]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <form
                onSubmit={handleForm}
                className="relative bg-(--bg-sidebar) border border-(--border-dark) rounded-2xl shadow-2xl z-10 overflow-hidden w-[90%] max-w-[600px]"
            >
                <div className="flex items-center justify-between border-b border-(--border-dark) px-6 py-5">
                    <div>
                        <h2 className="text-xl font-semibold text-white">
                            {club ? "Editar club" : "Nuevo club"}
                        </h2>
                        <p className="text-sm text-white/50">Completa la información del club</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex justify-center items-center gap-4 p-2.5 flex-wrap">
                    <div className="flex flex-col justify-between items-center w-[250px] gap-2">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="w-62.5 h-62.5 rounded-full border-2 border-[#b11212] overflow-hidden cursor-pointer relative group"
                        >
                            <img
                                src={clubData.logo_url || DefaultLogo.src}
                                alt="Logo del club"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                                <Upload size={20} className="text-white" />
                                <span className="text-white text-xs font-medium">Cambiar logo</span>
                            </div>
                        </div>
                        {!hasLogo && (
                            <p className="text-xs text-amber-400 text-center">Sin logo — requerido</p>
                        )}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-5 py-2 rounded-lg bg-[#292929] hover:bg-[#181717] text-white text-sm font-medium transition cursor-pointer"
                        >
                            Insertar logo
                        </button>
                    </div>

                    <div className="flex flex-col gap-5 py-6 w-[250px]">
                        <div className="space-y-2">
                            <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-white/80">
                                <TextCursorInput size={16} />
                                Nombre
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Club Deportivo Santa Ana"
                                value={clubData.name}
                                onChange={(e) => handleNameChange(e.target.value)}
                                className="w-full border border-white/30 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#b11212] transition bg-white/10 text-white placeholder:text-white/40"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="president" className="flex items-center gap-2 text-sm font-medium text-white/80">
                                <CircleUser size={16} />
                                Presidente
                            </label>
                            <input
                                id="president"
                                type="text"
                                placeholder="Rodrigo Perez Hinojosa"
                                value={clubData.president}
                                onChange={(e) => handlePersonChange("president", e.target.value)}
                                className="w-full border border-white/30 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#b11212] transition bg-white/10 text-white placeholder:text-white/40"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="delegate" className="flex items-center gap-2 text-sm font-medium text-white/80">
                                <CircleUserRound size={16} />
                                Delegado
                            </label>
                            <input
                                id="delegate"
                                type="text"
                                placeholder="Max Ruedas Polacos"
                                value={clubData.delegate}
                                onChange={(e) => handlePersonChange("delegate", e.target.value)}
                                className="w-full border border-white/30 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#b11212] transition bg-white/10 text-white placeholder:text-white/40"
                            />
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-(--border-dark) flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        disabled={loading}
                        type="submit"
                        className="flex justify-center items-center px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition cursor-pointer disabled:opacity-60"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Insertar"}
                    </button>
                </div>
            </form>
        </div>
    );
}
