import ClubsHeader from "@/app/components/clubs/clubs-header"
import ClubsTable from "@/app/components/clubs/clubs-table"

export default function ClubsPage() {
    return (
        <div className="flex flex-col gap-0">
            <ClubsHeader />
            <ClubsTable />
        </div>
    )
}
