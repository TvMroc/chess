import axios from "axios";
import PlayerComponent from "./Component";
import { SetStateAction, useEffect, useState } from "react";
import { ChessPlayer } from "../../../TypeModels/Player";

type Props = {
    username: string;
}

const PlayerContainer = ({username}: Props) => {
    const [playerData, setPlayerData] = useState<ChessPlayer>();

    useEffect(() => {
        axios
            .get<ChessPlayer>(`https://api.chess.com/pub/player/${username}`)
            .then((response: { data: SetStateAction<ChessPlayer | undefined>; }) => {
                setPlayerData(response.data);
            }).catch((err: any) => {
                console.error(err);
            });
    }, []);
    return (<>
        {playerData ? <PlayerComponent data={playerData}/> : <>not found</>}
    </>);
}

export default PlayerContainer;