import { Group } from "../hooks"
import { Box, Card, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { countryToFlag } from "../flags"

export function GroupTable({ group }: { group: Group }) {
    return (
        <Card p={'0.5em'} variant={'outline'}>
            <Table size={'sm'} h={'100%'}>
                <Thead>
                    <Tr>
                        <Th>Group {group.letter}</Th>
                        <Th>P</Th>
                        <Th>W</Th>
                        <Th>D</Th>
                        <Th>L</Th>
                        <Th>GD</Th>
                        <Th>PTS</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {group.teams.map((team) => (
                        <Tr key={team.country}>
                            <Td>{countryToFlag(team.country)} {team.name}</Td>
                            <Td isNumeric>{team.games_played}</Td>
                            <Td isNumeric>{team.wins}</Td>
                            <Td isNumeric>{team.draws}</Td>
                            <Td isNumeric>{team.losses}</Td>
                            <Td isNumeric>{team.goal_differential}</Td>
                            <Td isNumeric>{team.group_points}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Card>
    )
}
