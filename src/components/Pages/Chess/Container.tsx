import { useEffect, useState } from "react";
import ChessComponent from "./Component";
import axios from "axios";
import { countries } from "../../../Constants";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const ChessContainer = () => {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [search, setSearch] = useState<string>("");
    const [country, setCountry] = useState<string>(countries[0]);

    useEffect(() => {
        // set the favorites from the cookies on load
        const tempFavorites = cookies.get("favorites");
        if (tempFavorites) {
            try {
                setFavorites(tempFavorites);
            }
            catch (error) {
                console.error("Failed to set favorites", error);
            }
        }
    }, []);

    useEffect(() => {
        axios.get<{players: string[]}>(`https://api.chess.com/pub/country/${country}/players`)
            .then(async (response) => {
                setSearchResults(response.data.players);
            })
            .catch((error) => console.error(error));
    }, [country]);

    useEffect(() => {
        cookies.set("favorites", JSON.stringify(favorites), {
        path: "/",
        });
    }, [favorites]);

    // if the favorite isnt already favorited add it to the favorites   
    const addFavorite = (username: string) => setFavorites(() => favorites.includes(username) ? favorites : [...favorites, username]);
    // filter favorites to favorites that aren't equal to the favorite to remove
    const removeFavorite = (username: string) => setFavorites(() => favorites.filter((favorite) => favorite !== username));

    return <ChessComponent favorites={favorites} addFavorite={addFavorite} removeFavorite={removeFavorite} country={country} search={search} searchResults={searchResults} setCountry={setCountry} setSearch={setSearch}/>;
}

export default ChessContainer