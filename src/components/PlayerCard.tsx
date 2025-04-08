import { Box, Breadcrumbs, Button, Card, CardContent, CardMedia, Divider, Typography } from "@mui/material";
import { Player } from "../TypeModels/Chess"

export const PlayerCard = ({player}: {player: Player}) => {
    return (
        <Card sx={{ minWidth: 300, width: '100%', opacity: 0.8, transition: 'opacity 0.3s', '&:hover': {opacity: 1} }}>
          <CardContent>
            <Box sx={{display:'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between'}} mb={1}>
              <Box sx={{display:'flex', alignItems: 'center', gap: 3}}>
                {/* player name with correct rank colour */}
                <Typography sx={{padding: '2px 4px', backgroundColor: player.rank == 1 ? 'gold' : player.rank == 2 ? 'silver' : player.rank == 3 ? '#CE8946' : '', textShadow: '1px 1px rgba(0, 0, 0, 0.6)', borderRadius: 2, boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.1)'}}>#{player.rank}</Typography>
                <CardMedia component="img" sx={{width: 40, height: 40, borderRadius: 2, }} image={player.avatar}/>
                <Breadcrumbs sx={{ display:'flex', alignItems: 'center', justifySelf: 'center' }} aria-label="breadcrumb" separator={<Divider orientation="vertical" flexItem sx={{ mx: 1, height: 16 }} />}>
                  {player.title && <Typography color="text.secondary">{player.title}</Typography>}<Typography color="text.first">{player.username}</Typography>
                  {player.country && <Typography color="text.secondary">{player.country.slice(-2)}</Typography>}
                </Breadcrumbs>
              </Box>
              <Typography sx={{ color: 'text.secondary', mb: 0.5 }}>{player.score}</Typography>
            </Box>
            <Box sx={{display:'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between'}}>
              <Breadcrumbs sx={{ justifySelf: 'center' }} aria-label="breadcrumb" separator={<Divider orientation="vertical" flexItem sx={{ mx: 1, height: 16 }} />}>
                <Typography color="text.secondary">{player.win_count} Wins</Typography>
                <Typography color="text.secondary">{player.loss_count} Losses</Typography>
                <Typography color="text.secondary">{player.draw_count} Draws</Typography>
              </Breadcrumbs>
              <Button sx={{justifySelf: 'right'}} href={`/#/player/${player.username}`}>Details</Button>
            </Box>
          </CardContent>
        </Card>
    )
}