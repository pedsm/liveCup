import { Box, Card, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { matches } from 'lodash'
import { DateTime } from 'luxon'
import type { NextPage } from 'next'
import Head from 'next/head'
import { GroupTable } from '../src/components/groupTable'
import { countryToFlag } from '../src/flags'
import { useGroups, useMatches } from '../src/hooks'

const Home: NextPage = () => {
  const groups = useGroups()
  const todayMatches = useMatches()

  console.log(todayMatches)

  return (
    <div>
      <Head>
        <title>Live cup 2022</title>
        <meta name="description" content="Live cup" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div id='group-grid'>
        {groups &&
          groups.map((group) => (
            <GroupTable key={group.letter} group={group}></GroupTable>
          ))}
        </div>
        <div id='sidebar'>
            {todayMatches && todayMatches.map((match) => (
              <Card my={'2em'} key={match.id} p={'1em'}>
                <Box display={'grid'} gap={'1em'} gridTemplateColumns={'1fr 1fr'}>
                  <Box textAlign={'right'}>
                    <Text fontSize={'4xl'}>
                      {countryToFlag(match.home_team_country)}
                    </Text>
                    <Text fontWeight={'bold'}> {match.home_team.name} </Text>
                    <Text fontSize={'2xl'}>{match.home_team.goals ?? 0}</Text>
                  </Box>
                  <Box>
                    <Text fontSize={'4xl'}>
                      {countryToFlag(match.away_team_country)}
                    </Text>
                    <Text fontWeight={'bold'}> {match.away_team.name} </Text>
                    <Text fontSize={'2xl'}>{match.away_team.goals ?? 0}</Text>
                  </Box>
                </Box>
                <Text color={'gray.600'} textAlign={'center'}>{match.venue} <br/> {match.location}</Text>
                <Text>{DateTime.fromISO(match.datetime).toRelative()}</Text>
              </Card>
            ))}
        </div>
      </main>
    </div>
  )
}

export default Home
