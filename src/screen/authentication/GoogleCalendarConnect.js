import React, { useEffect, useContext } from "react";
import { Box, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";

export default function GoogleCalendarConnect() {
    // const route = useNavigate();

    // const { calendarConnectSuccess } = useContext(AuthContext)
    // console.log("GoogleCalendarConnect", route.params?.success)

    // useEffect(() => {
    //     if (route.params?.success) {
    //         console.log("Redirecting to ProfileMain", route.params?.success)
    //         calendarConnectSuccess(() => { route.navigate('Profile') })
    //     }
    // }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                bgcolor: '#fff'
            }}
        >
            <Typography variant="h6"> Google Calendar Successful </Typography>
        </Box>
    )
}
