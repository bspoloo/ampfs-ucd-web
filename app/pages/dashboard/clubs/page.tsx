"use client"

import ClubsHeader from "@/app/components/clubs/clubs-header"
import ClubsTable from "@/app/components/clubs/clubs-table"
import FormClub from "@/app/components/clubs/form-club"
import TeamPanel from "@/app/components/clubs/team-panel"
import { useToast } from "@/app/context/toast-context"
import { deleteData } from "@/app/functions/delete-data"
import { Club } from "@/app/interfaces/club.interface"
import { File } from "@/app/interfaces/file.interface"
import { PaginationProps } from "@/app/props/page.props"
import { useSession } from "next-auth/react"

import { useState } from "react"

export default function ClubsPage() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedClub, setSelectedClub] = useState<Club | null>(null)
    const [club, setClub] = useState<Club | null>(null)
    const [refresh, setRefresh] = useState(0)
    const { showToast } = useToast();
    const { data: session, status } = useSession()

    const [pagination, setPagination] =
        useState<PaginationProps>({
            page: 1,
            limit: 10
        })

    function handleApprove() {
        setRefresh(prev => prev + 1)
    }

    function handleOpenPanel(club: Club) {
        setSelectedClub(club)
    }

    function handleOpenEdit(club: Club) {
        setIsOpen(true)
        setClub(club)
    }

    function handleClosePanel() {
        setSelectedClub(null)
        setIsOpen(false)
    }

    async function handleCloseForm(state: "update" | "insert", club?: Club) {
        if (state === "update") {
            setClub(null);
            setIsOpen(false);
            return;
        }
        const fileId = club?.file?.id;
        if (!fileId) {
            setClub(null);
            setIsOpen(false);
            return;
        }

        try {
            await deleteData<File>({
                endpoint: `file/${fileId}`,
                accessToken: session?.accessToken
            });
        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Error al borrar archivo";

            showToast(message, "error");
        } finally {
            showToast("Formulario cancelado", "warning");
            setClub(null);
            setIsOpen(false);
        }
    }

    return (
        <>
            <div className="flex flex-col gap-0">
                <ClubsHeader openForm={() => setIsOpen(true)} />
                <ClubsTable page={pagination.page} limit={pagination.limit} refresh={refresh} onView={handleOpenPanel} onEdit={handleOpenEdit} />

                {
                    selectedClub && (
                        <TeamPanel
                            club={selectedClub}
                            onClose={handleClosePanel}
                        />
                    )
                }
            </div>

            <FormClub
                isOpen={isOpen}
                data={club}
                setSelectedData={setClub}
                onAccept={handleApprove}
                onClose={handleCloseForm}
            />
        </>
    )
}