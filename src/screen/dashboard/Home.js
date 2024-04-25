import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Button } from "@mui/material";
import ProgressBar from "../../components/ProgressBar";
import Event from "../../components/Event";
import Icon from "../../components/Icon";
import { getEvents } from "../../api/Calendar";
import { planMyWeek, calibrateCalendar, clearMyDay, clearMyWeek } from "../../api/Schedule";
import { getProgressBar } from "../../api/Profile";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const useStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 1,
        margin: 0.25,
        marginBottom: 5,
    },
    boldText: {
        fontSize: 20, 
        fontWeight: "bold"
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 1.5,
        margin: 1.5,
    },
};

export default function HomeScreen () {
    const classes = useStyles;
    const { userToken, renderLoadingScreen } = useContext(AuthContext)
    const [ progress, setProgress ] = useState([])
    const [ overallProgress, setOverallProgress] = useState(0)
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ upcomingEvents, setUpcomingEvents ] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const now = new Date().toISOString();
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);
            const endOfDayISO = endOfDay.toISOString();
            const eventsResp = await getEvents(userToken, now, endOfDayISO);
            if (!eventsResp.success){
                setErrorMessage(eventsResp.message);
                return;
            }
            const events = eventsResp.events;
            events.sort((a, b) => new Date(a.startTime) - new Date(b.startTime)); // Sort events by start time
            setUpcomingEvents(events);
        };

        const getProgress = async () => {
            const progressData = await getProgressBar(userToken);
            if(progressData.success){
                let progressBars = progressData.data.progress
                progressBars.forEach(pp => {
                    pp.completionRatio = Math.min(pp.sum_ach / pp.sum_alloc * 100, 100);
                })
                progressBars.sort((a, b) => b.completionRatio - a.completionRatio);
                setProgress(progressBars.slice(0, 5));
                setOverallProgress(Math.ceil((progressData.data.achieved * 100) / progressData.data.allocated))
            }
        }

        fetchData();
        getProgress();
    }, []);

    return (
        <Box sx={classes.container}>
            <Typography variant="h4" fontWeight="bold"> Dashboard </Typography>

            <Box flex={3}>
                <ProgressBar title="My Progress" progress={overallProgress} subProgresses={progress} />
            </Box>

            <Box sx={classes.divider}></Box>

            <Box flex={1.75} padding={1}>
                <Typography fontWeight="bold">Quick Actions</Typography>
                <Box display="flex" flexDirection="row" overflow="auto">
                    <Icon name={"Plan next 3 days"} key={0} execute={async () => { await renderLoadingScreen(() => planMyWeek(userToken)) }} image={"refresh"} />
                    <Icon name={"Plan with AI"} key={1} execute={() => { navigate('/plan') }} image={"refresh"} experimentalTitle ={"Try AI"}/>
                    <Icon name={"Sync with Calendar"} key={2} execute={async () => { await renderLoadingScreen(() => calibrateCalendar(userToken)) }} image={"git-pull-request"} />
                    <Icon name={"Clear My Day"} key={3} execute={async () => { await renderLoadingScreen(() => clearMyDay (userToken)) }} image={"battery-dead"} /> 
                    <Icon name={"Clear My Week"} key={4} execute={async () => { await renderLoadingScreen(() => clearMyWeek(userToken)) }} image={"airplane-outline"} />
                </Box>
            </Box>

            <Box sx={classes.divider}></Box>

            <Box flex={6} padding={1}>
                <Event heading={"Upcoming Events"} 
                    events={upcomingEvents}
                    errorMessage={errorMessage}
                />
            </Box>
        </Box>
    )
}
