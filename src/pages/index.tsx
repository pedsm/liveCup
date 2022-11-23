import { Box, Grid, Text } from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "next/head"
import { GroupTable, GroupTableSkeleton } from "components/GroupTable"
import {
  useCurrentMatches,
  useGroups,
  useIsGameLive,
  useTodaysMatches,
  useTomorrowsMatches,
} from "hooks"
import { MatchCard } from "components/MatchCard"
import Link from "next/link"
import { getFood } from "food"
import Footer from "components/Footer"

const Home: NextPage = () => {
  const { data: groups, isLoading: groupsIsLoading } = useGroups()
  const { data: todayMatches } = useTodaysMatches()
  const { data: currentMatches } = useCurrentMatches()
  const { data: tomorrowsMatches } = useTomorrowsMatches()

  return (
    <div>
      <Head>
        <title>Live cup 2022</title>
        <meta name="description" content="Live cup" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Grid className="tables" gap={8} gridTemplateColumns="1fr 1fr">
          {groupsIsLoading ? (
            <>
              {new Array(8).fill(0).map((_t, i) => (
                <GroupTableSkeleton key={i} />
              ))}
            </>
          ) : (
            <>
              {groups?.map((group) => (
                <GroupTable key={group.letter} group={group} />
              ))}
            </>
          )}
        </Grid>
        <Grid
          className="current"
          templateColumns={"1fr"}
          flexDir={"column"}
          gap={2}
        >
          {currentMatches != null && currentMatches?.length != 0 ? (
            currentMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))
          ) : (
            <Box my="auto">
              <Text textAlign={"center"} fontSize={"8xl"}>
                {getFood()}
              </Text>
              <Text textAlign={"center"}>No game is currently live</Text>
            </Box>
          )}
        </Grid>
        <Box className="upcoming" position="relative">
          <Grid gridAutoFlow={"column"} gap={"1em"}>
            {todayMatches &&
              todayMatches.map((match) => (
                <Link
                  style={{ width: "fit-content" }}
                  key={match.id}
                  href={`/match/${match.id}`}
                >
                  <MatchCard match={match} mini />
                </Link>
              ))}
            {tomorrowsMatches &&
              tomorrowsMatches.map((match) => (
                <MatchCard key={match.id} match={match} mini />
              ))}
          </Grid>
          <Footer />
        </Box>
      </main>
    </div>
  )
}

export default Home
