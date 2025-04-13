import { useEffect, useState } from "react";
import axios from "axios";
import { Box, FormControl, InputLabel, MenuItem, Paper, Select, Tooltip, Typography } from "@mui/material";
import { DailyLeaderboardType, Player } from "../../../TypeModels/Chess";
import { PlayerStatCard } from "../../PlayerStatCard";

type Props = {
  favorites: string[];
  addFavorite: (arg0: string) => void;
  removeFavorite: (arg0: string) => void;
}

const Leaderboard = ({favorites, addFavorite, removeFavorite} : Props) => {
  const [leaderboard, setLeaderboard] = useState<DailyLeaderboardType | null>(null);
  const [boardName, setBoardName] = useState<keyof DailyLeaderboardType>("daily");
  const [selectedBoard, setSelectedBoard] = useState<Player[]>([]);

  useEffect(() => {
    //fetch leaderboard data 
    axios
      .get<DailyLeaderboardType>("https://api.chess.com/pub/leaderboards")
      .then((response) => {
        setLeaderboard(response.data);
        setSelectedBoard(response.data.daily ?? []);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // set board to correct board when the selected board changes
    if (leaderboard) setSelectedBoard(leaderboard[boardName] ?? []);
  }, [boardName, leaderboard]);

  return (
    <Box sx={{ width: "25vw", minWidth: 340, maxHeight: "94vh", overflowY: "scroll", padding: 0.3, scrollbarColor: "aqua rgb(0, 0, 0, 0)", scrollbarWidth: "thin", "&::-webkit-scrollbar": { width: "8px", borderRadius: "8px" }, "&::-webkit-scrollbar-thumb": { backgroundColor: "aqua" }}}>
      <Paper sx={{ display: 'flex', gap: '10px', marginBottom: 2, padding: 2, flexDirection: 'row', alignItems: 'center' }}>
        <Tooltip followCursor={true} title="Chess leaderboard">
          <FormControl sx={{ flex: 1 }} variant="outlined">
            <InputLabel id="leaderboard-label" sx={{ zIndex: 0 }}>
              Leaderboard
            </InputLabel>
            <Select labelId="leaderboard-label" id="leaderboard" value={boardName} label="Leaderboard" onChange={(e) => setBoardName(e.target.value as keyof DailyLeaderboardType)}>
              {leaderboard &&
              // for each key in leaderboards (daily, rapid or other leaderboards) add an option to select it the leaderboards don't have name just an array of players that's why it uses the keys so you know what you are selecting
                (Object.keys(leaderboard) as (keyof DailyLeaderboardType)[]).map((board) => (
                  // replace the underscores with spaces to improve readability
                  <MenuItem sx={{textTransform: "capitalize"}} key={board} value={board}>{board.replace("_", " ")}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </Tooltip>
        <Typography variant="h4">Leaderboard</Typography>
      </Paper>
      <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {selectedBoard.map((player) => (
          // for each player on the leaderboard show a player card
          <PlayerStatCard favorites={favorites} addFavorite={addFavorite} removeFavorite={removeFavorite} key={player.username} player={player} />
        ))}
      </Box>
    </Box>
  );
};

export default Leaderboard;
