
import React, { useState, useContext } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getTasks, taskAnalysis } from "../../api/Task";
import Task from "../../component/Task"
import { showMessage } from "react-native-flash-message";
import { AuthContext } from "../../context/AuthContext"
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import InfoComponent from "../../component/Information";

export default function TaskScreen() {
    const { userToken, refreshToggle } = useContext(AuthContext)
    const [taskAnalysisData, setTaskAnalysisData] = useState({})
    const [TasksData, setTasksData] = useState([])
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const navigation = useNavigation();

    React.useEffect(() => {
        const tasks = async() => {
            const res = await getTasks(userToken)
            if (res.success)
                setTasksData(res.tasks)
            else {
                showMessage({
                    message: res.message,
                    type: "error",
                })
            }
        }

        const analysis = async () => {
            const res = await taskAnalysis(userToken)
            if (res.success)
                setTaskAnalysisData(res.data.data)
            else {
                showMessage({
                    message: res.message,
                    type: "error",
                })
            }
        }

        analysis();
        tasks();
    }, [refreshToggle])

    const handleButtonClick = () => {
        setTimeout(() => {
            setIsButtonClicked(isButtonClicked);
        }, 1000);

        setIsButtonClicked(!isButtonClicked);

        navigation.navigate('TaskCreate');
    };

    return (
        <View style={styles.container}>
            {taskAnalysisData && 
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'left' }}> Progress: </Text><Text style={{ fontSize: 20, marginBottom: 10, textAlign: 'left' }}> {(taskAnalysisData?.achieved) / 60} / {(taskAnalysisData?.allocated) / 60} hrs </Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'right' }}> Total: </Text><Text style={{ fontSize: 20, marginBottom: 10, textAlign: 'right' }}> {taskAnalysisData?.total} hrs </Text>
                </View>
            }
            {TasksData.length !== 0 && <ScrollView>
                {TasksData.map((task, index) => (
                    <Task 
                        id={task.id}
                        name={task.name} 
                        deadline={task.deadline} 
                        key={index}
                        description={task.description}
                        duration={task.duration}
                        categories={task.categories}
                        timepreference={task.timepreference}
                        hasDeadline={task.hasDeadline}
                        isDone={task.isDone} />
                ))}
            </ScrollView>}
            {
                TasksData.length === 0 &&
                <View>
                        <Task sample={true} />
                        <Text style={{ textAlign: 'center', fontSize: 15, padding: 10 }}> You do not have any ongoing tasks listed on the platform </Text>
                        <Text style={{ textAlign: 'center', fontSize: 10, color: 'grey', fontWeight: 'bold' }}> Note: Use `+` to create your own tasks </Text>
                </View>
            }
            <TouchableOpacity style={styles.buttonContainer} onPress={handleButtonClick}>
                <Animatable.View animation={isButtonClicked ? 'fadeOut' : 'fadeIn'} duration={300} style={styles.button}>
                    <Text style={styles.buttonText}>{isButtonClicked ? 'x' : '+'}</Text>
                </Animatable.View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#2196f3', // Deep blue color
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3, // Add some elevation for Android shadow
    },
    button: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    }
});
