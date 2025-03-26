import { SetStateAction, useEffect, useState } from "react";
import { DailyLeaderboardType } from "../../../TypeModels/Chess";
import axios from "axios";

const DailyLeaderboard = () => {
    const [leaderboard, setLeaderboard] = useState<DailyLeaderboardType | null>(null);
  
    useEffect(() => {
      axios
        .get<DailyLeaderboardType>("https://api.chess.com/pub/leaderboards")
        .then((response: { data: SetStateAction<DailyLeaderboardType | null>; }) => {
          setLeaderboard(response.data);
        })
        .catch((err: any) => {
          console.error(err);
        });
    }, []);
    return (<>
    
    </>);
}