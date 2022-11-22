import { Skeleton, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { countryToFlag } from "flags"
import React from "react"
import { Group } from "services/types"

export function GroupTable({ group }: { group: Group }) {
  return (
    <Table padding="4" size="sm" h="100%">
      <Thead>
        <Tr>
          <Th>Group {group.letter}</Th>
          <Th isNumeric>P</Th>
          <Th isNumeric>W</Th>
          <Th isNumeric>D</Th>
          <Th isNumeric>L</Th>
          <Th isNumeric>GD</Th>
          <Th isNumeric>PTS</Th>
        </Tr>
      </Thead>
      <Tbody>
        {group.teams.map((team) => (
          <Tr key={team.country}>
            <Td>
              {countryToFlag(team.country)} {team.name}
            </Td>
            <Td isNumeric>{team.games_played}</Td>
            <Td isNumeric>{team.wins}</Td>
            <Td isNumeric>{team.draws}</Td>
            <Td isNumeric>{team.losses}</Td>
            <Td isNumeric>{team.goals_for - team.goals_against}</Td>
            <Td isNumeric>{team.group_points}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export const GroupTableSkeleton = () => {
  return (
    <Table padding="4" size="sm" h="100%">
      <Thead>
        <Tr>
          <Th>Group </Th>
          <Th isNumeric>P</Th>
          <Th isNumeric>W</Th>
          <Th isNumeric>D</Th>
          <Th isNumeric>L</Th>
          <Th isNumeric>GD</Th>
          <Th isNumeric>PTS</Th>
        </Tr>
      </Thead>
      <Tbody>
        {new Array(4).fill(0).map((_t, i) => (
          <Tr key={i}>
            <Td>
              <Skeleton height="10px" />
            </Td>
            <Td>
              <Skeleton height="10px" />
            </Td>
            <Td>
              <Skeleton height="10px" />
            </Td>
            <Td>
              <Skeleton height="10px" />
            </Td>
            <Td>
              <Skeleton height="10px" />
            </Td>
            <Td>
              <Skeleton height="10px" />
            </Td>
            <Td>
              <Skeleton height="10px" />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
