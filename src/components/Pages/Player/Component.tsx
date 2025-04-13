import { Box, Breadcrumbs, Card, CardContent, Divider, FormControl, InputLabel, MenuItem, Select, Stack, Tooltip, Typography } from "@mui/material";
import { ChessPlayer } from "../../../TypeModels/Player";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VerifiedIcon from '@mui/icons-material/Verified';
import PersonIcon from '@mui/icons-material/Person';
import { formatter } from "../../methods/NumberFormatter";
import { PieChart } from "@mui/x-charts";
import { useState } from "react";

type Props = {
    data: ChessPlayer;
}

const PlayerComponent = ({data} : Props) => {
    const [gameIndex, setGameIndex] = useState<number>(0);
    return (
        <Box>
            <Box display={"flex"} gap={2} mb={4}>
                <img src={data.avatar} style={{width: 80, height: 80, borderRadius: 8 }}></img>
                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} gap={0.2}>
                    <Breadcrumbs sx={{ display:'flex', alignItems: 'center' }} aria-label="breadcrumb" separator={<Divider orientation="vertical" flexItem sx={{ mx: 1, height: 16 }} />}>
                        {data.title && <Typography color="text.secondary">{data.title}</Typography>}
                        <Tooltip followCursor title={data.name}><Typography color="text.primary" variant="h5">{data.username} {data.verified && <VerifiedIcon/>}</Typography></Tooltip>
                        {data.country && <Typography color="text.secondary">{data.country.slice(-2)}</Typography>}
                        <Typography color='text.secondary'>{data.location}</Typography>
                    </Breadcrumbs>
                    <Box sx={{ display:'flex', alignItems: 'center', gap: 0.5}}>
                        <Tooltip followCursor title={`Last seen ${new Date(data.last_online * 1000).toLocaleString()}`}><VisibilityIcon /></Tooltip>
                        <Tooltip followCursor title={`Joined ${new Date(data.joined * 1000).toLocaleString()}`}><PersonIcon /></Tooltip>
                        <Tooltip followCursor title={data.followers + " Followers"}><Typography color='text.secondary'>{formatter.format(data.followers)} Followers</Typography></Tooltip>
                    </Box>
                    <Breadcrumbs sx={{ display:'flex', alignItems: 'center' }} aria-label="breadcrumb" separator={<Divider orientation="vertical" flexItem sx={{ mx: 1, height: 16 }} />}>
                        {data.league && <Typography color='text.secondary'>{data.league} league</Typography>}
                        {data.stats && <Typography color='text.secondary'>{data.status} member</Typography>}
                    </Breadcrumbs>
                </Box>
            </Box>
            <Box sx={{display: 'flex', gap: 2, mb: 2}}>
                <Breadcrumbs sx={{ display:'flex', alignItems: 'center' }} aria-label="breadcrumb" separator={<Divider orientation="vertical" flexItem sx={{ mx: 1, height: 16 }} />}>  
                    {data.streaming_platforms.map((platform) => (
                        <Box component="a"  key={platform.type} href={platform.channel_url} target="_blank" sx={{ display: 'inline-flex', alignItems: 'center', color: 'text.primary', cursor: 'pointer', mt: 1 }}><Typography textTransform={'capitalize'} variant="body2">{platform.type}</Typography><OpenInNewIcon fontSize="small" sx={{ ml: 0.5 }} /></Box>
                    ))}
                </Breadcrumbs>
            </Box>
            {(data.games && data.games?.length > 0) && (<Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>Recent Games</Typography>
                    {/* lets you select what recently played game to see the details of */}
                    <Tooltip followCursor title="Select a recent game to view details">
                        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                            <InputLabel id="game">Game</InputLabel>
                            <Select labelId="game" id="gameIndex" value={gameIndex} label="Game" onChange={(e) => setGameIndex(Number(e.target.value))}>
                                {data.games.map((_game, i) => (<MenuItem key={i} value={i}> Game {i + 1} </MenuItem>))}
                            </Select>
                        </FormControl>
                    </Tooltip>
                    <Stack spacing={1}>
                        <Typography variant="body2"><strong>Gametype:</strong> {data.games[gameIndex].rated ? 'Rated' : 'Unrated'} {data.games[gameIndex].rules}</Typography>
                        <Typography variant="body2"><strong>Timescale:</strong> {data.games[gameIndex].time_class}</Typography>
                        <Typography variant="body2"><strong>Black:</strong> {data.games[gameIndex].black.slice(33)}</Typography>
                        <Typography variant="body2"><strong>White:</strong> {data.games[gameIndex].white.slice(33)}</Typography>
                        <Typography variant="body2"><strong>Next Move:</strong> {data.games[gameIndex].turn} by {new Date(data.games[gameIndex].move_by * 1000).toLocaleString()}</Typography>
                        <Typography variant="body2"><strong>Game started:</strong> {new Date(data.games[gameIndex].start_time * 1000).toLocaleString()}</Typography>
                        <Typography variant="body2"><strong>Last activity:</strong> {new Date(data.games[gameIndex].last_activity * 1000).toLocaleString()}</Typography>
                        <Box component="a" href={data.games[gameIndex].url} target="_blank" sx={{ display: 'inline-flex', alignItems: 'center', color: 'text.primary', cursor: 'pointer', mt: 1}}><Typography variant="body2">Details</Typography><OpenInNewIcon fontSize="small" sx={{ ml: 0.5 }} /></Box>
                    </Stack>
                </CardContent>
            </Card>)}
            <Card>
                <CardContent>
                    <Typography variant="h4">Stats</Typography>
                    {/* Pie chart of all wins draws and losses */}
                    {data.stats && data.stats && <PieChart width={300} height={200}
                        series={[{data: [
                                { id: 0, value: data.stats.win ?? 0, label: 'Wins', color: 'green' },
                                { id: 1, value: data.stats.loss ?? 0, label: 'Losses', color: 'red' },
                                { id: 2, value: data.stats.draw ?? 0, label: 'Draws', color: 'gray' },
                            ]}]}
                        />}
                </CardContent>
            </Card>
        </Box>
    );
}

export default PlayerComponent;