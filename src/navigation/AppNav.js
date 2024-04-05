import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import {Grid, Typography} from '@mui/material';
import { AuthContext } from "../context/AuthContext";
import AppStack from "./AppStack";
import LoginStack from "./LoginStack";

export default function AppNav() {
    const { userToken } = useContext(AuthContext)

    const { isLoggedIn, isLoading } = useContext(AuthContext)
    const [loadingText, setLoadingText] = React.useState('Loading');

    useEffect(() => {
        if (!isLoading)
            return

        const intervalId = setInterval(() => {
            setLoadingText(prev => prev.length < 10 ? prev + '.' : 'Loading');
        }, 500);

        return () => clearInterval(intervalId);
    }, []);

    if (isLoading)
        return (
            <Grid style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/* <ActivityIndicator size="large" /> */}
                <Typography>{loadingText}</Typography>
            </Grid>
        )

    return (
        <Router>
            {isLoggedIn() ? <AppStack /> : <LoginStack />}
        </Router>
    );
}
