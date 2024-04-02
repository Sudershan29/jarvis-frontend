import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';

export default function Skill({ sample, id, name, duration, scheduled, deadline, timepreference, categories, achieved, allocated }) {

    const navigation = useNavigation(); // Access navigation using useNavigation hook

    const cardStyle = () => {
        if (sample) {
            return styles.sampleStyle;
        }

        const now = new Date();
        const deadlineDate = new Date(deadline);
        if (deadline && deadlineDate < now) {
            return styles.pastDeadline;
        } else if (scheduled) {
            return styles.scheduled;
        } else {
            return styles.default;
        }
    };

    function handleButtonClick() {
        if(sample) {
            return;
        }

        navigation.navigate('SkillShow', {
            id: id,
            name: name,
            duration: duration,
            timePreferences: timepreference,
        });
    }

    return (
        <Card containerStyle={cardStyle()} onClick={()=>{handleButtonClick()}}>
            <Card.Title style={styles.title}>{!sample ? name : "(Sample) Learn to Crochet"}</Card.Title>
            <Card.Divider />
            {!sample && duration && <Text style={styles.text}> Total : {duration} hours per week </Text>}
            {/* {!sample && <Text style={styles.text}> Categories : {categories.join(', ')} </Text>} */}
            {!sample && <Text style={styles.text}> Achieved({achieved}) / Allocated({allocated}) </Text>}
            {/* {!sample && <Text style={styles.text}> Completion Ratio : {Math.floor(achieved * 100/ allocated)}% </Text>} */}
            {sample && <Text style={styles.text}> Total : 2 hours per week </Text>}
        </Card>
    )
}

const styles = StyleSheet.create({
    pastDeadline: {
        backgroundColor: '#FADBD8', // Pale red
        borderRadius: 10,
    },
    scheduled: {
        backgroundColor: '#D5F5E3', // Pale green
        borderRadius: 10,
    },
    default: {
        backgroundColor: '#D6EAF8', // Pale blue
        borderRadius: 10,
    },
    sampleStyle: {
        backgroundColor: '#eff8ff', // Pale blue
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
