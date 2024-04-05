
import React, {useContext, useState, useEffect} from "react";
import { Box, Button, Typography, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { GoogleCalendarConnectFn, getProfile, getCalendars } from "./../../api/Profile";
import { AuthContext } from "../../context/AuthContext";

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    profilePicture: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    userInfo: {
        marginBottom: 20,
    },
    userInfoText: {
        fontSize: 18,
    },
    calendarTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    calendarGrid: {
        marginBottom: 20,
    },
    calendarItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 300,
    },
    calendarText: {
        fontSize: 16,
    },
    addButton: {
        marginBottom: 10,
    },
    logoutButton: {
        backgroundColor: '#ff6347',
        color: '#fff',
        margin: 10,
    },
});

export default function ProfileScreen ({navigation}) {
    const classes = useStyles();
    const { userToken, logout } = useContext(AuthContext)
    const [user, setUser] = useState({})
    const [calendars, setCalendars] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const [userInfo, userCalendars] = await Promise.all([getProfile(userToken), getCalendars(userToken)]);
            setUser(userInfo);
            setCalendars(userCalendars);
        };

        fetchData();
    }, []);

    return (
        <Box className={classes.container}>
            <Typography variant="h4" className={classes.title}>My Profile</Typography>

            <Avatar
                className={classes.profilePicture}
                src={user?.profilePicture || 'https://via.placeholder.com/150'}
            />

            <Box className={classes.userInfo}>
                <Typography variant="body1" className={classes.userInfoText}>Name: {user?.name}</Typography>
                <Typography variant="body1" className={classes.userInfoText}>Email: {user?.email}</Typography>
                <Typography variant="body1" className={classes.userInfoText}>Role: {user?.role || 'N/A'}</Typography>
                <Typography variant="body1" className={classes.userInfoText}>Organization: {user?.organization || 'N/A'}</Typography>
            </Box>

            <Typography variant="h5" className={classes.calendarTitle}>Calendars</Typography>
            <Box className={classes.calendarGrid}>
                {calendars.map((calendar, index) => (
                    <Box key={index} className={classes.calendarItem}>
                        <Typography variant="body1" className={classes.calendarText}>{calendar?.name}</Typography>
                        <Typography variant="body1" className={classes.calendarText}>{calendar?.type}</Typography>
                        {/* <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {/* Function to remove calendar }}
                        >
                            Remove
                        </Button> */}
                    </Box>
                ))}
            </Box>

            <Button
                variant="contained"
                color="primary"
                onClick={() => { window.location.href = GoogleCalendarConnectFn(userToken) }}
                className={classes.addButton}
            >
                {calendars.length !== 0 ? "Resync Calendar" : "Connect to Calendar"}
            </Button>
            
            <Box style={{ marginBottom: 10 }}></Box>
            
            <Button
                variant="contained"
                color="secondary"
                onClick={() => logout()}
                className={classes.logoutButton}
            >
                Logout
            </Button>
        </Box>
    )
}