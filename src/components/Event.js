import React from "react";
import { Box, Typography } from '@mui/material';
import EventGroup from "./EventGroup";

const useStyles = {
    container: {
        flex: 1,
        padding: 1,
    },
    heading: {
        fontWeight: 'bold', 
        fontSize: 20
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        padding: 2
    }
};

const Event = ({ events, heading, isDate, errorMessage }) => {
    const classes = useStyles;

    const groupEvents = () => {
        const grouped = [];
        let lastEvent = null;

        events.forEach(event => {
            const startTime = new Date(event.startTime);
            const endTime = lastEvent ? new Date(lastEvent.endTime) : null;

            if (lastEvent && (startTime - endTime) <= 900000) { // 15 minutes in milliseconds
                grouped[grouped.length - 1].push(event);
            } else {
                grouped.push([event]);
            }

            lastEvent = event;
        });

        return grouped;
    };

    const renderEventGroups = () => {
        const eventGroups = groupEvents();

        return eventGroups.map((group, index) => {
            return (
                <EventGroup key={index} group={group} index={index}/>
            );
        });
    };

    return (
        <Box>
            {!isDate && <Typography variant="body1" fontWeight="bold"> {heading}</Typography>}
            {isDate && <Typography variant="body1" fontWeight="bold"> {heading?.day}, {heading?.date + " " + heading?.month}</Typography>}
            {events.length === 0 ?
                <Box sx={classes.center}>
                    <Typography>{errorMessage ?  errorMessage : 'No upcoming events for today' }</Typography> 
                </Box> 
                : renderEventGroups()}
        </Box>
    );
};

export default Event;
