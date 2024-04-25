import React from "react";
import { Box, Typography, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import { convertMinutesToHours } from "../utils/time.js";

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
    }
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
            <CardContent sx={classes.cardContent}>
                <Typography sx={classes.title} variant="h6" fontWeight="bold" paddingBottom={2}>
                    {!sample ? name : "(Sample) Learn to Crochet"}
                </Typography>
                {/* {!sample && <Typography> Categories : {categories.join(', ')} </Typography>} */}
                {!sample && 
                    <Grid container direction="row">
                        <Grid item xs={4}> <Typography sx={{ textDecoration: 'underline', fontStyle: 'italic' }}> Achieved </Typography> </Grid>
                        <Grid item xs={4}> <Typography> {convertMinutesToHours(achieved)} </Typography> </Grid>
                    </Grid>
                }
                {!sample && 
                    <Grid container direction="row">
                        <Grid item xs={4}> <Typography sx={{ textDecoration: 'underline', fontStyle: 'italic' }}> Allocated </Typography> </Grid>
                        <Grid item xs={4}> <Typography> {convertMinutesToHours(allocated)} </Typography> </Grid>
                    </Grid>
                }
                {!sample && duration &&
                    <Grid container direction="row">
                        <Grid item xs={4}> <Typography sx={{ textDecoration: 'underline', fontStyle: 'italic' }}> Total </Typography> </Grid>
                        <Grid item xs={4}> <Typography> {convertMinutesToHours(duration)} </Typography> </Grid>
                    </Grid>
                }
                {/* {!sample && <Typography> Completion Ratio : {Math.floor(achieved * 100/ allocated)}% </Typography>} */}
                {sample && 
                    <Typography> Total : 120 minutes per week </Typography>
                }
            </CardContent>
        </Card>
    )
}
