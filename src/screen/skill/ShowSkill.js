import React, { useContext, useState, useEffect } from "react";
import { Box, Typography, Button, Stack, Grid } from '@mui/material';
import { makeStyles } from "@mui/styles";
import TimePreference from "../../components/TimePreference";
import { AuthContext } from "../../context/AuthContext";
import { getProposals, cancelProposal, getSkill } from "../../api/Skill";
import ProposalGroup from "../../components/ProposalGroup";
import { useParams } from 'react-router-dom';
import { convertMinutesToHours } from "../../utils/time";

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
        <Stack margin={2} spacing={2}>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>{skill.name}</Typography>
            <Stack spacing={1}>
                <Stack direction="row" spacing={2}>
                    <Typography variant="body1" fontWeight="bold">Duration: </Typography>
                    <Typography variant="body1">{convertMinutesToHours(skill.duration)} </Typography>
                </Stack>
            </Stack>
            <Stack alignItems="center" spacing={0.1}>
                <Typography variant="body1" fontWeight="bold">I prefer working on</Typography>

                <TimePreference
                    disableClick={true}
                    timePreferences={skill.timePreferences ? skill.timePreferences : []}
                    setTimePreferences={() => { }}
                />
            </Stack>

            <Stack alignItems="center" spacing={0.1}>
                <ProposalGroup
                    disableClick={true}
                    proposals={proposals}
                    cancel={(proposalId) => { cancelProposal(id, proposalId) }}
                />
            </Stack>

            <Button variant="contained" color="primary" onClick={() => { }}>Completed</Button>
        </Stack>
    )
}
