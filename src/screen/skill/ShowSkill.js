import React, { useContext, useState, useEffect } from "react";
import { Button, Typography, Box } from '@mui/material';
import { makeStyles } from "@mui/styles";
import TimePreference from "../../components/TimePreference";
import { AuthContext } from "../../context/AuthContext";
import { getProposals, cancelProposal, getSkill } from "../../api/Skill";
import ProposalGroup from "../../components/ProposalGroup";
import { useParams } from 'react-router-dom';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
});

export default function SkillShowScreen() {
    const { userToken, setFlashMessage } = useContext(AuthContext);
    const { id } = useParams();
    const classes = useStyles();

    const [proposals, setProposals] = useState([]);
    const [skill, setSkill] = useState({});

    useEffect(() => {
        Promise.all([
            getProposals(userToken, id),
            getSkill(userToken, id)
        ]).then(([proposalsRes, skillRes]) => {
            if (proposalsRes.success) {
                let pUnordered = proposalsRes.proposals;
                pUnordered.sort((a, b) => {
                    return new Date(a.scheduledFor) - new Date(b.scheduledFor);
                });
                setProposals(pUnordered);
            } else {
                setFlashMessage({
                    message: proposalsRes.message,
                    type: "error",
                });
            }

            if (skillRes.success) {
                setSkill(skillRes.skill);
            } else {
                setFlashMessage({
                    message: skillRes.message,
                    type: "error",
                });
            }
        });
    }, [userToken, id])

    return (
        <Box className={classes.container}>
            <Typography variant="h6">Name: {skill.name}</Typography>
            <Typography variant="body1">Duration: {skill.duration}</Typography>
            <TimePreference disableClick={true} timePreferences={skill.timePreferences ? skill.timePreferences : []} setTimePreferences={()=> {}} />
            <ProposalGroup proposals={proposals} cancel={(proposalId) => {cancelProposal(userToken, id, proposalId)}} />
            <Button variant="contained" color="primary" onClick={() => { }}>Completed</Button>
        </Box>
    )
}
