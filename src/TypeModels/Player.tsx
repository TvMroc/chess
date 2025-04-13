export type ChessPlayer = {
    avatar: string;
    player_id: number;
    "@id": string;
    url: string;
    name: string;
    username: string;
    title?: string;
    followers: number;
    country: string;
    location?: string;
    last_online: number;
    joined: number;
    status: string;
    is_streamer: boolean;
    verified: boolean;
    league: string;
    streaming_platforms: {
      type: string;
      channel_url: string;
    }[];
    stats?: Stats;
    games?: Game[];
  };

  export type Stats = { 
    win: number;
    loss: number;
    draw: number;
  }

export type StatRecords = {
  chess_daily: { record: Stats };
  chess960_daily: { record: Stats };
  chess_rapid: { record: Stats };
  chess_bullet: { record: Stats };
  chess_blitz: { record: Stats };
}
  
export type Game = {
  white: string;
  black: string;
  url: string;
  turn: 'white' | 'black';
  move_by: number;
  draw_offer?: 'white' | 'black';
  last_activity: number;
  start_time: number;
  time_control: string;
  time_class: string;
  rules: string;
  rated?: boolean;
};
  