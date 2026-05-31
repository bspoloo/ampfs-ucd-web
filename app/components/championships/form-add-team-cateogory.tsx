import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Loader from "@/app/components/loader";
import { Loader2, Search, X } from "lucide-react";
import TeamItem from "../teams/team-item";
import { Team } from "@/app/interfaces/team.interface";
import { Query } from "@/app/interfaces/query.interface";
import Pagination from "./pagination";
import { useGetData } from "@/app/hooks/use-get-data";
import { ResponseServer } from "@/app/interfaces/response-server.interface";
import { SelectedManger } from "@/app/classes/selected-manager";
import { useToast } from "@/app/context/toast-context";
import ProgresBar from "../ui/progress-bar";
import { postData } from "@/app/functions/post-data";
import { useSession } from "next-auth/react";

type Category = { id: string; name?: string };

type FormAddTeamCategoryProps = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    category: Category;
    refetch: () => Promise<void>
}

interface ProgressBarInterface {
    min: number,
    max: number,
    current: number,
}

export default function FormAddTeamCategory({ isOpen, setIsOpen, category, refetch }: FormAddTeamCategoryProps) {
    const { showToast } = useToast();
    const { data: session, status } = useSession();
    const [message, setMessage] = useState<string>('');
    const [progressBar, setProgressBar] = useState<ProgressBarInterface>({
        min: 0,
        max: 100,
        current: 0
    });
    const [onSending, setOnSending] = useState<boolean>(false);
    const [query, setQuery] = useState<Query>({
        page: 1,
        limit: 1,
        sortBy: "name",
        search: ""
    });

    const handleForm = async (): Promise<void> => {
        let counter = 0;
        const dataDict = SelectedManger.getInstance().getDataDict();
        if (dataDict.size === 0) {
            showToast("No hay equipos seleccionados", "error")
            return;
        };
        setOnSending(true);
        try {
            for (const key of dataDict.keys()) {
                const response = await postData<{ team_id: string, category_id: string }, Team>(
                    {
                        endpoint: "teams/category",
                        accessToken: session?.accessToken!
                    },
                    {
                        team_id: key,
                        category_id: category.id
                    }
                );
                await new Promise(resolve => setTimeout(resolve, 3000));
                counter += 1;
                setProgressBar((prev) => ({ ...prev, current: Math.round((counter / dataDict.size) * prev.max) }));
                setMessage(`Registrando ${counter} de ${dataDict.size} equipos...`);
                showToast(`Club "${response.name}" registrado correctamente`, "success");
            }
        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Error al guardar club";
            showToast(message, "error");
        } finally {
            SelectedManger.getInstance().clearData();
            setProgressBar((prev) => ({ ...prev, current: 0 }));
            setOnSending(false);
            setIsOpen(false);
        }
        refetch()
    }

    const { response, loading, error } = useGetData<ResponseServer<Team[]>>(`teams/without/category?page=${query.page}&limit=${query.limit}&sortBy=${query.sortBy}&search=${query.search}`);
    const onClose = (): void => {
        setIsOpen(false);
        setOnSending(false);
        SelectedManger.getInstance().clearData();
    }

    useEffect(() => {
        if (isOpen) {
            setQuery({
                page: 1,
                limit: 4,
                sortBy: "name",
                search: ""
            });
        }
    }, [isOpen]);

    useEffect(() => {
        if (error) {
            showToast(error, "error");
        }
    }, [error]);

    if (!isOpen) return null;
    // if (loading) return <Loader />;
    if (onSending) return <ProgresBar
        isOpen={onSending}
        setIsOpen={setOnSending}
        min={progressBar.min}
        max={progressBar.max}
        current={progressBar.current}
        message={message}></ProgresBar>

    return <>
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <form
                // onSubmit={handleForm}
                className="relative bg-(--bg-sidebar) border border-(--border-dark) rounded-2xl shadow-2xl z-10 overflow-hidden w-[90%] max-w-[400px]"
            >
                <div className="flex items-center justify-between border-b border-(--border-dark) px-6 py-5">
                    <div>
                        <h2 className="text-xl font-semibold text-white">
                            Añadir Equipo a la categoria {category?.name || 'CATEGORY'}
                        </h2>
                        <p className="text-sm text-white/50">Selecciona los equipos a añadir</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-2 border border-(--border-dark)">
                    <div className="flex items-center flex-[2]  bg-(--bg-sidebar) border border-(--border-dark) rounded-xl px-4 py-2 ml-[10px] mr-[10px]">
                        <Search className="w-4 h-4 text-(--text-btn-sidebar) mr-2" />
                        <input
                            type="text"
                            value={query.search}
                            placeholder="Buscar por nombre..."
                            onChange={(e) => setQuery({ ...query, search: e.target.value, page: 1 })}
                            className="bg-transparent outline-none text-(--text-sidebar) placeholder:text-(--text-btn-sidebar) w-full"
                        />
                    </div>
                </div>
                <div className="flex flex-col items-stretch border-b border-(--border-dark) px-3 py-5 gap-3 custom-scrollbar w-full max-h-80 overflow-y-auto">
                    {loading ?
                        <div className="flex flex-col w-full justify-center items-center text-(--text-btn-sidebar)">
                            <Loader2 className="w-[50px] h-[50px] animate-spin" ></Loader2>
                            <p className="">cargando equipos...</p>
                        </div>
                        :
                        response?.data.length != 0 ?
                            response?.data.map((team, index) => (
                                <div key={team.id}>
                                    <TeamItem team={team} />
                                </div>
                            )) : <p>No existen equipos</p>
                    }

                </div>

                <div className="flex items-center justify-center h-full py-[10px]">
                    <Pagination pages={response?.pages || 0} query={query} setQuery={setQuery}></Pagination>
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
                        onClick={handleForm}
                        disabled={loading}
                        type="button"
                        className="flex justify-center items-center px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition cursor-pointer disabled:opacity-60"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Añadir'}
                    </button>
                </div>
            </form>
        </div>
    </>
}