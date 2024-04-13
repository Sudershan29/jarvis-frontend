import React from "react";
import { Box, Typography, Button, Stack } from '@mui/material';

const useStyles = {
    container: {
        padding: 1,
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 1,
    },
    cell: {
        marginRight: 1,
    },
    statusText: {
        color: 'white',
        borderRadius: 10,
    },
    cancelButton: {
        backgroundColor: '#F44336',
        borderRadius: 2,
        padding: 1,
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 12,
        borderRadius: 10,
    },
};

const ProposalGroup = ({ proposals, cancel }) => {
    const classes = useStyles;

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
        <Stack sx={classes.container}>
            <Typography variant="h6" fontWeight="bold">Calendar Events for this week</Typography>
            {proposals.map((proposal, index) => (
                <Box key={index} sx={classes.row}>
                    {index > 0 && <Box style={{ height: 1, backgroundColor: '#e0e0e0', margin: '10px 0' }}></Box>}
                    {/* <Typography className={classes.cell}>{proposal.id}</Typography> */}
                    <Typography sx={classes.cell}>{formatDate(proposal.scheduledFor)}</Typography>
                    <Box sx={{
                        backgroundColor: getStatusPillColor(proposal.status), borderRadius: 15,
                        padding: '5px 10px',
                        marginRight: 10,
                    }}>
                        <Typography sx={classes.statusText}>{proposal.status}</Typography>
                    </Box>
                    {proposal.status === 'pending' && (
                        <Button onClick={() => cancel(proposal.id)} sx={classes.cancelButton}>
                            <Typography sx={classes.cancelButtonText}>Cancel</Typography>
                        </Button>
                    )}
                </Box>
            ))}
            {proposals.length === 0 && <Typography sx={{ textAlign: 'center'}}>No proposals available</Typography>}
        </Stack>
    );
};

export default ProposalGroup;
