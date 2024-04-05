import React, { useContext, useState, useEffect } from "react";
import { Button, View, Text, StyleSheet } from 'react-native';
import TimePreference from "../../component/TimePreference";
import { AuthContext } from "../../context/AuthContext";
import { getProposals, cancelProposal } from "../../api/Skill";
import ProposalGroup from "../../component/ProposalGroup";

export default function SkillShowScreen({ route, navigation }) {
    const { userToken } = useContext(AuthContext);

    const { id, name, duration, timePreferences } = route.params;
    const [proposals, setProposals] = useState([]);

    useEffect(() => {
        getProposals(userToken, id).then(res => {
            if (res.success) {
                let pUnordered = res.proposals;
                pUnordered.sort((a, b) => {
                    return new Date(a.scheduledFor) - new Date(b.scheduledFor);
                });
                setProposals(pUnordered);
            } else {
                setFlashMessage({
                    message: res.message,
                    type: "error",
                });
            }
        })
    }, [])

    return (
        <View style={styles.container}>
            <Text>Name: Sample { name }</Text>
            <Text>Duration: { duration } </Text>
            <TimePreference disableClick={true} timePreferences={timePreferences} setTimePreferences={()=> {}} />
            <ProposalGroup proposals={proposals} cancel={(proposalId) => {cancelProposal(userToken, id, proposalId)}} />
            <Button title="Completed" onPress={() => { }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
});