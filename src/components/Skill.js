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
    scheduled: {
        backgroundColor: '#D5F5E3', // Pale green
        borderRadius: 10,
    },
    default: {
        backgroundColor: '#D6EAF8', // Pale blue
        borderRadius: 10,
    },
    sampleStyle: {
        backgroundColor: '#eff8ff', // Pale blue
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

export default function Skill({ sample, id, name, duration, scheduled, deadline, timepreference, categories, achieved, allocated }) {

    const classes = useStyles();
    const navigate = useNavigate();

    const cardStyle = () => {
        if (sample) {
            return classes.sampleStyle;
        }

        const now = new Date();
        const deadlineDate = new Date(deadline);
        if (deadline && deadlineDate < now) {
            return classes.pastDeadline;
        } else if (scheduled) {
            return classes.scheduled;
        } else {
            return classes.default;
        }
    };

    function handleButtonClick() {
        if(sample) {
            return;
        }

        navigate('SkillShow', {
            state: {
                id: id,
                name: name,
                duration: duration,
                timePreferences: timepreference,
            }
        });
    }

    return (
        <Card className={cardStyle()} onClick={handleButtonClick}>
            <CardContent>
                <Typography className={classes.title}>{!sample ? name : "(Sample) Learn to Crochet"}</Typography>
                {!sample && duration && <Typography className={classes.text}> Total : {duration} hours per week </Typography>}
                {/* {!sample && <Typography className={classes.text}> Categories : {categories.join(', ')} </Typography>} */}
                {!sample && <Typography className={classes.text}> Achieved({achieved}) / Allocated({allocated}) </Typography>}
                {/* {!sample && <Typography className={classes.text}> Completion Ratio : {Math.floor(achieved * 100/ allocated)}% </Typography>} */}
                {sample && <Typography className={classes.text}> Total : 2 hours per week </Typography>}
            </CardContent>
        </Card>
    )
}
