import axios from "axios";
import PlayerComponent from "./Component";
import { useEffect, useState } from "react";
import { ChessPlayer, Game, StatRecords, Stats } from "../../../TypeModels/Player";

type Props = {
    username: string;
}

const PlayerContainer = ({username}: Props) => {
    const [playerData, setPlayerData] = useState<ChessPlayer | null>(null);
    const [playerStats, setPlayerStats] = useState<Stats | null>(null);
    const [playerGames, setPlayerGames] = useState<Game[] | null>(null);
    const [loaded, setLoaded] = useState(false);

    const getStatsGame = async () => {
      // use await in an async function to make sure stats and game are set before setting loaded to true to fetch the profile data and set stats and game inside the profile 
      await axios.get<StatRecords>(`https://api.chess.com/pub/player/${username}/stats`)
        .then((response) => {
          const data = response.data;
          let win = 0, draw = 0, loss = 0;
          (Object.keys(data) as Array<keyof typeof data>).forEach((mode) => {
            const record = data[mode]?.record;
            if (record) {
              win += record.win;
              draw += record.draw;
              loss += record.loss;
            }
          });
          setPlayerStats({ win, draw, loss });
        })
        .catch((error) => console.error(error));

      await axios.get<{games: Game[]}>(`https://api.chess.com/pub/player/${username}/games`)
          .then(async (response) => {
              setPlayerGames(response.data.games);
          })
          .catch((error) => console.error(error));
      setLoaded(true);
    }

    useEffect(() => { 
        getStatsGame();
    }, []);

    useEffect(() => {
      if (!loaded) return;
      axios
        .get<ChessPlayer>(`https://api.chess.com/pub/player/${username}`)
        .then(async (response) => {
            var data = response.data;
            if (playerStats) data.stats = playerStats;
            if (playerGames) data.games = playerGames;
            setPlayerData(data);
        })
        .catch((error) => console.error(error));
    }, [loaded]);

    return (<>
        {(playerData && playerData.username) ? <PlayerComponent data={playerData}/> : <>not found</>}
    </>);
}

export default PlayerContainer;