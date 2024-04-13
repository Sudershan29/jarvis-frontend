import React from "react";
import { Box, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';

const useStyles = {
    pastDeadline: {
        backgroundColor: '#FADBD8', // Pale red
        borderRadius: 2,
    },
    scheduled: {
        backgroundColor: '#D5F5E3', // Pale green
        borderRadius: 2,
    },
    default: {
        backgroundColor: '#D6EAF8', // Pale blue
        borderRadius: 2,
    },
    sampleStyle: {
        backgroundColor: '#eff8ff', // Pale blue
        borderRadius: 2,
    },
    title: {
        color: '#34495E', // Dark blue
        fontSize: 18,
    },
    text: {
        color: '#34495E', // Dark blue
        marginBottom: 2,
    },
};

export default function Skill({ sample, id, name, duration, scheduled, deadline, timepreference, categories, achieved, allocated }) {

    const classes = useStyles;
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

        navigate('/skills/' + id);
    }

    return (
        <Card sx={cardStyle()} onClick={handleButtonClick}>
            <CardContent>
                <Typography sx={classes.title}>{!sample ? name : "(Sample) Learn to Crochet"}</Typography>
                {!sample && duration && <Typography sx={classes.text}> Total : {duration} hours per week </Typography>}
                {/* {!sample && <Typography sx={classes.text}> Categories : {categories.join(', ')} </Typography>} */}
                {!sample && <Typography sx={classes.text}> Achieved({achieved}) / Allocated({allocated}) </Typography>}
                {/* {!sample && <Typography sx={classes.text}> Completion Ratio : {Math.floor(achieved * 100/ allocated)}% </Typography>} */}
                {sample && <Typography sx={classes.text}> Total : 2 hours per week </Typography>}
            </CardContent>
        </Card>
    )
}
