import React from "react";
import { Box, Typography } from '@mui/material';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    eventGroupContainer: {
        padding: 10,
        flexWrap: 'wrap',
    },
    event: {
        padding: 10,
        borderRadius: 5,
        margin: 2,
    },
    eventText: {
        color: '#fff',
    },
    eventTime: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

const EventGroup = ({ group, index }) => {
    const classes = useStyles();

    const getColor = (event) => {
        let color = '#00000080'; // Default color
        if (event.color) 
            return event.color;

        if (event.isGoogleCalendarEvent) color = '#2196F3'; // Blue
        if (event.isCancelled) color = '#F44336'; // Red

        // Lighten color if event is in the past
        // const currentTime = new Date();
        // if (new Date(event.startTime) < currentTime) {
        //     color += '80'; // Adding 50% opacity
        // }

        return color;
    };

    const startTime = new Date(group[0].startTime);
    const endTime = new Date(group[group.length - 1].endTime);

    const startTimeStr = `${startTime.getHours()}:${startTime.getMinutes() == 0 ? '00' : startTime.getMinutes()}`;
    const endTimeStr = `${endTime.getHours()}:${endTime.getMinutes() == 0 ? '00' : endTime.getMinutes() }`;

    const showGroup = group.some(event => !event.internal);

    return (
        <Box className={classes.eventGroupContainer} index={index}>
            {showGroup  &&<Typography className={classes.eventTime}>{`${startTimeStr} - ${endTimeStr}`}</Typography> }
            {group.map((event, index) => (
                !event.internal && <Box key={index} className={classes.event} style={{ backgroundColor: getColor(event) }}>
                    <Typography className={classes.eventText}>{event.name}</Typography>
                </Box>
            ))}
        </Box>
    );
};

export default EventGroup;
