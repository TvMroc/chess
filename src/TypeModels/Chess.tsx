export type Player = {
    player_id: number;
    "@id": string;
    url: string;
    username: string;
    score: number;
    rank: number;
    country: string;
    title?: string;
    name?: string;
    status: string;
    avatar: string;
    trend_score: {
      direction: number;
      delta: number;
    };
    trend_rank: {
      direction: number;
      delta: number;
    };
    flair_code: string;
    win_count: number;
    loss_count: number;
    draw_count: number;
  }
  
  export type DailyLeaderboardType = {
    daily: Player[];
    daily960: Player[];
    live_rapid: Player[];
    live_blitz: Player[];
    live_bullet: Player[];
    live_bughouse: Player[];
    live_blitz960: Player[];
    live_threecheck: Player[];
    live_crazyhouse: Player[];
    live_kingofthehill: Player[]
    lessons: Player[];
    tactics: Player[];
  }
  