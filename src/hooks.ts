import { useQuery } from "@tanstack/react-query"
import { worldCupService } from "services/api"
import { Group, Match } from "services/types"


export function useGroups() {
  return useQuery<Group[]>(["groups"], worldCupService.fetchGroups.bind(worldCupService), {
    refetchInterval: 100
  })
}

export function useTodaysMatches() {
  return useQuery<Match[]>(["todaysMatches"], worldCupService.fetchTodaysMatches.bind(worldCupService), {
    refetchInterval: 100
  })
}
export function useCurrentMatches() {
  return useQuery<Match[]>(["currentMatches"], worldCupService.fetchCurrentMatches.bind(worldCupService), {
    refetchInterval: 100
  })
}
export function useTomorrowsMatches() {
  return useQuery<Match[]>(["tomorrowsMatches"], worldCupService.fetchTomorrowsMatches.bind(worldCupService), {
    refetchInterval: 60000
  })
}

export function useIsGameLive() {
  return useQuery<boolean>(["isGameLive"], worldCupService.isGameLive.bind(worldCupService), {
    refetchInterval: 60000
  })
}
