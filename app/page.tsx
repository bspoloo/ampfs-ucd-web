"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trophy, MapPin, Mail, Phone, ChevronRight,
  UserCheck, Calendar, Swords, ArrowRight,
  Zap, BarChart3, Layers, X, Menu,
} from "lucide-react";
import dynamic from "next/dynamic";
import { IntroAnimation } from "./components/home/intro-animation";
import { useSession } from "next-auth/react";
import { MenuHome } from "./classes/menu-home";
import { NEWS, STEPS } from "./consts/menu-home";

const HeroModel = dynamic(
  () => import("./components/home/hero-model").then((m) => m.HeroModel),
  { ssr: false }
);

/* ── Hook global de reveal (entrada + salida con dirección) ── */
function useRevealObserver() {

  useEffect(() => {
    const seen = new WeakSet<Element>();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            seen.add(el);
            el.classList.remove("is-exiting-up", "is-exiting-down");
            el.classList.add("is-entering");
          } else if (seen.has(el)) {
            el.classList.remove("is-entering");
            // Si sale por arriba → sube; si sale por abajo → baja
            if (entry.boundingClientRect.top < 0) {
              el.classList.add("is-exiting-up");
            } else {
              el.classList.add("is-exiting-down");
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ── Componente ──────────────────────────────────────── */
export default function Home() {
  useRevealObserver();
  const [menuOpen, setMenuOpen] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const { data: session, status } = useSession();
  const [menuHome, setMuenuHome] = useState<MenuHome | null>(null);

  useEffect(() => {
    setMuenuHome(new MenuHome(session!))
  }, [session]);

  return (
    <>
      {!introComplete && (
        <IntroAnimation onDone={() => setIntroComplete(true)} />
      )}
    <div className="bg-[#0e0e0e] text-white dot-grid">

      {/* ── HERO ───────────────────────────────────────── */}
      <section className="relative min-h-screen w-full overflow-hidden">
        {/* Foto de fondo */}
        <Image
          src="/fondoHome.png"
          alt="Frontón"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/65" />

        {/* Dot-grid local más opaco */}
        <div className="absolute inset-0 dot-grid opacity-60" />

        {/* ── Navbar ─────────────────────────────────────── */}
        <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between">

          {/* Logo (siempre visible) */}
          <div className="flex items-center">
            {/* Botón hamburguesa — solo móvil */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden w-[64px] h-[64px] flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#b11212" }}
              aria-label="Abrir menú"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
            <span className="font-black text-xl tracking-widest uppercase italic px-6">AMPFS</span>
          </div>

          {/* Links — solo escritorio */}
          <div className="hidden lg:flex items-center gap-8 pr-10">
            {menuHome?.getNAV_LINKS().map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-white/80 font-medium text-sm hover:text-white transition-colors relative group"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#b11212] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </nav>

        {/* ── Menú móvil overlay ──────────────────────────── */}
        <div
          className={`fixed inset-0 z-50 flex flex-col transition-all duration-300 lg:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          style={{ backgroundColor: "rgba(8,8,8,0.97)", backdropFilter: "blur(16px)" }}
        >
          {/* Cabecera del menú */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className="w-[64px] h-[64px] flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#b11212" }}
              >
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <span className="font-black text-xl tracking-widest uppercase italic px-6">AMPFS</span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="mr-6 w-10 h-10 flex items-center justify-center border border-white/10 hover:border-white/30 transition-colors"
              aria-label="Cerrar menú"
            >
              <X className="w-5 h-5 text-white/70" />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col px-8 pt-10 gap-1">
            {menuHome?.getNAV_LINKS().map(({ label, href }, i) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center justify-between py-5 border-b border-white/[0.06] hover:border-white/20 transition-colors"
                style={{ transitionDelay: menuOpen ? `${i * 0.05}s` : "0s" }}
              >
                <span className="font-black text-3xl text-white/80 group-hover:text-white transition-colors tracking-tight">
                  {label}
                </span>
                <ArrowRight className="w-5 h-5 text-[#b11212] opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>

          {/* Footer del menú */}
          {
            !session?.user ? <div className="mt-auto px-8 pb-12 flex items-center gap-4">
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 font-bold py-4 text-sm tracking-wide text-white"
                style={{ backgroundColor: "#b11212" }}
              >
                Crear cuenta
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="flex-1 flex items-center justify-center border border-white/15 text-white/60 font-bold py-4 text-sm tracking-wide hover:border-white/30 hover:text-white transition-all"
              >
                Iniciar sesión
              </Link>
            </div> :
              <div className=" h-24 rounded-full border border-(--btn-activo-sidebar) font-bold flex items-center justify-center text-[40px]">
                {session?.user.username!}
              </div>
          }
        </div>

        {/* Canvas 3D — capa de fondo absoluta dentro del hero */}
        <HeroModel />

        {/* Glow orb rojo izquierda */}
        <div
          className="absolute top-1/2 left-[20%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-10"
          style={{
            background: "radial-gradient(circle, rgba(177,18,18,0.15) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />

        {/* Contenido hero */}
        <div className="relative z-20 min-h-screen flex flex-col">
          <div className="h-[72px]" />

          <div className="flex-1 flex items-stretch px-6 lg:px-12 pb-14 gap-8">

            {/* Spacer izquierdo — solo escritorio, el modelo 3D lo llena visualmente */}
            <div className="hidden lg:flex flex-1" />

            {/* Texto — ancho completo en móvil, mitad en escritorio */}
            <div className="flex-1 flex flex-col items-start justify-center gap-5">
              {/* Badge */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-px bg-[#b11212]" />
                <span className="text-[#b11212] text-xs font-bold tracking-[0.25em] uppercase">
                  Asociación de Frontón
                </span>
              </div>

              <h1
                className="font-black leading-[0.92] tracking-tight"
                style={{ fontSize: "clamp(3.2rem, 8vw, 6.5rem)" }}
              >
                Compite.<br />
                <span className="text-white/30">Supérate.</span>
              </h1>

              <p className="text-white/55 font-medium text-sm max-w-xs leading-relaxed">
                El frontón es disciplina, velocidad y pasión.
                Únete a la comunidad y compite a tu nivel.
              </p>

              {/* Separador */}
              <div className="w-12 h-px bg-white/15" />

              {/* CTA buttons */}
              <div className="flex items-center gap-3 flex-wrap">
                <Link
                  href="/register"
                  className="group flex items-center gap-2 text-white font-bold px-9 py-3.5 text-sm tracking-wide transition-all duration-300 hover:gap-3"
                  style={{ backgroundColor: "#b11212" }}
                >
                  Empezar ahora
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/login"
                  className="border border-white/20 text-white/70 font-bold px-9 py-3.5 text-sm tracking-wide hover:border-white/40 hover:text-white transition-all duration-300"
                >
                  Iniciar sesión
                </Link>
              </div>

              {/* Mini stats */}
              <div className="flex items-center gap-6 pt-2">
                {[
                  { n: "150+", l: "Jugadores" },
                  { n: "12", l: "Torneos/año" },
                  { n: "500+", l: "Partidos" },
                ].map(({ n, l }) => (
                  <div key={l} className="flex flex-col">
                    <span className="font-black text-xl text-white">{n}</span>
                    <span className="text-white/35 text-xs tracking-wide">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ── LO QUE VIENE (glassmorphism) ───────────────── */}
      <section className="py-28 px-6">
        <div data-reveal className="max-w-6xl mx-auto">

          {/* Heading */}
          <div className="mb-14 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#b11212]" />
              <span className="text-[#b11212] text-xs font-bold tracking-[0.25em] uppercase">
                Noticias y próximos lanzamientos
              </span>
            </div>
            <h2 className="font-black" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Lo que viene en AMPFS
            </h2>
          </div>

          {/* Cards glassmorphism */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {NEWS.map(({ tag, tagColor, topColor, icon: Icon, title, desc, href }, i) => (
              <Link
                key={title}
                href={href}
                data-reveal
                style={{ transitionDelay: `${i * 0.12}s` }}
                className="glass-card group relative flex flex-col gap-5 p-7 overflow-hidden"
              >
                {/* Borde de color en la parte superior */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ backgroundColor: topColor }}
                />

                {/* Tag */}
                <span className={`self-start text-[10px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full border ${tagColor}`}>
                  {tag}
                </span>

                {/* Icono */}
                <div
                  className="w-11 h-11 flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${topColor}18`, border: `1px solid ${topColor}30` }}
                >
                  <Icon className="w-5 h-5" style={{ color: topColor }} />
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="font-bold text-white text-base leading-snug group-hover:text-white transition-colors">
                    {title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-white/30 group-hover:text-white/60 transition-colors">
                  Ver más
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>

                {/* Glow sutil en hover */}
                <div
                  className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${topColor}18 0%, transparent 70%)` }}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ──────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/[0.05]">
        <div data-reveal className="max-w-5xl mx-auto">

          <div className="mb-14 text-center flex flex-col gap-3 items-center">
            <div className="flex items-center gap-2">
              <div className="w-5 h-px bg-[#b11212]" />
              <span className="text-[#b11212] text-xs font-bold tracking-[0.25em] uppercase">
                Simple y directo
              </span>
              <div className="w-5 h-px bg-[#b11212]" />
            </div>
            <h2 className="font-black" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Así de fácil es participar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map(({ icon: Icon, step, title, desc }, i) => (
              <div
                key={step}
                data-reveal
                style={{ transitionDelay: `${i * 0.12}s` }}
                className="relative group glass-card flex flex-col gap-6 p-8"
              >
                {/* Número decorativo */}
                <span
                  className="absolute top-4 right-5 font-black text-white/[0.03] select-none leading-none"
                  style={{ fontSize: "6rem" }}
                >
                  {step}
                </span>

                {/* Icono */}
                <div
                  className="w-12 h-12 flex items-center justify-center"
                  style={{ backgroundColor: "#b11212" }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>

                {/* Número visible */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[#b11212] text-xs font-bold tracking-widest">{step}</span>
                  <h3 className="font-bold text-white text-lg">{title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
                </div>

                {/* Conector → */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#0e0e0e] border border-white/10 items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-[#b11212]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-32 px-6">
        {/* Fondos decorativos */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#b11212]/12 via-transparent to-transparent pointer-events-none" />
        <div
          className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(177,18,18,0.12) 0%, transparent 65%)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(177,18,18,0.07) 0%, transparent 65%)" }}
        />

        <div data-reveal className="relative max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-px bg-[#b11212]" />
            <span className="text-[#b11212] text-xs font-bold tracking-[0.25em] uppercase">
              ¿Estás listo?
            </span>
            <div className="w-5 h-px bg-[#b11212]" />
          </div>

          <h2 className="font-black leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Únete y empieza<br />
            <span className="text-white/30">a competir hoy</span>
          </h2>

          <p className="text-white/50 text-base max-w-sm leading-relaxed">
            Crea tu cuenta gratis, participa en torneos oficiales
            y sigue tu progreso en tiempo real.
          </p>

          <div className="flex items-center gap-4 flex-wrap justify-center mt-2">
            <Link
              href="/register"
              className="group flex items-center gap-2 font-bold px-12 py-4 text-sm tracking-wide text-white transition-all duration-300"
              style={{ backgroundColor: "#b11212" }}
            >
              Crear cuenta gratis
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/championships"
              className="border border-white/15 text-white/60 font-bold px-12 py-4 text-sm tracking-wide hover:border-white/35 hover:text-white transition-all duration-300"
            >
              Ver torneos
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <footer className="border-t border-white/[0.07] bg-[#080808]">
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: "#b11212" }}>
                <Trophy className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-lg tracking-widest uppercase italic">AMPFS</span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed">
              Asociación de Frontón — comunidad, competición y deporte.
            </p>
            <div className="flex items-center gap-3 mt-1">
              {["IG", "FB"].map((sn) => (
                <a
                  key={sn}
                  href="#"
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors text-xs font-bold"
                >
                  {sn}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold tracking-widest uppercase text-white/25">Navegación</p>
            <ul className="flex flex-col gap-3">
              {menuHome?.get_PROFILE_LINKS().map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/45 hover:text-white transition-colors flex items-center gap-1.5 group">
                    <ChevronRight className="w-3 h-3 text-[#b11212] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold tracking-widest uppercase text-white/25">Contacto</p>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-sm text-white/45">
                <MapPin className="w-4 h-4 text-[#b11212] mt-0.5 flex-shrink-0" />
                Por confirmar
              </li>
              <li className="flex items-center gap-3 text-sm text-white/45">
                <Mail className="w-4 h-4 text-[#b11212] flex-shrink-0" />
                contacto@ampfs.com
              </li>
              <li className="flex items-center gap-3 text-sm text-white/45">
                <Phone className="w-4 h-4 text-[#b11212] flex-shrink-0" />
                +34 000 000 000
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/[0.04] py-5 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-white/20 text-xs">© 2025 AMPFS UDC. Todos los derechos reservados.</p>
            <p className="text-white/20 text-xs">Desarrollado por el equipo de Ciencias</p>
          </div>
        </div>
      </footer>

    </div>
    </>
  );
}
