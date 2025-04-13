import { Box, Button, IconButton } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

type Props = {
    name: string;
    favorites: string[];
    addFavorite: (arg0: string) => void;
    removeFavorite: (arg0: string) => void;
}

const DetailFavorite = ({name, favorites, removeFavorite, addFavorite}: Props) => (
    <Box>
        <Button sx={{justifySelf: 'right'}} href={`/player/${name}`}>Details</Button>
        {favorites?.includes(name) ? (<IconButton onClick={() => removeFavorite(name)}><StarIcon /></IconButton>) : (<IconButton onClick={() => addFavorite(name)}><StarBorderIcon /></IconButton>)}
    </Box>
)

export default DetailFavorite;