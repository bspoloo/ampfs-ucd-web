import ChampionshipsHeader from "@/app/components/championships/championships-header";
import ChampionshipsList from "@/app/components/championships/championships-list";
import Pagination from "@/app/components/championships/pagination";

export default function ChampionshipsPage() {
    return (
        <div>
            <ChampionshipsHeader />
            <ChampionshipsList />
            <Pagination pages={3}/>
        </div>
    );
}