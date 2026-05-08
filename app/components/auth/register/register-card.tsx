"use client";

import React, { useState } from "react";
import { validateEmail } from '@/app/functions/validate-email';
import { DialogDetails } from '../dialog-data/dialog-details';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import ButtonLogin from "../button-login/button-login";
import Link from "next/link";

export default function RegisterCard() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [details, setDetails] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (!details.email.trim()) {
            setError("El correo es requerido");
            return;
        }

        if (!validateEmail(details.email.trim())) {
            setError("El correo debe ser válido");
            return;
        }

        if (details.password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        if (details.password !== details.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        setOpen(true);
    };

    return (
        <div
            className="rounded-2xl px-10 py-8 w-full max-w-sm flex flex-col items-center gap-5"
            style={{
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
            }}
        >
            {/* TÍTULO */}
            <h2 className="text-2xl font-bold text-white self-center">Registro</h2>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

                {/* EMAIL */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-white/80">Correo electrónico</label>
                    <input
                        type="email"
                        placeholder="username@gmail.com"
                        value={details.email}
                        onChange={(e) => setDetails({ ...details, email: e.target.value })}
                        required
                        disabled={loading}
                        className="border border-white/30 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-400 transition disabled:opacity-50 bg-white/10 text-white placeholder:text-white/40"
                    />
                </div>

                {/* PASSWORD */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-white/80">Contraseña</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Contraseña"
                            value={details.password}
                            onChange={(e) => setDetails({ ...details, password: e.target.value })}
                            required
                            minLength={6}
                            disabled={loading}
                            className="w-full border border-white/30 rounded-lg px-3 py-2 pr-10 text-sm outline-none focus:border-amber-400 transition disabled:opacity-50 bg-white/10 text-white placeholder:text-white/40"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(p => !p)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-white/80">Confirmar contraseña</label>
                    <div className="relative">
                        <input
                            type={showConfirm ? 'text' : 'password'}
                            placeholder="Confirmar contraseña"
                            value={details.confirmPassword}
                            onChange={(e) => setDetails({ ...details, confirmPassword: e.target.value })}
                            required
                            minLength={6}
                            disabled={loading}
                            className="w-full border border-white/30 rounded-lg px-3 py-2 pr-10 text-sm outline-none focus:border-amber-400 transition disabled:opacity-50 bg-white/10 text-white placeholder:text-white/40"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(p => !p)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                            tabIndex={-1}
                        >
                            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                {/* ERROR */}
                {error && <p className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center py-2 px-3 rounded-lg">{error}</p>}

                {/* BOTÓN */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg py-2 text-sm transition disabled:opacity-60 cursor-pointer"
                >
                    {loading ? 'Cargando...' : 'Regístrate gratis'}
                </button>
            </form>

            {/* OR CONTINUE WITH */}
            <div className="flex items-center gap-3 w-full">
                <div className="flex-1 h-px bg-white/20" />
                <span className="text-xs text-white/50 whitespace-nowrap">o continuar con</span>
                <div className="flex-1 h-px bg-white/20" />
            </div>

            {/* GOOGLE BUTTON */}
            <ButtonLogin actionType='login'/>

            {/* LOGIN LINK */}
            <p className="text-xs text-white/50 text-center">
                ¿Ya tienes cuenta?{' '}
                <Link href="/login" className="font-bold text-white hover:text-amber-400 transition">
                    Inicia sesión
                </Link>
            </p>

            {/* MODAL */}
            <DialogDetails open={open} data={details} setOpen={setOpen} />
        </div>
    );
}
