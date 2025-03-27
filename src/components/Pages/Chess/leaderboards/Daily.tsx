import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { Box, Paper, Typography } from "@mui/material";
import { PlayerCard } from "../../../methods/PlayerCard";
import { DailyLeaderboardType } from "../../../../TypeModels/Chess";

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
    
    return (
        <>
          <Paper sx={{marginBottom: 2, padding: 2}}>
            <Typography variant="h4">Daily leaderboard</Typography>
          </Paper >
          <Box sx={{display:'flex', gap: '20px', flexWrap: 'wrap'}}>
            { leaderboard?.daily.map((player) => (
                <PlayerCard player={player} ></PlayerCard>
            ))}
          </Box>
        </>
    );
}

export default DailyLeaderboard;