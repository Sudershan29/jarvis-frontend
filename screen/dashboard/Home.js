import React, { useState, useEffect, useContext } from "react";
import { Button, View, ScrollView, Text, StyleSheet, } from 'react-native';
import ProgressBar from "../../component/ProgressBar";
import Event from "../../component/Event";
import Icon from "../../component/Icon";
import { getEvents } from "../../api/Calendar";
import { planMyWeek, calibrateCalendar, clearMyDay, clearMyWeek } from "../../api/Schedule";
import { getProgressBar } from "./../../api/Profile";
import { AuthContext } from "../../context/AuthContext";

export default function HomeScreen () {

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
        <View style={styles.container}>
            <View style={{flex: 3}}>
                <ProgressBar title="My Progress" progress={overallProgress} subProgresses={progress} />
            </View>

            <View style={{ flex: 1.75, padding: 10 }}>
                <Text style={{fontSize: 20, fontWeight: "bold"}}>Quick Actions</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {/* <Icon name={"Morning is here!"} key={1} execute={() => { }} image={"alarm-outline"} />*/}
                    <Icon name={"Replan next 3days"} key={1} execute={async () => { await renderLoadingScreen(() => planMyWeek(userToken)) }} image={"refresh"} />
                    <Icon name={"Sync with Calendar"} key={2} execute={async () => { await renderLoadingScreen(() => calibrateCalendar(userToken)) }} image={"git-pull-request"} />
                    <Icon name={"Clear My Day"} key={3} execute={async () => { await renderLoadingScreen(() => clearMyDay (userToken)) }} image={"battery-dead"} /> 
                    <Icon name={"Clear My Week"} key={4} execute={async () => { await renderLoadingScreen(() => clearMyWeek(userToken)) }} image={"airplane-outline"} />
                </ScrollView>
            </View>

            <View style={{ flex: 6}}>
                <Event heading={"Upcoming Events"} 
                    events={upcomingEvents}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
});
