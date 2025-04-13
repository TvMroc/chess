import { Box, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Tooltip, Typography } from "@mui/material";
import Leaderboard from "./Leaderboard";
import PlayerCard from "../../PlayerCard"; 
import { countries } from "../../../Constants";
import DetailFavorite from "../../DetailFavorite";

type Props = {
    favorites: string[];
    country: string;
    search: string;
    searchResults: string[];
    addFavorite: (arg0: string) => void;
    removeFavorite: (arg0: string) => void;
    setSearch: (arg0: string) => void;
    setCountry: (arg0: string) => void;
}

const ChessComponent = ({favorites, country, search, searchResults, addFavorite, removeFavorite, setSearch, setCountry}: Props) => (
    <Box sx={{ display: "flex", gap: 6, flexWrap: 'wrap' }}>
      <Leaderboard favorites={favorites} addFavorite={addFavorite} removeFavorite={removeFavorite}/>
      <Box sx={{ width: "40.1vw", minWidth: 300, maxHeight: "94vh", overflowY: "auto", padding: 0.3, scrollbarColor: "aqua rgb(0, 0, 0, 0)", scrollbarWidth: "thin", "&::-webkit-scrollbar": { width: "8px", borderRadius: "8px" }, "&::-webkit-scrollbar-thumb": { backgroundColor: "aqua" }}}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Paper sx={{display: 'flex', padding: 1, alignItems: 'center', gap: 1}}>
                {/* select country and search query */}
                <Typography padding={1} variant="h4">Search players</Typography> 
                <TextField label='Search' sx={{width: '53%'}} onChange={(e) => setSearch(e.target.value)} value={search} />
                <Tooltip followCursor={true} title="Country">
                    <FormControl sx={{ flex: 1 }} variant="outlined">
                        <InputLabel id="leaderboard-label" sx={{ zIndex: 0 }}>
                        Country
                        </InputLabel>
                        <Select labelId="leaderboard-label" id="leaderboard" value={country} label="Leaderboard" onChange={(e) => setCountry(e.target.value)}>
                            {countries.map((country) => (<MenuItem value={country}>{country}</MenuItem>))}
                        </Select>
                    </FormControl>
                </Tooltip>
            </Paper>
            <Box sx={{display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'space-between'}}>
                {/* for each search result filtered on the search query because you cant search in the api only the first 200 of the results aswel to prevent lag (10000 results) show the username. 
                due to 10000 result cap some players don't show up you can't give any parameters to limit, filter or start at an index in the url*/}
                {(searchResults.length > 0) && searchResults.filter((result) => result.toLocaleLowerCase().includes(search.toLocaleLowerCase())).slice(0, 200).map((result) => (
                    <Paper sx={{width: '49.46%', display: 'flex', flexDirection:'row', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px'}}>
                        <Typography>{result}</Typography>
                        <DetailFavorite name={result} favorites={favorites} removeFavorite={removeFavorite} addFavorite={addFavorite}/>
                    </Paper>
                ))}
            </Box>
        </Box>
      </Box>
      <Box sx={{ width: "25vw", minWidth: 300, maxHeight: "94vh", overflowY: "auto", padding: 0.3, scrollbarColor: "aqua rgb(0, 0, 0, 0)", scrollbarWidth: "thin", "&::-webkit-scrollbar": { width: "8px", borderRadius: "8px" }, "&::-webkit-scrollbar-thumb": { backgroundColor: "aqua" }}}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Paper><Typography padding={2} variant="h4">Favorites</Typography></Paper>
            {/* for each favorite show a playercard */}
            {favorites.length > 0 && favorites.map((favorite) => (<PlayerCard favorites={favorites} addFavorite={addFavorite} removeFavorite={removeFavorite} key={favorite} username={favorite.toLocaleLowerCase()} />))}
        </Box>
      </Box>
    </Box>
)

export default ChessComponent;
