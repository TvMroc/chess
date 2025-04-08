import { Box, Breadcrumbs, Divider, Tooltip, Typography } from "@mui/material";
import { ChessPlayer } from "../../../TypeModels/Player";
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import VisibilityIcon from '@mui/icons-material/Visibility';;
import PersonIcon from '@mui/icons-material/Person';
import { formatter } from "../../methods/NumberFormatter";
import { PieChart } from "@mui/x-charts";

type Props = {
    data: ChessPlayer;
}

const PlayerComponent = ({data} : Props) => {
    console.log(data);
    return (
        <Box>
            <Box display={"flex"} gap={2}>
                <img src={data.avatar} style={{width: 80, height: 80, borderRadius: 8 }}></img>
                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} gap={0.2}>
                    <Breadcrumbs sx={{ display:'flex', alignItems: 'center' }} aria-label="breadcrumb" separator={<Divider orientation="vertical" flexItem sx={{ mx: 1, height: 16 }} />}>
                        {data.title && <Typography color="text.secondary">{data.title}</Typography>}
                        <Tooltip title={data.name}><Typography color="text.primary" variant="h5">{data.username}</Typography></Tooltip>
                        {data.country && <Typography color="text.secondary">{data.country.slice(-2)}</Typography>}
                        <Typography color='text.secondary'>{data.location}</Typography>
                    </Breadcrumbs>
                    <Box sx={{ display:'flex', alignItems: 'center', gap: 0.5}}>
                        <Tooltip title={`Last seen ${new Date(data.last_online * 1000).toLocaleString()}`}><VisibilityIcon /></Tooltip>
                        <Tooltip title={`Joined ${new Date(data.joined * 1000).toLocaleString()}`}><PersonIcon /></Tooltip>
                        <Typography color='text.secondary'>{formatter.format(data.followers)} followers</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{display: 'flex', gap: 2   }}>
                <Typography color='text.secondary'>{data.is_streamer && 'Streamer'} </Typography>
                <Breadcrumbs sx={{ display:'flex', alignItems: 'center' }} aria-label="breadcrumb" separator={<Divider orientation="vertical" flexItem sx={{ mx: 1, height: 16 }} />}>  
                    {data.streaming_platforms.map((platform) => (<Box onClick={() => window.open(platform.channel_url, '_blank')} sx={{display: 'flex', }}>
                        <Typography textTransform={'capitalize'} key={platform.type} color='text.primary' >{platform.type}</Typography><OpenInNewIcon/></Box>
                    ))}
                </Breadcrumbs>
            </Box>
            <Typography color='text.secondary'>{data.league} league</Typography>
            <Typography color='text.secondary'>{data.status} member</Typography>
            {data.stats && <PieChart width={300} height={200}
                series={[{data: [
                        { id: 0, value: data.stats.chess_blitz.record.win ?? 0, label: 'Wins', color: 'green' },
                        { id: 1, value: data.stats.chess_blitz.record.loss ?? 0, label: 'Losses', color: 'red' },
                        { id: 2, value: data.stats.chess_blitz.record.draw ?? 0, label: 'Draws', color: 'gray' },
                    ]}]}
                />}
        </Box>
    );
}

export default PlayerComponent;