"use client";

import { Plus, ArrowRight, Search } from "lucide-react";
import { useState } from "react";

export default function Categories() {
    const [active, setActive] = useState("Tercera de ascenso");

    const categories = [
        "Cuarta de Ascenso",
        "Tercera de Ascenso",
        "Segunda de Ascenso",
        "Primera de Honor",
        "Seniors Ascenso",
        "Seniors Primera",
        "Masters Ascenso",
        "Masters Primera",
        "Guardia de Honor",
        "Super Guardia",
        "Damas segunda",
        "Damas primera",
        "Damas Seniors",
        "Varones sub 20",
        "Damas sub 20"
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-6 m-6">

            <div className="lg:w-64 bg-(--bg-sidebar) border border-(--border-dark) rounded-xl lg:rounded-l-xl p-4 
                            lg:h-[calc(100vh-305px)] overflow-y-auto custom-scroll">

                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-(--text-sidebar) font-semibold">Categorías</h3>
                    <button className="bg-(--btn-activo-sidebar) p-1 rounded hover:scale-105 transition">
                        <Plus className="w-4 h-4 text-white" />
                    </button>
                </div>

                <ul className="flex flex-col gap-2">
                    {categories.map((cat) => (
                        <li key={cat}>
                            <button
                                onClick={() => setActive(cat)}
                                className={`w-full text-left px-3 py-2 rounded text-sm transition
                                    ${active === cat
                                        ? "bg-(--btn-activo-sidebar) text-white"
                                        : "hover:bg-(--hover-btn-sidebar) text-(--text-btn-sidebar)"
                                    }`}
                            >
                                {cat}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex-1 bg-(--bg-sidebar) border border-(--border-dark) rounded-xl p-4 
                            lg:h-[calc(100vh-305px)] flex flex-col">

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">

                    <div className="flex items-center gap-2 bg-(--bg-main) border border-(--border-dark) px-3 py-2 rounded w-full sm:w-72">
                        <Search className="w-4 h-4 text-(--text-btn-sidebar)" />
                        <input
                            placeholder="Buscar por nombre..."
                            className="bg-transparent outline-none text-sm w-full text-(--text-sidebar)"
                        />
                    </div>

                    <div className="px-4 py-1 border border-(--border-dark) rounded text-sm text-(--text-btn-sidebar)">
                        10 equipos
                    </div>

                </div>

                <div className="flex-1 overflow-y-auto custom-scroll rounded-lg border border-(--border-dark)">
                    <table className="w-full text-sm">

                        <thead className="bg-(--bg-main) sticky top-0 z-10">
                            <tr className="text-(--text-btn-sidebar)">
                                <th className="p-3 text-left">N°</th>
                                <th className="p-3 text-left">Nombre de equipo</th>
                                <th className="p-3 text-left w-[120px]">Jugadores</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {Array.from({ length: 20 }).map((_, i) => (
                                <tr key={i} className="border-t border-(--border-dark) hover:bg-(--hover-btn-sidebar) transition">
                                    <td className="p-3">{i + 1}</td>
                                    <td className="p-3">Equipo {i + 1}</td>
                                    <td className="p-3 w-[120px]">
                                        <span className="inline-block text-center w-12 bg-(--btn-activo-sidebar) text-white px-3 py-1 rounded-full text-xs">
                                            {Math.floor(Math.random() * 4) + 1}
                                        </span>
                                    </td>
                                    <td className="p-3 text-right w-[60px]">
                                        <button className="bg-(--btn-activo-sidebar) p-2 rounded-full hover:scale-105 transition">
                                            <ArrowRight className="w-4 h-4 text-white" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

            </div>

            <div className="lg:w-56 flex flex-col gap-4 
                            lg:h-[calc(100vh-305px)] overflow-y-auto custom-scroll">

                {[1, 2, 3, 4].map((num) => (
                    <div
                        key={num}
                        className="h-28 flex items-center justify-center bg-(--bg-sidebar) border border-(--border-dark) rounded-xl text-(--text-btn-sidebar)"
                    >
                        Jugador {num}
                    </div>
                ))}

            </div>

        </div>
    );
}