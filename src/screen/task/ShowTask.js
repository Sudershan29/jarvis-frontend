import React, { useState, useContext, useEffect } from "react";
import { Box, Typography, Button, Stack, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AuthContext } from "../../context/AuthContext";
import TimePreference from "../../components/TimePreference";
import { getProposals, cancelProposal, markAsCompleted, getTask } from "../../api/Task";
import ProposalGroup from "../../components/ProposalGroup";
import { useParams } from 'react-router-dom';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
});

export default function TaskShowScreen() {
    const classes = useStyles();
    const { userToken, setFlashMessage } = useContext(AuthContext);
    const { id } = useParams();
    const [task, setTask] = useState({});
    const [proposals, setProposals] = useState([]);

    useEffect(() => {
        Promise.all([getTask(userToken, id), getProposals(userToken, id)])
            .then(([taskRes, proposalRes]) => {
                if (taskRes.success) {
                    setTask(taskRes.task);
                } else {
                    setFlashMessage({
                        message: taskRes.message,
                        type: "error",
                    });
                }
                if (proposalRes.success) {
                    setProposals(proposalRes.proposals);
                } else {
                    setFlashMessage({
                        message: proposalRes.message,
                        type: "error",
                    });
                }
            });
    }, [id, userToken, setFlashMessage]);

    const deadlineDate = new Date(task.deadline);

    return (
        <Stack margin={2} spacing={2}>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>{task.name}</Typography>
            <Stack spacing={1}>
                <Stack direction="row" spacing={2}>
                    <Typography variant="body1" fontWeight="bold">Deadline: </Typography>
                    <Typography variant="body1">{deadlineDate.toLocaleString()} </Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <Typography variant="body1" fontWeight="bold">Total Duration: </Typography>
                    <Typography variant="body1">{Math.floor(task.duration / 60)}h {task.duration % 60}m</Typography>
                </Stack>
            </Stack>
            <Stack alignItems="center" spacing={0.1}>
                <Typography variant="body1" fontWeight="bold">I prefer working on</Typography>

                <TimePreference 
                    disableClick={true} 
                    timePreferences={task.timePreferences ? task.timePreferences : []} 
                    setTimePreferences={() => { }} 
                />
            </Stack>

            <Stack alignItems="center" spacing={0.1}>
                <ProposalGroup
                    disableClick={true}
                    proposals={proposals} 
                    cancel={(proposalId) => { cancelProposal(userToken, id, proposalId) }} 
                />
            </Stack>

            <Button variant="contained" onClick={() => { markAsCompleted (userToken, id)}}>Mark as Done</Button>
        </Stack>
    )
}
