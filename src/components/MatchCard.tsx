import { Box, Card, Tag, Text } from "@chakra-ui/react"
import { countryToFlag } from "flags"
import { Match } from "hooks"
import { DateTime } from "luxon"

export const MatchCard = ({ match, isLive }: { match: Match; isLive?: boolean }) => {
  return (
    <Card p={"1em"}>
      <Box display={"grid"} gap={"1em"} gridTemplateColumns={"1fr 1fr 1fr"}>
        <Box textAlign={"right"}>
          <Text fontSize={"4xl"}>{countryToFlag(match.home_team_country)}</Text>
          <Text fontWeight={"bold"}> {match.home_team.name} </Text>
          <Text fontSize={"2xl"}>{match.home_team.goals ?? 0}</Text>
        </Box>
        <Box height="full" textAlign="center" mt={16}>
          vs
        </Box>
        <Box>
          <Text fontSize={"4xl"}>{countryToFlag(match.away_team_country)}</Text>
          <Text fontWeight={"bold"}> {match.away_team.name} </Text>
          <Text fontSize={"2xl"}>{match.away_team.goals ?? 0}</Text>
        </Box>
      </Box>
      <Text mt={4} color={"gray.600"} textAlign={"center"}>
        {match.venue} <br /> {match.location}
      </Text>
      {isLive ? (
        <Text mx="auto" mt={2} textAlign="center" fontSize="xs">
          🔴 Live
        </Text>
      ) : (
        <Text textAlign="center" fontSize="xs" mt={2}>
          {DateTime.fromISO(match.datetime).toRelative()}
        </Text>
      )}
    </Card>
  )
}
