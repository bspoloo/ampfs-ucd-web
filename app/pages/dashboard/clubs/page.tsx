"use client"

import ClubsHeader from "@/app/components/clubs/clubs-header"
import ClubsTable from "@/app/components/clubs/clubs-table"
import FormClub from "@/app/components/clubs/form-club"
import { useMessage } from "@/app/context/message-context";
import { useToast } from "@/app/context/toast-context";
import { Club } from "@/app/interfaces/club.interface";
import { PaginationProps } from "@/app/props/page.props";
import { useState } from "react";

export default function ClubsPage() {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isGettingClubs, setisGettingClubs] = useState<boolean>(false)
    const [selected, setSelected] = useState<Club | null>(null);
    const [refresh, setRefresh] = useState(0);
    const [pagination, setPagination] = useState<PaginationProps>({
        page: 1,
        limit: 10
    });

    function handleApprove() {
        console.log("trayendo devuelta daots");
        setRefresh(prev => prev + 1);
    }

    return <>
        <div className="flex flex-col gap-0">
            <ClubsHeader openForm={() => setIsOpen(true)} />
            <ClubsTable page={pagination.page} limit={pagination.limit} refresh={refresh}/>
        </div>
        <FormClub
            isOpen={isOpen}
            onAccept={handleApprove}
            onClose={() => setIsOpen(false)}
        >
        </FormClub>
    </>
}
