import React from 'react';
import { Box, Button, Stack, Typography, Grid, useMediaQuery} from '@mui/material';


const daysOfTheWeek = [
    { name: 'Sun', value: 0, fullName: 'sunday'},
    { name: 'Mon', value: 1, fullName: 'monday'},
    { name: 'Tue', value: 2, fullName: 'tuesday'},
    { name: 'Wed', value: 3, fullName: 'wednesday'},
    { name: 'Thu', value: 4, fullName: 'thursday'},
    { name: 'Fri', value: 5, fullName: 'friday'},
    { name: 'Sat', value: 6, fullName: 'saturday'},
]

const useStyles = {
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    dayCircle: {
        width: 50,
        height: 50,
        borderRadius: 50,
        padding: 1,
        backgroundColor: '#E0E0E0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedDay: {
        width: 50,
        height: 50,
        borderRadius: 35,
        backgroundColor: '#2196f3',
    },
};

export default function TimePreference({ timePreferences, setTimePreferences, disableClick}) {
    const classes = useStyles;

    const handleDayClick = (day) => {
        if (disableClick) return;

        if (!timePreferences) return;

        if (timePreferences.includes(day.fullName)) {
            setTimePreferences(timePreferences.filter(d => d !== day.fullName));
        } else {
            setTimePreferences([...timePreferences, day.fullName]);
        }
    };


    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        <Grid container spacing={2} justifyContent={isSmallScreen ? 'center' : 'flex-start'}>
            {daysOfTheWeek.map(day => (
                <Grid item>
                <Button 
                    variant="contained" shape="circular" color="primary"
                    key={day.value}
                    sx={timePreferences.includes(day.fullName) ? classes.selectedDay : classes.dayCircle}
                    onClick={disableClick ? null : () => handleDayClick(day)}
                >
                    {day.name}
                </Button>
                </Grid>
            ))}
            { (disableClick == null || !disableClick) && <Box marginTop={2} display="flex" alignItems="center" justifyContent="center">
                <Typography variant="caption" color="grey" fontWeight="bold" align="center"> Note: If "none" of the days are selected, it implies that any day is acceptable </Typography>
            </Box>}
        </Grid>
    );

};
