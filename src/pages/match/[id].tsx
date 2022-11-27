import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import Footer from "components/Footer"
import { MatchCard } from "components/MatchCard"
import { PlayByPlay } from "components/PlayByPlay"
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
      <MatchCard match={match} />
      <Link href={"/"}>
        <Button mt={12}>&#8592; Go back</Button>
      </Link>
      <Footer />
    </Box>
  )
}

export default MatchStats
