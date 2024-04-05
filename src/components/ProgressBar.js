import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from "@mui/styles";
import LinearProgress from '@mui/material/LinearProgress';
import ProgressBarMini from './ProgressBarMini';

const useStyles = makeStyles({
    container: {
        padding: 10,
        backgroundColor: '#f3f3f3',
        borderRadius: 10,
        overflow: 'hidden',
        width: '95%',
        boxShadow: '0 4px #ffffff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    progressBar: {
        height: 20,
        backgroundColor: '#ddd',
        borderRadius: 10,
        overflow: 'hidden',
    },
    progress: {
        height: '100%',
        backgroundColor: '#2196f3',
        justifyContent: 'center',
        borderRadius: 10,
    },
    progressText: {
        color: '#000',
        textAlign: 'right',
        paddingRight: 5,
    }
});

export default function ProgressBar({ title, progress, subProgresses = [] }) {
    const classes = useStyles();
    const progressCapped = Math.min(progress, 100);
    return (
        <Box className={classes.container}>
            <Typography className={classes.title}>{title}</Typography>
            <Box className={classes.progressBar}>
                <LinearProgress variant="determinate" value={Math.min(progressCapped + 10, 100)} />
                <Typography className={classes.progressText}>{`${progressCapped}%`}</Typography>
            </Box>
            {subProgresses.map((sub, index) => (
                <ProgressBarMini key={index} name={sub.name} value={Math.ceil(sub.completionRatio)} index={index} />
            ))}
        </Box>
    );
};