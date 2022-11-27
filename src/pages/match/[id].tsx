import { Box, Button } from "@chakra-ui/react"
import Footer from "components/Footer"
import { MatchCard } from "components/MatchCard"
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
    <Box w={'100%'} maxW={"800px"} p={'1em'} mx="auto">
      <MatchCard match={match} />
      <Link href={"/"}>
        <Button mt={12}>&#8592; Go back</Button>
      </Link>
      <Footer />
    </Box>
  )
}

export default MatchStats
