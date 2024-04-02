import React, { useState, useContext } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getSkills, skillAnalysis } from "../../api/Skill";
import Skill from "../../component/Skill";
import { showMessage } from "react-native-flash-message";
import { AuthContext } from "../../context/AuthContext";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';


export default function SkillScreen() {
    const { userToken, refreshToggle } = useContext(AuthContext);
    const [skillsData, setSkillsData] = useState([]);
    const [skillAnalysisData, setSkillAnalysisData] = useState({});
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const navigation = useNavigation();

    React.useEffect(() => {
        const fetchSkills = async () => {
            const res = await getSkills(userToken)
            if (res.success) {
                if (res.skills?.length > 0)
                    setSkillsData(res.skills)
            } else {
                showMessage({
                    message: res.message,
                    type: "error",
                });
            }
        }

        const fetchAnalysis = async () => {
            const res = await skillAnalysis(userToken)
            if (res.success)
                setSkillAnalysisData(res.data.data)
            else {
                showMessage({
                    message: res.message,
                    type: "error",
                })
            }
        }

        fetchSkills()
        fetchAnalysis()
    }, [refreshToggle]);

    const handleButtonClick = () => {
        setTimeout(() => {
            setIsButtonClicked(isButtonClicked);
        }, 1000);

        setIsButtonClicked(!isButtonClicked);
        navigation.navigate('SkillCreate');
    };

    return (
        <View style={styles.container}>
            {skillAnalysisData &&
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'left' }}> Progress: </Text><Text style={{ fontSize: 20, }}> {(skillAnalysisData?.achieved) / 60} / {(skillAnalysisData?.allocated) / 60} hrs </Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'right' }}> Total: </Text><Text style={{ fontSize: 20, }}> {skillAnalysisData?.total} hrs </Text>
                </View>
            }
            {skillsData.length !== 0 &&
                <ScrollView>
                    {skillsData.map((skill, index) => (
                        <Skill id={skill.id}
                            name={skill.name}
                            duration={skill.duration}
                            timepreference={skill.timepreference}
                            categories={skill.categories}
                            key={index}
                            achieved={skill.achieved}
                            allocated={skill.allocated} />
                    ))}
                </ScrollView>
            }
            {
                skillsData.length === 0 &&
                <View>
                    <Skill sample={true}/>
                    <Text style={{ textAlign: 'center', fontSize: 15, padding: 10 }}> You do not have any ongoing skills listed on the platform </Text>
                    <Text style={{ textAlign: 'center', fontSize: 10, color: 'grey', fontWeight: 'bold'  }}> Note: Use `+` to create your own skills </Text>
                </View>
            }
            <TouchableOpacity style={styles.buttonContainer} onPress={handleButtonClick}>
                <Animatable.View animation={isButtonClicked ? 'fadeOut' : 'fadeIn'} duration={100} style={styles.button}>
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
        backgroundColor: '#2196f3',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
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
