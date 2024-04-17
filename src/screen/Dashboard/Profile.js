
import React, { useContext, useState, useEffect } from "react";
import { Grid, Box, Button, Typography, Avatar } from "@mui/material";
import { GoogleCalendarConnectFn, getProfile, getCalendars } from "../../api/Profile";
import { getRoutines, createRoutine } from "../../api/Routine";
import { AuthContext } from "../../context/AuthContext";
import ScheduleGroup from "../../components/Schedule";
import {useNavigate} from 'react-router-dom';

const useStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 2,
        margin: 2,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 30,
    },
    userInfo: {
        marginBottom: 1,
    },
    userInfoText: {
        fontSize: 18,
    },
    calendarTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 0.5,
    },
    calendarGrid: {
        marginBottom: 0.5,
    },
    calendarItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 1,
        marginVertical: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 325,
    },
    calendarText: {
        fontSize: 16,
    },
    addButton: {
        marginBottom: 2,
    },
    logoutButton: {
        backgroundColor: '#ff6347',
        color: '#fff',
        margin: 1,
    },
    divider: {
        width: '100%',
        height: 1.2,
        backgroundColor: '#ccc',
        margin: 1,
    },
};

export default function ProfileScreen({ navigation }) {
    const navigate = useNavigate();
    const classes = useStyles;
    const { userToken, logout } = useContext(AuthContext)
    const [user, setUser] = useState({})
    const [calendars, setCalendars] = useState([])
    const [routines, setRoutines] = useState([])
    const [resetCount, setResetCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const [userInfo, userCalendars, userRoutines] = await Promise.all([getProfile(userToken), getCalendars(userToken), getRoutines(userToken)]);
            setUser(userInfo);
            setCalendars(userCalendars);
            setRoutines(userRoutines);
        };

        fetchData();
    }, [resetCount]);

    return (
        <Box sx={classes.container}>
            <Typography variant="h4" fontWeight="bold" sx={classes.title}>My Profile</Typography>

            <Avatar
                sx={classes.profilePicture}
                src={user?.profilePicture || "https://placedog.net/1000/563?id=2"}
            />

            <Box sx={classes.userInfo}>
                <Typography variant="body1" sx={classes.userInfoText}>Name: {user?.name}</Typography>
                <Typography variant="body1" sx={classes.userInfoText}>Email: {user?.email}</Typography>
                <Typography variant="body1" sx={classes.userInfoText}>Earliest Start Time: {user?.earliest_start_time || 'Wake up time'}</Typography>
                <Typography variant="body1" sx={classes.userInfoText}>Latest End Time: {user?.latest_end_time || 'Sleep time'}</Typography>
            </Box>

            <Grid>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        navigate('/profile-edit')
                    }}
                >
                    Edit
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => logout()}
                    sx={classes.logoutButton}
                >
                    Logout
                </Button>
            </Grid>

            <Box sx={classes.divider} />

            <Typography variant="h5" sx={classes.calendarTitle}>Calendars</Typography>
            <Box sx={classes.calendarGrid}>
                {calendars.map((calendar, index) => (
                    <Box key={index} sx={classes.calendarItem}>
                        <Typography variant="body1" sx={classes.calendarText}>{calendar?.name}</Typography>
                        <Typography variant="body1" sx={classes.calendarText}>{calendar?.type}</Typography>
                    </Box>
                ))}
            </Box>

            <Button
                variant="contained"
                color="primary"
                onClick={() => { window.location.href = GoogleCalendarConnectFn(userToken) }}
                sx={classes.addButton}
            >
                {calendars.length !== 0 ? "Resync Calendar" : "Connect to Calendar"}
            </Button>

            <Box sx={classes.divider} />

            <ScheduleGroup
                schedule={routines}
                refresh={() => setResetCount(resetCount + 1)}
            />

        </Box>
    )
}