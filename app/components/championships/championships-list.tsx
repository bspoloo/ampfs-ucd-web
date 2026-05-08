"use client";

import { Championship } from "@/app/interfaces/championship.interface";
import ChampionshipCard from "./championship-card";
import { useGetData as useData } from "@/app/hooks/use-get-data";
import Loader from "@/app/components/loader";
import { useEffect, useState } from "react";
import Toast from "@/app/components/ui/toast";

export default function ChampionshipsList() {
    const { data, loading, error } = useData<Championship[]>("championship");
    const [load, setLoad] = useState<boolean>(false);
    const [toast, setToast] = useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);
    useEffect(() => {
        setLoad(loading);
    });
    if (loading) {
        return <Loader></Loader>;
    }
    if (error) {
        setLoad(true);
        { toast && <Toast message={toast.message} type={toast.type} /> }
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