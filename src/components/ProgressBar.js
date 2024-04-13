import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from "@mui/styles";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/system';
import ProgressBarMini from './ProgressBarMini';

const ColorLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 10,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#ddd',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 10,
    backgroundColor: '#2196f3',
  },
}));

const useStyles = makeStyles({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        width: '95%',
        // boxShadow: '0px 2px 2px 0.5px rgba(0,0,0,0.3)',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    progressBar: {
        height: 20,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative', // Added position relative to allow absolute positioning of progressText
    },
    progressText: {
        textAlign: 'right',
        paddingRight: 5,
        position: 'absolute', // Made progressText absolute
        right: 0, // Positioned it to the right
        top: 0, // Positioned it to the top
        zIndex: 1, // Made it appear above the progress bar
    }
});

export default function ProgressBar({ title, progress, subProgresses = [] }) {
    const classes = useStyles();
    const progressCapped = Math.min(progress, 100);
    return (
        <Box className={classes.container}>
            <Typography fontWeight="bold">{title}</Typography>
            <Box className={classes.progressBar}>
                <ColorLinearProgress variant="determinate" value={Math.min(progressCapped + 10, 100)} />
                <Typography className={classes.progressText}><Box sx={{fontWeight: 'bold'}}> {`${progressCapped}%`} </Box></Typography>
            </Box>
            {subProgresses.map((sub, index) => (
                <ProgressBarMini key={index} name={sub.name} value={Math.ceil(sub.completionRatio)} index={index} />
            ))}
        </Box>
    );
};