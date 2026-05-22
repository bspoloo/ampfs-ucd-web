"use client"

import ClubsHeader from "@/app/components/clubs/clubs-header"
import ClubsTable from "@/app/components/clubs/clubs-table"
import FormClub from "@/app/components/clubs/form-club"
import TeamPanel from "@/app/components/clubs/team-panel"
import { Club } from "@/app/interfaces/club.interface"
import { PaginationProps } from "@/app/props/page.props"

import { useState } from "react"

export default function ClubsPage() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedClub, setSelectedClub] = useState<Club | null>(null)
    const [refresh, setRefresh] = useState(0)

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

    function handleClosePanel() {
        setSelectedClub(null)
    }

    return (
        <>
            <div className="flex flex-col gap-0">
                <ClubsHeader openForm={() => setIsOpen(true)}/>
                <ClubsTable page={pagination.page} limit={pagination.limit} refresh={refresh} onView={handleOpenPanel}/>

                {
                    selectedClub && (
                        <TeamPanel
                            club={selectedClub}
                            onClose={handleClosePanel}
                        />
                    )
                }

            </div>

            <FormClub isOpen={isOpen} onAccept={handleApprove} onClose={() => setIsOpen(false)}/>
        </>
    )
}