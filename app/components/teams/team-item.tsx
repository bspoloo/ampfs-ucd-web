import { SelectedManger } from "@/app/classes/selected-manager";
import { Team } from "@/app/interfaces/team.interface";
import { useState } from "react"

type TeamItemProps = {
    team: Team,
}

export default function TeamItem({ team }: TeamItemProps) {
    const [selected, setSelected] = useState<boolean>(() => !!SelectedManger.getInstance<Team>().isExist(team.id!));

    const selectItem = (id: string) => {
        const manager = SelectedManger.getInstance<Team>();

        if (!manager.isExist(id)) {
            manager.addItem(id, team);
            setSelected(true);
        } else {
            manager.removeItem(id);
            setSelected(false);
        }
    };
    return <>
        <div
            onClick={() => selectItem(team.id!)}
            className={`flex justify-center items-center bg-(--bg-sidebar) border ${selected
                    ? 'border-(--btn-activo-sidebar)'
                    : 'border-(--border-dark)'
                } rounded-2xl p-3 gap-4 hover:border-(--btn-activo-sidebar) transition cursor-pointer`}>
            <div className={`flex justify-center items-center rounded-full bg-[${team.uniformColor}] w-10 h-10`}>
                {team.name[0]}
            </div>
            <p>{team.name}</p>
        </div>
    </>
}

