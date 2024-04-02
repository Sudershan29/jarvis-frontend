
import React, { useContext, useEffect } from 'react'
import { View, Text } from 'react-native';
import { AuthContext } from "../context/AuthContext"
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from "react-native-flash-message";

import { AppStack } from './AppStack';
import { LoginStack } from "./LoginStack"

const config = {
    screens: {
        ProfileMain: {
            screens: {
                GoogleCalendarConnect: 'GoogleCalendarConnect',
                Profile: 'Profile',
            },
        },
        GoogleLoginSuccess: 'googleLoginSuccess',
        CalendarDone: 'CalendarDone'
    },
};

const linking = {
    config,
};

export const AppNavigation = () => {
    const { isLoggedIn, isLoading } = useContext(AuthContext)
    const [loadingText, setLoadingText] = React.useState('Loading');

    useEffect(() => {
        const intervalId = setInterval(() => {
            setLoadingText(prev => prev.length < 10 ? prev + '.' : 'Loading');
        }, 500); // Periodically update loading text

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    if(isLoading)
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
                <Text>{loadingText}</Text>
            </View>
        )

    return(
        <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
            <View style={{ flex: 1 }}>
                { isLoggedIn() ? <AppStack /> : <LoginStack/> }
                <FlashMessage position="top" />
            </View>
        </NavigationContainer>
    )
}