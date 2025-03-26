import { Divider } from "@mui/material";
import { Player } from "../TypeModels/Chess"
import legend from '../images/legend.png.webp';
import trophy from '../images/trophy.png';

export const PlayerCard = (player: Player) => {
    return (
        <div className="item">
          <img src={legend} className="league-img"></img>
          <Divider />
          <div className="xp-img"><p>{player.expLevel}</p></div>
          <Divider />
          <div style={{width: '100%'}}>
            <div style={{display:"flex", flexDirection:"row", width: '100%'}}>
              <h4>{player.name}</h4>
              <p className="tag">{player.tag}</p>
            </div>
            <div style={{display:"flex", flexDirection:"row"}}>
              <img width={16} src={player.clan.badgeUrls.small}></img>
              <p className="small-txt"> {player.clan.name}</p>
            </div>
          </div>
          <div style={{width: "200px"}}>
            <p className="small-txt">Wins: {player.attackWins}</p>
            <p className="small-txt">Defended: {player.defenseWins}</p>
          </div>
          <div className="trophies">
            <p>{player.trophies}</p>
            <img src={trophy}></img>
          </div>
        </div>
    )
}