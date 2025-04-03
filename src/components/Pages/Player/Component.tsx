import { Box, Breadcrumbs, Divider, Typography } from "@mui/material";
import { ChessPlayer } from "../../../TypeModels/Player";

type Props = {
    data: ChessPlayer;
}

const PlayerComponent = ({data} : Props) => {
    return (
        <Box>
            <Breadcrumbs sx={{ display:'flex', alignItems: 'center' }} aria-label="breadcrumb" separator={<Divider orientation="vertical" flexItem sx={{ mx: 1, height: 16 }} />}>
                {data.title && <Typography color="text.secondary">{data.title}</Typography>}
                <Typography color="text.primary" variant="h5">{data.username}</Typography>
                {data.country && <Typography color="text.secondary">{data.country.slice(-2)}</Typography>}
            </Breadcrumbs>
            <Typography color='text.secondary'>{data.is_streamer && 'streamer'}</Typography>
            <Typography color='text.secondary'>{data.league} league</Typography>
            <Typography color='text.secondary'>{data.status} member</Typography>
            <Typography color='text.secondary'>{data.followers} followers</Typography>
            <Typography color='text.secondary'>Joined {new Date(data.joined * 1000).toLocaleString()}</Typography>
            <Typography color='text.secondary'>Last seen {new Date(data.last_online * 1000).toLocaleString()}</Typography>
        </Box>
    );
}

export default PlayerComponent;