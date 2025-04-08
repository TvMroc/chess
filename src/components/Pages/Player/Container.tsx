import axios from "axios";
import PlayerComponent from "./Component";
import { useEffect, useState } from "react";
import { ChessPlayer, Stats } from "../../../TypeModels/Player";

type Props = {
    username: string;
}

const PlayerContainer = ({username}: Props) => {
    const [playerData, setPlayerData] = useState<ChessPlayer | null>(null);
    const [playerStats, setPlayerStats] = useState<Stats | null>(null);
    
    useEffect(() => { 
        axios.get<Stats>(`https://api.chess.com/pub/player/${username}/stats`)
        .then(async (response) => {
            setPlayerStats(response.data);
        })
        .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
      if (!playerStats) return;  
      axios
        .get<ChessPlayer>(`https://api.chess.com/pub/player/${username}`)
        .then(async (response) => {
            var data = response.data;
            if (playerStats) data.stats = playerStats;
            setPlayerData(data);
        })
        .catch((error) => console.error(error));
    }, [playerStats]);

    return (<>
        {(playerData != null) ? <PlayerComponent data={playerData}/> : <>not found</>}
    </>);
}

export default PlayerContainer;