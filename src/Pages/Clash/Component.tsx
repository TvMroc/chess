import { Typography } from "@mui/material";
import Layout from "../../Layout";
import { PlayerCard } from "../../methods/PlayerCard";
import { League } from "../../TypeModels/Chess";

type ClashComponentProps = {
    leagueData: League | null;
}

const ClashComponent = ({leagueData} : ClashComponentProps) => {
    return (
    <div className="main">
        <Layout></Layout>
        <div className="container">
            <div className="league-container">
                {leagueData?.players ? <>
                <Typography>Legend league top</Typography>
                <div className="league">
                    {leagueData.players.map((item) => (
                    <PlayerCard {...item}></PlayerCard>
                    ))}
                </div>
                </> : <>No data</>}
            </div>
        </div>
    </div>);
}

export default ClashComponent