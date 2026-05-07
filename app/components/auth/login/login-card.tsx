"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import { validateEmail } from '@/app/functions/validate-email';
import { Eye, EyeOff } from 'lucide-react';
import ButtonLogin from '../button-login/button-login';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function LoginCard() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValidationError('');
        setError(null);
        setValidationError('');
        setLoading(true);
        if (!validateEmail(email.trim())) {
            setValidationError("El correo debe ser válido");
            setLoading(false);
            return;
        }
        try {
            const response = await signIn("credentials", {
                email: email.trim(),
                password: password,
                redirect: false,
            });

            if (!response?.ok && response?.error) {
                if (response.error === "CredentialsSignin") {
                    setError("Correo electrónico o contraseña incorrectos");
                } else if (response.error === "AccessDenied") {
                    setError("Acceso denegado. No tienes permiso para ingresar.");
                } else {
                    setError("Error al iniciar sesión: " + response.error);
                }
                setLoading(false);
                return;
            }
            if (response?.ok && response.status === 200) {
                router.push('/dashboard');
                router.refresh(); 
            }

        } catch (err) {
            console.error("Login exception:", err);
            setError("Error al conectar con el servidor");
            setLoading(false);
        }
    };

    return (
        <div className="rounded-2xl px-10 py-8 w-full max-w-sm flex flex-col items-center gap-5"
            style={{
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
            }}
        >

            {/* TÍTULO */}
            <h2 className="text-2xl font-bold text-white self-center">Iniciar sesión</h2>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

                {/* EMAIL */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm font-medium text-white/80">
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="username@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        className="border border-white/30 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-400 transition disabled:opacity-50 bg-white/10 text-white placeholder:text-white/40"
                    />
                </div>

                {/* PASSWORD */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-sm font-medium text-white/80">
                        Contraseña
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

                {/* FORGOT PASSWORD */}
                <a
                    href="#"
                    className="text-xs text-white/60 hover:text-amber-400 self-start -mt-2 transition"
                >
                    ¿Olvidaste tu contraseña?
                </a>

                {/* ERRORES */}
                {(error || validationError) && (
                    <p className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center py-2 px-3 rounded-lg">{validationError || error}</p>
                )}

                {/* BOTÓN SIGN IN */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg py-2 text-sm transition disabled:opacity-60 cursor-pointer"
                >
                    {loading ? 'Cargando...' : 'Iniciar sesión'}
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

            {/* REGISTER LINK */}
            <p className="text-xs text-white/50 text-center">
                ¿No tienes cuenta?{' '}
                <Link href="/register" className="font-bold text-white hover:text-amber-400 transition">
                    Regístrate gratis
                </Link>
            </p>
        </div>
    );
}