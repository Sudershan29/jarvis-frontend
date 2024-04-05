import React from "react";
import { Box, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    container: {
        padding: 10,
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10,
    },
    cell: {
        marginRight: 10,
    },
    statusPill: {
        borderRadius: 15,
        padding: '5px 10px',
        marginRight: 10,
    },
    statusText: {
        color: '#fff',
    },
    cancelButton: {
        backgroundColor: '#F44336',
        borderRadius: 5,
        padding: 5,
    },
    cancelButtonText: {
        color: '#fff',
    },
});

const ProposalGroup = ({ proposals, cancel }) => {
    const classes = useStyles();

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getStatusPillColor = (status) => {
        switch (status) {
            case 'pending':
                return '#2196F3'; // Blue
            case 'cancelled':
                return '#F44336'; // Red
            case 'done':
                return '#4CAF50'; // Green
            default:
                return '#757575'; // Default grey
        }
    };

    return (
        <Box className={classes.container}>
            <Typography variant="h6" gutterBottom>Calendar Events for this week</Typography>
            {proposals.map((proposal, index) => (
                <Box key={index} className={classes.row}>
                    {index > 0 && <Box style={{ height: 1, backgroundColor: '#e0e0e0', margin: '10px 0' }}></Box>}
                    <Typography className={classes.cell}>{proposal.id}</Typography>
                    <Typography className={classes.cell}>{formatDate(proposal.scheduledFor)}</Typography>
                    <Box className={[classes.statusPill, { backgroundColor: getStatusPillColor(proposal.status) }]}>
                        <Typography className={classes.statusText}>{proposal.status}</Typography>
                    </Box>
                    {proposal.status === 'pending' && (
                        <Button onClick={() => cancel(proposal.id)} className={classes.cancelButton}>
                            <Typography className={classes.cancelButtonText}>Cancel</Typography>
                        </Button>
                    )}
                </Box>
            ))}
        </Box>
    );
};

export default ProposalGroup;
