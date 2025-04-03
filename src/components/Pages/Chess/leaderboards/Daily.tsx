import { useEffect, useState } from "react";
import axios from "axios";
import { Box, FormControl, InputLabel, MenuItem, Paper, Select, Tooltip, Typography } from "@mui/material";
import { PlayerCard } from "../../../methods/PlayerCard";
import { DailyLeaderboardType, Player } from "../../../../TypeModels/Chess";

const DailyLeaderboard = () => {
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
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    // set board to correct board when the selected board changes
    if (leaderboard) setSelectedBoard(leaderboard[boardName] ?? []);
  }, [boardName, leaderboard]);

  return (
    <Box sx={{ width: "22.6vw", maxHeight: "70vh", overflowY: "scroll", scrollbarColor: "aqua rgb(0, 0, 0, 0)", scrollbarWidth: "thin", "&::-webkit-scrollbar": { width: "8px", borderRadius: "8px" }, "&::-webkit-scrollbar-thumb": { backgroundColor: "aqua" },}}>
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
                  <MenuItem key={board} value={board}>{board.replace("_", " ")}</MenuItem>
                  // replace the underscores with spaces to improve readability
                ))}
            </Select>
          </FormControl>
        </Tooltip>
        <Typography variant="h4">Leaderboard</Typography>
      </Paper>
      <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {selectedBoard.map((player) => (
          // for each player on the leaderboard show a player card
          <PlayerCard key={player.username} player={player} />
        ))}
      </Box>
    </Box>
  );
};

export default DailyLeaderboard;
