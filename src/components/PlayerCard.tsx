import { useEffect, useState } from "react";
import axios from "axios";
import { ChessPlayer } from "../TypeModels/Player";
import { Card, CardContent, Box, Typography, CardMedia, Breadcrumbs, Divider } from "@mui/material";
import DetailFavorite from "./DetailFavorite";

type Props = {
  username: string;
  favorites: string[];
  addFavorite: (arg0: string) => void;
  removeFavorite: (arg0: string) => void;
}

const PlayerCard = ({username, favorites, addFavorite, removeFavorite}: Props) => {
  const [playerdata, setPlayerdata] = useState<ChessPlayer | null>(null);

  useEffect(() => {
    //fetch player data 
    axios
      .get<ChessPlayer>(`https://api.chess.com/pub/player/${username}`)
      .then((response) => {
        setPlayerdata(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    playerdata ? 
    <Card elevation={3} sx={{ minWidth: 300, width: '100%', opacity: 0.8, transition: 'opacity 0.3s', '&:hover': {opacity: 1} }}>
      <CardContent>
        <Box sx={{display:'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between'}} mb={1}>
          <Box sx={{display:'flex', alignItems: 'center', gap: 3}}>
            {/* player name, country and profile picture */}
            <CardMedia component="img" sx={{width: 40, height: 40, borderRadius: 2, }} image={playerdata.avatar}/>
            <Breadcrumbs sx={{ display:'flex', alignItems: 'center', justifySelf: 'center' }} aria-label="breadcrumb" separator={<Divider orientation="vertical" flexItem sx={{ mx: 1, height: 16 }} />}>
              {playerdata.title && <Typography color="text.secondary">{playerdata.title}</Typography>}<Typography color="text.first">{playerdata.username}</Typography>
              {playerdata.country && <Typography color="text.secondary">{playerdata.country.slice(-2)}</Typography>}
            </Breadcrumbs>
          </Box>
          <DetailFavorite name={playerdata.username.toLocaleLowerCase()} favorites={favorites} removeFavorite={removeFavorite} addFavorite={addFavorite}/>
        </Box>
      </CardContent>
    </Card> : <></>
  );
};

export default PlayerCard;
