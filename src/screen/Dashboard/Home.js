import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ProgressBar from "../../components/ProgressBar";
import Event from "../../components/Event";
import Icon from "../../components/Icon";
import { getEvents } from "../../api/Calendar";
import { planMyWeek, calibrateCalendar, clearMyDay, clearMyWeek } from "../../api/Schedule";
import { getProgressBar } from "../../api/Profile";
import { AuthContext } from "../../context/AuthContext";

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 10,
    },
    boldText: {
        fontSize: 20, 
        fontWeight: "bold"
    }
});

export default function HomeScreen () {
    const classes = useStyles();
    const { userToken, renderLoadingScreen } = useContext(AuthContext)
    const [ progress, setProgress ] = useState([])
    const [ overallProgress, setOverallProgress] = useState(0)

    const [upcomingEvents, setUpcomingEvents] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const now = new Date().toISOString();
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);
            const endOfDayISO = endOfDay.toISOString();
            const events = await getEvents(userToken, now, endOfDayISO);
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
                setProgress(progressBars.slice(0, 3));
                setOverallProgress(Math.ceil((progressData.data.achieved * 100) / progressData.data.allocated))
            }
        }

        fetchData();
        getProgress();
    }, []);

    return (
        <Box className={classes.container}>
            {/* <Typography variant="h4" fontWeight="bold"> Dashboard </Typography> */}

            <Box flex={3}>
                <ProgressBar title="My Progress" progress={overallProgress} subProgresses={progress} />
            </Box>

            <Box flex={1.75} padding={1}>
                <Typography fontWeight="bold">Quick Actions</Typography>
                <Box display="flex" flexDirection="row" overflow="auto">
                    <Icon name={"Replan next 3days"} key={1} execute={async () => { await renderLoadingScreen(() => planMyWeek(userToken)) }} image={"refresh"} />
                    <Icon name={"Sync with Calendar"} key={2} execute={async () => { await renderLoadingScreen(() => calibrateCalendar(userToken)) }} image={"git-pull-request"} />
                    <Icon name={"Clear My Day"} key={3} execute={async () => { await renderLoadingScreen(() => clearMyDay (userToken)) }} image={"battery-dead"} /> 
                    <Icon name={"Clear My Week"} key={4} execute={async () => { await renderLoadingScreen(() => clearMyWeek(userToken)) }} image={"airplane-outline"} />
                </Box>
            </Box>

            <Box flex={6} padding={1}>
                <Event heading={"Upcoming Events"} 
                    events={upcomingEvents}
                />
            </Box>
        </Box>
    )
}
