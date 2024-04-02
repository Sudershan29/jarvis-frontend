import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressBarMini from './ProgressBarMini';

export default function ProgressBar({ title, progress, subProgresses = [] }) {
    const progressCapped = Math.min(progress, 100);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.progressBar}>
                <View style={[styles.progress, { width: `${Math.min(progressCapped + 10, 100)}%` }]}>
                    <Text style={styles.progressText}>{`${progressCapped}%`}</Text>
                </View>
            </View>
            {subProgresses.map((sub, index) => (
                <ProgressBarMini key={index} name={sub.name} value={Math.ceil(sub.completionRatio)} index={index} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#f3f3f3',
        borderRadius: 10,
        overflow: 'hidden',
        width: '100%',
        shadowColor: '#ffffff',
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    progressBar: {
        height: 20,
        backgroundColor: '#ddd',
        borderRadius: 10,
        overflow: 'hidden',
    },
    progress: {
        height: '100%',
        backgroundColor: '#2196f3',
        justifyContent: 'center',
        borderRadius: 10,
    },
    progressText: {
        color: '#000',
        textAlign: 'right',
        paddingRight: 5,
    }
});
