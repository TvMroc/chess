import { Box, Card, CardContent, CardMedia, Divider, Typography } from "@mui/material";
import { Player } from "../../TypeModels/Chess"

export const PlayerCard = ({player}: {player: Player}) => {
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Box sx={{display:'flex', alignItems: 'center', gap: 1}} mb={1}>
            <Typography sx={{padding: '2px 4px', backgroundColor: player.rank == 1 ? 'gold' : player.rank == 2 ? 'silver' : player.rank == 3 ? '#CE8946' : '', borderRadius: 2, boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.1)'}}>#{player.rank}</Typography>
            <CardMedia
              component="img"
              sx={{width: 48, height: 48, borderRadius: 2, }}
              image={player.avatar}
            />
            <Typography gutterBottom >
              {player.username} {player.country.slice(-2)}
            </Typography><CardMedia
              component="img"
              sx={{width: 4, height: 4, borderRadius: 2, }}
              image={player.country}
            />
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{player.score}</Typography>
          </Box>
          <Box sx={{display:'flex', alignItems: 'center', gap: 1}}>
            <Typography color="text.secondary">{player.win_count} Wins</Typography>
            <Divider orientation="vertical" flexItem />
            <Typography color="text.secondary">{player.loss_count} Losses</Typography>
            <Divider orientation="vertical" flexItem />
            <Typography color="text.secondary">{player.draw_count} Draws</Typography>
          </Box>
        </CardContent>
      </Card>
    )
}