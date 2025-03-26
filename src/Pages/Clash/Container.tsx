import { useEffect, useState } from "react";
import axios from "axios";
import { League } from "../../TypeModels/Chess";
import ClashComponent from "./Component";
  
const ClashContainer = async () => { 
    const getLeagueData = async () => {
        try {
            const res = await axios.get("http://localhost:5000/v1/leagues/29000022/seasons/2025-02?limit=100");
            const { data } = res.data;
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    return <ClashComponent leagueData={getLeagueData}/>
}

export default ClashContainer;
  