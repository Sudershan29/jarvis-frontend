import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProgressBarMini({ name, value, index }) {
    let backgroundColor = '#ff0000'; // Default color is red

    if (value >= 75) {
        backgroundColor = '#00ff00'; // Green for values 75 and above
    } else if (value >= 50) {
        backgroundColor = '#ffff00'; // Yellow for values between 50 and 75
    }

    return (
        <View key={index} style={[styles.subProgressBar]}>
            <Text style={styles.subTitle}>{name}</Text>
            <View style={styles.progressContainer}>
                <View style={[styles.subProgress, { width: `${Math.min(value + 5, 100) }%` }, { backgroundColor }]}>
                    <Text style={styles.subProgressText}>{`${value}%`}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    subProgressBar: {
        marginTop: 10,
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressContainer: {
        height: 10,
        borderRadius: 5,
        overflow: 'hidden',
        width: '100%',
        backgroundColor: '#ddd',
    },
    subTitle: {
        fontSize: 14,
        marginBottom: 3,
    },
    subProgress: {
        height: 10,
        borderRadius: 5,
        overflow: 'hidden',
    },
    subProgressText: {
        color: 'black',
        textAlign: 'right',
        paddingRight: 2,
        fontSize: 10,
    },
});