"use client";

import { X, CheckCircle, XCircle, Clock, Calendar, FileText, Tag, TextCursor, TextCursorInput, Loader2, CircleUser, CircleUserRound } from "lucide-react";
import { Permit } from "@/app/interfaces/permit.interface";
import { FormDataProps } from "@/app/props/form-data.props";
import { Club } from "@/app/interfaces/club.interface";
import { useEffect, useRef, useState } from "react";
import UnknowTeam from "../../../public/team-logo.png";
import Load from "@/public/loader-form.svg";
import { usePostClubs } from "@/app/hooks/clubs/use-post-clubs";
import { useToast } from "@/app/context/toast-context";

export default function FormClub({ data: club, isOpen, onAccept, onClose }: FormDataProps<Club>) {
    const [clubData, setClubData] = useState<Club>(club ? club : {
        // id: "",
        name: "",
        president: "",
        delegate: "",
        logo_url: "https://play-lh.googleusercontent.com/CK5oI7yNXE3q05oJ1qJcWT9CSvtGvFtyfH493J1Oc6P_rYO5wXnO7vxJdRdclAXGphAe"
    } as Club);
    const [validationError, setValidationError] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [onSend, setOnSend] = useState<boolean>(false);
    const { response, loading, error: errorServer } = usePostClubs(clubData!, onSend);
    const { showToast } = useToast();

    const validateForm = (): boolean => {
        const keys: string[] = Object.keys(clubData);
        let verify = true;
        setValidationError('');
        keys.forEach((key) => {
            if (!clubData[key as keyof Club]) {
                setValidationError(`${key} no contiene una valor`);
                verify = false;
            }
        });
        return verify
    }

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            setOnSend(true);
        }
    }

    useEffect(() => {
        if (response !== null) {
            setOnSend(false)
            setClubData({
                // id: "",
                name: "",
                president: "",
                delegate: "",
                logo_url: "https://play-lh.googleusercontent.com/CK5oI7yNXE3q05oJ1qJcWT9CSvtGvFtyfH493J1Oc6P_rYO5wXnO7vxJdRdclAXGphAe"
            })
            showToast(`Club ${response.name} insertado correctamente`, "success");
            // response is a Club, cast to any to match possible onAccept signature
            onAccept?.();
            onClose?.()
        }
    }, [response]);

    useEffect(() => {
        if (club) {
            setClubData(club);
        }
    }, [club]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            // onClick={onClose}
            />

            <form onSubmit={handleForm} className="relative bg-(--bg-sidebar) border border-(--border-dark) rounded-2xl  shadow-2xl z-10 overflow-hidden w-[90%] max-w-[600px]">

                <div className="flex items-center justify-between border-b border-(--border-dark) px-6 py-5">
                    <div>
                        <h2 className="text-xl font-semibold text-white">
                            {club
                                ? "Editar club"
                                : "Nuevo club"}
                        </h2>

                        <p className="text-sm text-white/50">
                            Completa la información del club
                        </p>
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
                        <img src={clubData.logo_url ? clubData.logo_url : UnknowTeam.src} alt={`${clubData.name} image`} className="w-62.5 h-62.5 rounded-full object-cover border-[#b11212] border-2" />
                        <button
                            type="button"
                            onClick={() => console.log("insert image")}
                            className="px-5 py-2 rounded-lg bg-[#292929] hover:bg-[#181717] text-white text-sm font-medium transition cursor-pointer"
                        >
                            Insertar logo
                        </button>
                    </div>
                    <div className="flex flex-col gap-5 py-6 w-[250px]">
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="flex items-center gap-2 text-sm font-medium text-white/80"
                            >
                                <TextCursorInput size={16} />
                                Nombre
                            </label>

                            <input
                                id="name"
                                type="text"
                                placeholder="Club Deportivo Santa Ana"
                                value={clubData?.name ?? ""}
                                onChange={(e) =>
                                    setClubData({
                                        ...clubData,
                                        name: e.target.value,
                                    })
                                }
                                className="w-full border border-white/30 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#b11212] transition disabled:opacity-50 bg-white/10 text-white placeholder:text-white/40"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="president"
                                className="flex items-center gap-2 text-sm font-medium text-white/80"
                            >
                                <CircleUser size={16} />
                                Presidente
                            </label>

                            <input
                                id="president"
                                type="text"
                                placeholder="Alex Ramuro Mendez"
                                value={clubData?.president ?? ""}
                                onChange={(e) =>
                                    setClubData({
                                        ...clubData,
                                        president: e.target.value,
                                    })
                                }
                                className="w-full border border-white/30 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#b11212] transition disabled:opacity-50 bg-white/10 text-white placeholder:text-white/40"

                            />
                        </div>
                        <div className="space-y-2">

                            <label
                                htmlFor="delegate"
                                className="flex items-center gap-2 text-sm font-medium text-white/80"
                            >
                                <CircleUserRound size={16} />
                                Delegado
                            </label>

                            <input
                                id="delegate"
                                type="text"
                                placeholder="Max Ruedas Polacos"
                                value={clubData?.delegate ?? ""}
                                onChange={(e) =>
                                    setClubData({
                                        ...clubData,
                                        delegate: e.target.value,
                                    })
                                }
                                className="w-full border border-white/30 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#b11212] transition disabled:opacity-50 bg-white/10 text-white placeholder:text-white/40"

                            />
                        </div>
                        {(error || validationError || errorServer) && (
                            <p className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center py-2 px-3 rounded-lg">{validationError || error || errorServer}</p>
                        )}
                    </div>
                </div>
                <div className="px-6 py-4 border-t border-(--border-dark) flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition cursor-pointer"
                    >
                        Cancelar
                    </button>

                    <button
                        disabled={loading}
                        type="submit"
                        className="flex justify-center items-center px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition cursor-pointer"
                    >
                        {!loading ? <div>
                            Insertar
                        </div>
                            : <div>
                                <Loader2 className="w-4 h-4 animate-spin"></Loader2>
                            </div>
                        }
                    </button>
                </div>
            </form>
        </div>
    );
}