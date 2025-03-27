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
  }
  