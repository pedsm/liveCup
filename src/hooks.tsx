import axios from 'axios'
import { useEffect, useState } from "react"
import teams from './data/teams.json'
import testMatches from './data/matches.json'

export interface Group {
    letter: string
    teams: Team[]
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

export interface Match {
    id:                number;
    venue:             string;
    location:          string;
    status:            string;
    attendance:        null;
    officials:         any[];
    stage_name:        string;
    home_team_country: string;
    away_team_country: string;
    datetime:          string;
    winner:            null;
    winner_code:       null;
    home_team:         Team;
    away_team:         Team;
    last_checked_at:   string;
    last_changed_at:   string;
}

export interface Team {
    country:   string;
    name:      string;
    goals:     null;
    penalties: null;
}



export function useGroups() {
    const [groups, setGroups] = useState<null | Group[]>(null)

    useEffect(() => {
        console.log('Checking')
        if (typeof window === 'undefined') {
            console.log('skipping')
            return
        }
        console.log('Fetching teams data')
        // TODO: revert 
        setGroups(teams.groups as Group[])
        // axios.get('https://worldcupjson.net/teams')
        //     .then(res => {
        //         setGroups(res.data.groups)
        //     })
        //     .catch(err => console.error(err))
    }, [])

    return groups
}

export function useMatches() {
    const [matches, setMatches] = useState<null | Match[]>(null)

    useEffect(() => {
        console.log('Checking')
        if (typeof window === 'undefined') {
            console.log('skipping')
            return
        }
        console.log('Fetching teams data')
        // TODO: revert 
        setMatches(testMatches as Match[])
        // axios.get('https://worldcupjson.net/matches/today')
        //     .then(res => {
        //         setGroups(res.data.groups)
        //     })
        //     .catch(err => console.error(err))
    }, [])

    return matches
}