import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext";
import AppStack from "./AppStack";
import LoginStack from "./LoginStack";
import Loader from "../components/Loader";

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
            <Loader loadingText={loadingText}/>
        )

    return (
        <Router>
            {isLoggedIn() ? <AppStack /> : <LoginStack />}
        </Router>
    );
}
