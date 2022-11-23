export interface Group {
    letter: string;
    teams: Team[];
}

export interface Team {
    country: string;
    name: string;
    group_letter: string;
    group_points: number;
    wins: number;
    draws: number;
    losses: number;
    games_played: number;
    goals_for: number;
    goals_against: number;
    goal_differential: number;
}

export type EventType = 'booking' | 'goal' | 'substitution' 
export interface Event {
    id: number;
    type_of_event: EventType;
    player: string;
    time: string;
    extra_info: string
    country?: string
}

export interface Match {
    id: number;
    venue: string;
    location: string;
    status: string;
    attendance: null;
    officials: any[];
    stage_name: string;
    home_team_country: string;
    home_team_events: Event[];
    away_team_country: string;
    away_team_events: Event[];
    datetime: string;
    winner: null;
    winner_code: null;
    home_team: TeamReport;
    away_team: TeamReport;
    home_team_statistics: Stat;
    away_team_statistics: Stat;
    last_checked_at: string;
    last_changed_at: string;
}

export interface TeamReport {
    country: string;
    name: string;
    goals: null;
    penalties: null;
}

export interface Stat {
    country: string
    attempts_on_goal: number | null;
    on_target: number | null;
    off_target: number | null;
    blocked: number | null;
    corners: number | null;
    offsides: number | null;
    ball_possession: number | null;
    pass_accuracy: number | null;
    num_passes: number | null;
    passes_completed: number | null;
    distance_covered: number | null;
    tackles: number | null;
    clearances: number | null;
    yellow_cards: number | null;
    red_cards: number | null;
    fouls_committed: number | null;
}