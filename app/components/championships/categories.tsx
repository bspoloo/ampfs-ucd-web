"use client";

import { Plus, ArrowRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useCategories }
    from "@/app/hooks/catogories/use-categories";
export default function Categories() {

    const { categories, loading, error } = useCategories();
    const [search, setSearch] = useState("");
    const [active, setActive] = useState<string | null>(null);
    const activeCategory = categories.find( category => category.id === active );
    const filteredTeams = useMemo(() => {
        
        if (!activeCategory) {
            return [];
        }
        
        return activeCategory.teams.filter(
            team => team.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [activeCategory, search]);

    if (loading) {
        return (
            <div className="p-6 text-white">
                Cargando categorías...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-6 m-6">
            <div className="lg:w-64 bg-(--bg-sidebar) border border-(--border-dark) rounded-xl p-4 lg:h-[calc(100vh-305px)] overflow-y-auto custom-scroll">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-(--text-sidebar) font-semibold">
                        Categorías
                    </h3>

                    <button className="bg-(--btn-activo-sidebar) p-1 rounded">
                        <Plus className="w-4 h-4 text-white"/>
                    </button>
                </div>

                <ul className="flex flex-col gap-2">
                    {categories.map(category => (
                        <li key={category.id}>
                            <button onClick={() => setActive(category.id)}
                                className={`
                                    w-full
                                    text-left
                                    px-3
                                    py-2
                                    rounded
                                    text-sm
                                    transition
                                    ${
                                        active === category.id
                                            ? "bg-(--btn-activo-sidebar) text-white"
                                            : "hover:bg-(--hover-btn-sidebar) text-(--text-btn-sidebar)"
                                    }
                                `}
                            >
                                {category.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex-1 bg-(--bg-sidebar) border border-(--border-dark) rounded-xl p-4 lg:h-[calc(100vh-305px)] flex flex-col">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                    <div className="flex items-center gap-2 bg-(--bg-main) border border-(--border-dark) px-3 py-2 rounded w-full sm:w-72">
                        <Search className="w-4 h-4 text-(--text-btn-sidebar)"/>

                        <input value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }

                            placeholder="Buscar equipo..."

                            className="bg-transparent outline-none text-sm w-full text-(--text-sidebar)"
                        />
                    </div>

                    <div className="px-4 py-1 border border-(--border-dark) rounded text-sm text-(--text-btn-sidebar)">
                        { filteredTeams.length } equipos
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scroll rounded-lg border border-(--border-dark)">
                    <table className="w-full text-sm">
                        <thead className="bg-(--bg-main) sticky top-0 z-10">
                            <tr className="text-(--text-btn-sidebar)">
                                <th className="p-3 text-left">N°</th>
                                <th className="p-3 text-left">Nombre de equipo</th>
                                <th className="p-3 text-left">Descripción</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTeams.map(
                                (team, index) => (
                                <tr
                                    key={team.id}
                                    className="border-t border-(--border-dark) hover:bg-(--hover-btn-sidebar) transition">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{team.name}</td>
                                    <td className="p-3">{team.description}</td>
                                    <td className="p-3 text-right">
                                        <button className="bg-(--btn-activo-sidebar) p-2 rounded-full">
                                            <ArrowRight className="w-4 h-4 text-white"/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="lg:w-56 flex flex-col gap-4 lg:h-[calc(100vh-305px)] overflow-y-auto custom-scroll">
                {[1, 2, 3, 4].map((num) => (
                    <div
                        key={num}
                        className="h-28 flex items-center justify-center bg-(--bg-sidebar) border border-(--border-dark) rounded-xl text-(--text-btn-sidebar)">
                        Jugador {num}
                    </div>
                ))}
            </div>
        </div>
    );
}