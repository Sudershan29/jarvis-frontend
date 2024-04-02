import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';

export default function Task({ sample, id, name, deadline, scheduled, timepreference, description, duration, hasDeadline, isDone }) {

    const navigation = useNavigation(); // Access navigation using useNavigation hook

    const cardStyle = () => {
        if (sample)
            return styles.sampleStyle;

        if(!hasDeadline)
            return styles.default;
    
        if(isDone)
            return styles.done;

        const now = new Date();
        const deadlineDate = new Date(deadline);
        if (deadline && deadlineDate < now) {
            return styles.pastDeadline;
        } else {
            return styles.default;
        }
    };

    function handleButtonClick() {
        if(sample) {
            return;
        }

        navigation.navigate('TaskShow', {
            id: id,
            name: name,
            deadline: deadline, 
            duration: duration,
            scheduled: scheduled,
            timePreferences: timepreference,
        });
    }

    return (
        <Card containerStyle={cardStyle()} onClick={() => { handleButtonClick()}}>
            <Card.Title style={styles.title}>{!sample ? name : "(Sample) Shop at Trader Joe's"}</Card.Title>
            <Card.Divider/>
            {!sample && hasDeadline && <Text style={styles.text}> {new Date(deadline).toLocaleString()} </Text>}
            { sample && <Text style={styles.text}> Deadline : Tomorrow </Text>}
        </Card>
    )
}

const styles = StyleSheet.create({
    pastDeadline: {
        backgroundColor: '#FADBD8', // Pale red
        borderRadius: 10,
    },
    done: {
        backgroundColor: '#D5F5E3', // Pale green
        borderRadius: 10,
    },
    default: {
        backgroundColor: '#D6EAF8', // Pale blue
        borderRadius: 10,
    },
    sampleStyle: {
        backgroundColor: '#F9EBEA', // Pale pink
        borderRadius: 10,
    },
    title: {
        color: '#34495E', // Dark blue
        fontSize: 18,
    },
    text: {
        color: '#34495E', // Dark blue
        marginBottom: 10,
    },
});
