import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import PlayerLayout from "./layout";

const Player: NextPageWithLayout = () => {
    return <h1>nose que mas deberia hacer aqui ando perdido</h1>;
};

Player.getLayout = function getLayout(page: ReactElement) {
    return (
        <PlayerLayout>
            {page}
        </PlayerLayout>
    );
};

export default Player;