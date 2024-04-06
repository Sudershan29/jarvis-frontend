import React, { useState, useContext, useEffect } from "react";
import { Box, Typography, Button } from '@mui/material';
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

export default function TaskShowScreen({ match }) {
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
        <Box className={classes.container}>
            <Typography variant="h6">Name: Sample {task.name}</Typography>
            <Typography variant="body1">Deadline: {deadlineDate.toLocaleString()} </Typography>
            <Typography variant="body1">Total Duration: {task.duration} hours </Typography>
            <TimePreference disableClick={true} timePreferences={task.timePreferences ? task.timePreferences : [] } setTimePreferences={() => { }} />
            <ProposalGroup proposals={proposals} cancel={(proposalId) => {cancelProposal(id, proposalId)}} />
            <Button variant="contained" onClick={() => { markAsCompleted (userToken, id)}}>Mark as Done</Button>
        </Box>
    )
}
