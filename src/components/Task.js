import React from "react";
import { Box, Typography } from '@mui/material';
import { makeStyles } from "@mui/styles";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    pastDeadline: {
        backgroundColor: '#FADBD8', // Pale red
        borderRadius: 10,
    },
    done: {
        backgroundColor: '#D5F5E3', // Pale green
        borderRadius: 10,
    },
    default: {
        backgroundColor: '#D6EAF8', // Pale blue
        borderRadius: 10,
    },
    sampleStyle: {
        backgroundColor: '#F9EBEA', // Pale pink
        borderRadius: 10,
    },
    title: {
        color: '#34495E', // Dark blue
        fontSize: 18,
    },
    text: {
        color: '#34495E', // Dark blue
        marginBottom: 10,
    },
});

export default function Task({ sample, id, name, deadline, scheduled, timepreference, description, duration, hasDeadline, isDone }) {

    const classes = useStyles();
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

        navigate('TaskShow', {
            state: {
                id: id,
                name: name,
                deadline: deadline, 
                duration: duration,
                scheduled: scheduled,
                timePreferences: timepreference,
            }
        });
    }

    return (
        <Card className={cardStyle()} onClick={handleButtonClick}>
            <CardContent>
                <Typography className={classes.title}>{!sample ? name : "(Sample) Shop at Trader Joe's"}</Typography>
                {!sample && hasDeadline && <Typography className={classes.text}> {new Date(deadline).toLocaleString()} </Typography>}
                { sample && <Typography className={classes.text}> Deadline : Tomorrow </Typography>}
            </CardContent>
        </Card>
    )
}
