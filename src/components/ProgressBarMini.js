import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    subProgressBar: {
        marginTop: 10,
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressContainer: {
        height: 10,
        borderRadius: 5,
        overflow: 'hidden',
        width: '100%',
        backgroundColor: '#ddd',
    },
    subTitle: {
        fontSize: 14,
        marginBottom: 3,
    },
    subProgress: {
        height: 10,
        borderRadius: 5,
        overflow: 'hidden',
    },
    subProgressText: {
        color: 'black',
        textAlign: 'right',
        paddingRight: 2,
        fontSize: 10,
    },
});

export default function ProgressBarMini({ name, value, index }) {
    const classes = useStyles();
    let backgroundColor = '#ff0000'; // Default color is red

    if (value >= 75) {
        backgroundColor = '#00ff00'; // Green for values 75 and above
    } else if (value >= 50) {
        backgroundColor = '#ffff00'; // Yellow for values between 50 and 75
    }

    return (
        <Box key={index} className={classes.subProgressBar}>
            <Typography className={classes.subTitle}>{name}</Typography>
            <Box className={classes.progressContainer}>
                <Box className={classes.subProgress} style={{ width: `${Math.min(value + 5, 100) }%`, backgroundColor }}>
                    <Typography className={classes.subProgressText}>{`${value}%`}</Typography>
                </Box>
            </Box>
        </Box>
    )
}