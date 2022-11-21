import { Flex, Grid } from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "next/head"
import { GroupTable, GroupTableSkeleton } from "components/GroupTable"
import { useCurrentMatches, useGroups, useTodaysMatches, useTomorrowsMatches } from "hooks"
import { MatchCard } from "components/MatchCard"
import Link from "next/link"

const Home: NextPage = () => {
  const { data: groups, isLoading: groupsIsLoading } = useGroups()
  const { data: todayMatches } = useTodaysMatches()
  const { data: currentMatches } = useCurrentMatches()
  const { data: tomorrowsMatches } = useTomorrowsMatches()



  console.log(groups)

  return (
    <div>
      <Head>
        <title>Live cup 2022</title>
        <meta name="description" content="Live cup" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Grid p={8} gap={8} gridTemplateColumns="4fr 1fr">
          <Grid gap={8} gridTemplateColumns="1fr 1fr" maxH="100vh">
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
          <Flex flexDir={"column"} gap={8}>
            {currentMatches &&
              currentMatches.map((match) => (
                <MatchCard key={match.id} isLive match={match} />
              ))}
            {todayMatches &&
              todayMatches
                .filter(
                  (match) =>
                    !currentMatches?.find(
                      (curMatch) => curMatch.id === match.id
                    )
                )
                .map((match) => (
                  <Link key={match.id} href={`/match/${match.id}`}>
                    <MatchCard match={match} />
                  </Link>
                ))}
            {tomorrowsMatches &&
              tomorrowsMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
          </Flex>
        </Grid>
      </main>
    </div>
  )
}

export default Home
