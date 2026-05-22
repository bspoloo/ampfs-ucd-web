"use client"

import ClubsHeader from "@/app/components/clubs/clubs-header"
import ClubsTable from "@/app/components/clubs/clubs-table"
import FormClub from "@/app/components/clubs/form-club"
import { useMessage } from "@/app/context/message-context";
import { useToast } from "@/app/context/toast-context";
import { Club } from "@/app/interfaces/club.interface";
import { useState } from "react";

export default function ClubsPage() {
    const { showToast } = useToast();
        const { showMessage } = useMessage();
        const [isOpen, setIsOpen] = useState<boolean>(false)
    
        const [selected, setSelected] = useState<Club | null>(null);
    
        async function handleApprove(id: string) {
            setSelected(null);
            try {
                // await updatePermitStatus(id, "aprobado");
                showToast("Solicitud aprobada correctamente.", "success");
    
                showMessage("El equipo podría jugar doble partido en fechas posteriores.", "info")
            } catch {
                showToast("Error al aprobar la solicitud. Intenta de nuevo.", "error");
            }
        }
    
        async function handleReject(id: string) {
            setSelected(null);
            try {
                // await updatePermitStatus(id, "rechazado");
                showToast("Solicitud rechazada.", "success");
            } catch {
                showToast("Error al rechazar la solicitud. Intenta de nuevo.", "error");
            }
        }
    return <>
        <div className="flex flex-col gap-0">
            <ClubsHeader openForm={() => setIsOpen(true)}/>
            <ClubsTable />
        </div>
        <FormClub
            isOpen={isOpen}
            onAccept={handleApprove}
            onReject={handleReject}
            onClose={() => setIsOpen(false)}
        >
        </FormClub>
    </>
}
