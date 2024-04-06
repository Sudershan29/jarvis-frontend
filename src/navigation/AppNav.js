import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import {Grid, Typography, CircularProgress} from '@mui/material';
import { AuthContext } from "../context/AuthContext";
import AppStack from "./AppStack";
import LoginStack from "./LoginStack";

export default function AppNav() {
    const { isLoggedIn, isLoading } = useContext(AuthContext)
    const [loadingText, setLoadingText] = React.useState('Loading');

    useEffect(() => {
        if (!isLoading)
            return

        const intervalId = setInterval(() => {
            setLoadingText(prev => prev.length < 16 ? prev + '.' : 'Loading');
        }, 500);

        return () => clearInterval(intervalId);
    }, [isLoading]);

    if (isLoading)
        return (
            <Grid container style={{ height: '100vh' }} direction="column" justifyContent="center" alignItems="center">
                <CircularProgress />
                <Typography variant="h6" align="center">{loadingText}</Typography>
            </Grid>
        )

    return (
        <Router>
            {isLoggedIn() ? <AppStack /> : <LoginStack />}
        </Router>
    );
}
