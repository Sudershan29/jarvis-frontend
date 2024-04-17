import React, { useState, useEffect, useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DatePill from "../../components/DatePill";
import Event from '../../components/Event';
import { AuthContext } from "../../context/AuthContext";
import { getEvents } from "../../api/Calendar";

const useStyles = makeStyles({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        padding: 10,
        margin: 5,
    },
    dateScrollContainer: {
        height: 100, // Set a fixed height for the date scroll container
    },
    eventContainer: {
        flex: 1, // Allow this container to expand and fill the space
        // paddingLeft: 10,
        // paddingRight: 10,
    },
});

export default function CalendarScreen({ startOfDay }) {
    const classes = useStyles();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { userToken } = useContext(AuthContext);
    const [currentDateRange, setCurrentDateRange] = useState([]);
    const [activeDateIndex, setActiveDateIndex] = useState(0);
    const [currentDate, setCurrentDate] = useState(today);
    const [currEvents, setCurrEvents] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        generateDateRange(0);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            let dayAfterCurrentDate = new Date(currentDate);
            dayAfterCurrentDate.setDate(currentDate.getDate() + 1); // Add 24 hours to the current date
            const eventsResp = await getEvents(userToken, currentDate.toISOString(), dayAfterCurrentDate.toISOString());
            if (!eventsResp.success){
                setErrorMessage(eventsResp.message);
                return;
            }
            const events = eventsResp.events;
            events.sort((a, b) => new Date(a.startTime) - new Date(b.startTime)); // Sort events by start time
            setCurrEvents(events);
        };

        fetchData();
    }, [activeDateIndex]);

    const generateDateRange = (offset) => {
        let dates = [];
        today.setDate(today.getDate() + offset); // Adjust today based on offset
        for (let i = -3; i <= 3; i++) { // Generate 7 days range with today in the center
            let date = new Date(today);
            date.setDate(date.getDate() + i);
            dates.push({
                dateObj: date,
                date: date.getDate(),
                day: date.toLocaleString('en-us', { weekday: 'short' }),
                month: date.toLocaleString('en-us', { month: 'short' }),
            });
        }
        setCurrentDateRange(dates);
        setActiveDateIndex(3);
    };

    const changeActiveDate = (index) => {
        setCurrentDate(currentDateRange[index].dateObj);
        setActiveDateIndex(index);
    };

    return (
        <Box className={classes.container}>
            <Typography variant="h4" fontWeight="bold" marginBottom={2}> My Calendar </Typography>

            <Box className={classes.dateScrollContainer}>
                <Box display="flex" flexDirection="row" overflow="auto">
                    {currentDateRange.map((dateInfo, index) => (
                        <DatePill
                            key={index}
                            date={dateInfo.date}
                            day={dateInfo.day}
                            month={dateInfo.month}
                            highlighted={index === activeDateIndex} // Highlight the active date
                            today={index === 3} // Highlight today
                            onPressFunc={() => {changeActiveDate(index)}} // Set the clicked date as active
                        />
                    ))}
                </Box>
            </Box>
            <Box className={classes.eventContainer}>
                <Event 
                    heading={currentDate === new Date().getDate() ? "Today" : currentDateRange[activeDateIndex]}
                    isDate={currentDate !== new Date().getDate()}
                    events={currEvents}
                />
            </Box>
        </Box>
    )
}
