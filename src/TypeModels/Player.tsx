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
    stats: Stats;
  };

  export type Stats = {
    chess_daily: ChessInfo;
    chess960_daily: ChessInfo;
    chess_rapid: ChessInfo;
    chess_bullet: ChessInfo;
    chess_blitz: ChessInfo;
    tactics: TacticsInfo;
    puzzle_rush: PuzzleRushInfo;
  }
  
  type RatingInfo = {
    rating: number;
    date: number;
    rd?: number;
    game?: string;
  };
  
  type RecordInfo = {
    win: number;
    loss: number;
    draw: number;
    time_per_move?: number;
    timeout_percent?: number;
  };
  
  type ChessInfo = {
    last: RatingInfo;
    best: RatingInfo;
    record: RecordInfo;
  };
  
  type TacticsInfo = {
    highest: {
      rating: number;
      date: number;
    };
    lowest: {
      rating: number;
      date: number;
    };
  };
  
  type PuzzleRushInfo = {
    best: {
      total_attempts: number;
      score: number;
    };
  };
  