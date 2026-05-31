"use client";

import { Championship } from "@/app/interfaces/championship.interface";
import ChampionshipCard from "./championship-card";
import { useGetData as useData } from "@/app/hooks/use-get-data";
import Loader from "@/app/components/loader";

export default function ChampionshipsList() {
    const { response: data, loading, error } = useData<Championship[]>("championship");

    if (loading) return <Loader />;

    if (error) {
        return (
            <div className="mt-5 text-red-400 text-sm">{error}</div>
        );
    }

    return (
        <div className="mt-6 overflow-x-auto custom-scroll">
            <div className="flex gap-6 w-max pb-2">
                {data?.map((championship) => (
                    <div
                        key={championship.id}
                        className="min-w-75 max-w-75 flex-shrink-0:"
                    >
                        <ChampionshipCard championship={championship} />
                    </div>
                ))}
            </div>
        </div>
    );
}
