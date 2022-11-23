import { Badge, Box, Grid, Text } from '@chakra-ui/react'
import { EventType, Match } from "services/types"

export function PlayByPlay({ match }: { match: Match }) {
    const events = [
        ...match.home_team_events.map(event => ({...event, country:match.home_team_country})), 
        ...match.away_team_events.map(event => ({...event, country:match.away_team_country}))
    ]
    events.sort((a,b) => b.id - a.id)

    return (
        <Grid maxHeight={'40vh'} gridTemplateColumns={'1fr 1em 1fr'} overflowY={'scroll'}>
            {events.map((event, i) => (
                <>
                    {event.country === match.home_team_country && <><Text key={`time_${event.id}`} textAlign={'right'}>{event.time}</Text><Dot key={`dot_${event.id}`} finalDot={i === 0}/></>}
                    <Box key={event.id} textAlign={event.country === match.home_team_country ? 'left' : 'right'}>
                        <Badge colorScheme={eventToColour(event.type_of_event)}>
                            {mapEventType(event.type_of_event)}
                        </Badge>
                        <Text>{event.player}</Text>
                    </Box>
                    {event.country !== match.home_team_country && <><Dot key={`dot_${event.id}`} finalDot={ i === 0 }/><Text key={`time_${event.id}`}>{event.time}</Text></>}
                </>
            ))}
        </Grid>
    )
}

function Dot({ finalDot }: { finalDot: boolean } = { finalDot: false }) {
    return (
        <svg style={{width: '100%', height: '48px'}}>
            <rect x="40%" y={finalDot ? '30%' : '0%'} width="20%" height="100%" fill="#2D3748" />
            <circle cx="50%" cy="30%" r="10%" fill="#2D3748" />
        </svg>
    )
}

function mapEventType(type: EventType): string {
    if (type === 'booking') {
        return 'card'
    }
    return type
}

function eventToColour(eventType: EventType) {
    if (eventType === 'goal') {
        return 'green'
    }
    if (eventType === 'booking') {
        return 'yellow'
    }
    return 'gray'
}