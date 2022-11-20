import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { countryToFlag } from "flags"
import { useTodaysMatches } from "hooks"
import type { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"

const MatchStats: NextPage = () => {
  const router = useRouter()
  const matchId = router.query.id

  const { data: matches } = useTodaysMatches()

  const match = matches?.find((match) => match.id.toString() === matchId)

  if (!match) {
    return <Box>Match not found</Box>
  }

  return (
    <Box maxW={"5xl"} mt={8} mx="auto">
      <Table>
        <Thead>
          <Tr>
            <Th textAlign="center" fontSize="xl">
              {countryToFlag(match?.home_team_country)}{" "}
              {match?.home_team_country}
            </Th>
            <Th textAlign="center">Team Stats</Th>
            <Th textAlign="center" fontSize="xl">
              {countryToFlag(match?.away_team_country)}{" "}
              {match?.away_team_country}
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          <Tr>
            <Td textAlign="center">
              {match.home_team_statistics.attempts_on_goal ?? 0}
            </Td>
            <Td textAlign="center">Shots</Td>
            <Td textAlign="center">
              {match.away_team_statistics.attempts_on_goal ?? 0}
            </Td>
          </Tr>

          <Tr>
            <Td textAlign="center">
              {match.home_team_statistics.on_target ?? 0}
            </Td>
            <Td textAlign="center">Shots on target</Td>
            <Td textAlign="center">
              {match.away_team_statistics.on_target ?? 0}
            </Td>
          </Tr>
          <Tr>
            <Td textAlign="center">
              {match.home_team_statistics.ball_possession ?? 0}
            </Td>
            <Td textAlign="center">Possession</Td>
            <Td textAlign="center">
              {match.away_team_statistics.ball_possession ?? 0}
            </Td>
          </Tr>
          <Tr>
            <Td textAlign="center">
              {match.home_team_statistics.pass_accuracy ?? 0}
            </Td>
            <Td textAlign="center">Pass Accuracy</Td>
            <Td textAlign="center">
              {match.away_team_statistics.pass_accuracy ?? 0}
            </Td>
          </Tr>
          <Tr>
            <Td textAlign="center">
              {match.home_team_statistics.fouls_committed ?? 0}
            </Td>
            <Td textAlign="center">Fouls</Td>
            <Td textAlign="center">
              {match.away_team_statistics.fouls_committed ?? 0}
            </Td>
          </Tr>
          <Tr>
            <Td textAlign="center">
              {match.home_team_statistics.yellow_cards ?? 0}
            </Td>
            <Td textAlign="center">Yellow cards</Td>
            <Td textAlign="center">
              {match.away_team_statistics.yellow_cards ?? 0}
            </Td>
          </Tr>
          <Tr>
            <Td textAlign="center">
              {match.home_team_statistics.red_cards ?? 0}
            </Td>
            <Td textAlign="center">Red cards</Td>
            <Td textAlign="center">
              {match.away_team_statistics.red_cards ?? 0}
            </Td>
          </Tr>
          <Tr>
            <Td textAlign="center">
              {match.home_team_statistics.offsides ?? 0}
            </Td>
            <Td textAlign="center">Offsides</Td>
            <Td textAlign="center">
              {match.away_team_statistics.offsides ?? 0}
            </Td>
          </Tr>
          <Tr>
            <Td textAlign="center">
              {match.home_team_statistics.corners ?? 0}
            </Td>
            <Td textAlign="center">Corners</Td>
            <Td textAlign="center">
              {match.away_team_statistics.corners ?? 0}
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Link href={"/"}>
        <Button mt={12}>&#8592; Dashboard</Button>
      </Link>
    </Box>
  )
}

export default MatchStats
