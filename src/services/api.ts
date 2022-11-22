import axios from "axios"
import { DateTime } from "luxon"
import { Group, Match, Team } from "./types"

export const api = axios.create({
  baseURL: "https://worldcupjson.net",
})

interface Cacheable {
  expiresAt: string // TODO use this at some point
}

interface Groups extends Cacheable {
  groups: Group[]
}

interface Matches extends Cacheable {
  matches: Match[]
}

interface CurrentMatch extends Cacheable {
  matches: Match[]
}

type WorldCupState = {
  groups?: Groups
  todayMatches?: Matches
  current?: CurrentMatch
  tomorrowMatches?: Matches
}

export class WorldCupService {
  promiseQueue: Promise<any>[] = []

  state: WorldCupState = {}

  constructor() {
    console.log('Started world cup service')
    if(typeof window == "undefined") {
      return 
    } else {
      console.log('Browser only')
      this.update()
      setInterval(async () => {
        this.update()
      }, 10000)
    }
  }

  private async update() {
    console.log('Updating state')
    const teamsRes = await api.get('/teams')
    this.state.groups = {
      groups: teamsRes.data.groups,
      expiresAt: this.calculateTtl(5)
    }
    const todayRes = await api.get("/matches/today")
    this.state.todayMatches = {
      matches: todayRes.data,
      expiresAt: this.calculateTtl(1000),
    }

    const currentRes = await api.get("/matches/current")
    this.state.current = {
      matches: currentRes.data,
      expiresAt: this.calculateTtl(100),
    }

    const tomorrowsMatches = await api.get("/matches/tomorrow")
    this.state.tomorrowMatches = {
      matches: tomorrowsMatches.data,
      expiresAt: this.calculateTtl(1000),
    }
    console.log('State', this.state)
  }

  async fetchGroups() {
    while (this.state?.groups == null) {
      await sleep(50)
    }
    return this.state.groups.groups
      .map(group => {
        group.teams.sort((a,b) => {
          const pointsDiff = b.group_points - a.group_points
          if(pointsDiff !== 0) {
            return pointsDiff
          }
          return (b.goals_for - b.goals_against) - (a.goals_for - b.goals_against)
        })
        return group
      })
  }

  async fetchTodaysMatches() {
    while (this.state?.todayMatches == null) {
      await sleep(50)
    }
    return this.state.todayMatches?.matches
  }

  async fetchCurrentMatches() {
    while (this.state?.current == null) {
      await sleep(50)
    }
    return this.state.current.matches
  }

  async isGameLive() {
    return (this.state.current?.matches?.length ?? 0) >= 1
  }

  async fetchTomorrowsMatches() {
    while (this.state?.tomorrowMatches == null) {
      await sleep(50)
    }
    return this.state.tomorrowMatches.matches
  }

  private calculateTtl(minutes: number): string {
    return DateTime.now().plus({ minutes }).toISO()
  }

}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}


export const worldCupService = new WorldCupService()
