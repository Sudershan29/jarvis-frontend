import React from "react";
import { Box, Typography } from '@mui/material';
import { makeStyles } from "@mui/styles";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';

const useStyles = {
    pastDeadline: {
        backgroundColor: '#FADBD8', // Pale red
        borderRadius: 2,
    },
    done: {
        backgroundColor: '#D5F5E3', // Pale green
        borderRadius: 2,
    },
    default: {
        backgroundColor: '#D6EAF8', // Pale blue
        borderRadius: 2,
    },
    sampleStyle: {
        backgroundColor: '#F9EBEA', // Pale pink
        borderRadius: 2,
    },
    title: {
        color: '#34495E', // Dark blue
        fontSize: 18,
    },
    text: {
        color: '#34495E', // Dark blue
    },
};

export default function Task({ sample, id, name, deadline, scheduled, timepreference, description, duration, hasDeadline, isDone }) {

    const classes = useStyles;
    const navigate = useNavigate();

    const cardStyle = () => {
        if (sample)
            return classes.sampleStyle;

        if(!hasDeadline)
            return classes.default;
    
        if(isDone)
            return classes.done;

        const now = new Date();
        const deadlineDate = new Date(deadline);
        if (deadline && deadlineDate < now) {
            return classes.pastDeadline;
        } else {
            return classes.default;
        }
    };

    function handleButtonClick() {
        if(sample) {
            return;
        }

        navigate('/tasks/' + id);
    }

    return (
        <Card sx={cardStyle()} onClick={handleButtonClick}>
            <CardContent>
                <Typography sx={classes.title}>{!sample ? name : "(Sample) Shop at Trader Joe's"}</Typography>
                {!sample && hasDeadline && <Typography sx={classes.text}> {new Date(deadline).toLocaleString()} </Typography>}
                { sample && <Typography sx={classes.text}> Deadline : Tomorrow </Typography>}
            </CardContent>
        </Card>
    )
}
