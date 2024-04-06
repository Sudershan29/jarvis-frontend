import React from 'react';
import { Box, Button } from '@mui/material';
import { makeStyles } from "@mui/styles";

const daysOfTheWeek = [
    { name: 'Sun', value: 0, fullName: 'sunday'},
    { name: 'Mon', value: 1, fullName: 'monday'},
    { name: 'Tue', value: 2, fullName: 'tuesday'},
    { name: 'Wed', value: 3, fullName: 'wednesday'},
    { name: 'Thu', value: 4, fullName: 'thursday'},
    { name: 'Fri', value: 5, fullName: 'friday'},
    { name: 'Sat', value: 6, fullName: 'saturday'},
]

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    dayCircle: {
        width: 50,
        height: 50,
        borderRadius: 35,
        padding: 10,
        backgroundColor: '#E0E0E0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedDay: {
        backgroundColor: '#2196f3',
    },
});

export default function TimePreference({ timePreferences, setTimePreferences, disableClick}) {
    const classes = useStyles();

    const handleDayClick = (day) => {
        if (disableClick) return;

        if (!timePreferences) return;

        if (timePreferences.includes(day.fullName)) {
            setTimePreferences(timePreferences.filter(d => d !== day.fullName));
        } else {
            setTimePreferences([...timePreferences, day.fullName]);
        }
    };

    return (
        <Box className={classes.container}>
            {daysOfTheWeek.map(day => (
                <Button
                    key={day.value}
                    className={`${classes.dayCircle} ${timePreferences.includes(day.fullName) && classes.selectedDay}`}
                    onClick={() => handleDayClick(day)}
                >
                    {day.name}
                </Button>
            ))}
        </Box>
    );
};
