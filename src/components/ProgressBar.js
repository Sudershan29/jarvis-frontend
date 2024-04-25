import React, {useState} from 'react';
import FormControlLabel from '@mui/material/FormControlLabel'
import { Box, Typography, Button, Switch } from '@mui/material';
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

const useStyles = {
    container: {
        padding: 1,
        backgroundColor: '#fff',
        borderRadius: 2,
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
        paddingRight: 1,
        paddingBottom: 1,
        position: 'absolute', // Made progressText absolute
        right: 0, // Positioned it to the right
        top: -1, // Positioned it to the top
        zIndex: 1, // Made it appear above the progress bar
    }
};

const Android12Switch = styled(Switch)(({ }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&::before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="#fff" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&::after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="#fff" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
}));

export default function ProgressBar({ title, progress, subProgresses = [] }) {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const classes = useStyles;
    const progressCapped = Math.min(progress, 100);
    return (
        <Box sx={classes.container}>
            <Typography fontWeight="bold">{title}</Typography>
            <Box sx={classes.progressBar}>
                <ColorLinearProgress variant="determinate" value={Math.min(progressCapped + 10, 100)} />
                <Typography sx={classes.progressText} fontWeight="bold">{`${progressCapped}%`}</Typography>
            </Box>
            <Box sx={{ }}>
                <FormControlLabel
                    control={<Android12Switch value={isChecked} onChange={handleChange} />}
                    label="Show Completed"
                />
            </Box>
            {subProgresses.map((sub, index) => (
                (sub.completionRatio < 100 || isChecked) && (
                    <ProgressBarMini key={index} name={sub.name} value={Math.ceil(sub.completionRatio)} index={index} />
                )
            ))}
        </Box>
    );
};