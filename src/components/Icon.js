import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Battery0BarIcon from '@mui/icons-material/Battery0Bar';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import EventNoteIcon from '@mui/icons-material/EventNote';

const useStyles = makeStyles({
    container: {
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
    },
    iconContainer: {
        display: 'flex',
        alignItems: 'center',
        paddingRight: 15,
        paddingLeft: 15, 
        paddingTop: 15,
    },
    icon: {
        marginBottom: 5,
    },
    // text: {
    //     fontSize: 3,
    //     textAlign: 'center',
    //     width: 30,
    // },
});

const Icon = ({ name, execute, image, key }) => {
    const classes = useStyles();

    function RightIcon(image) {
        switch (image) {
            case 'refresh':
                return <EventNoteIcon className={classes.icon} style={{ fontSize: 30 }} />;
            case 'git-pull-request':
                return <CloudSyncIcon className={classes.icon} style={{ fontSize: 30 }} />;
            case 'battery-dead':
                return <Battery0BarIcon className={classes.icon} style={{ fontSize: 30 }} />;
            case 'airplane-outline':
                return <BeachAccessIcon className={classes.icon} style={{ fontSize: 30 }} />;
            default:
                return <BeachAccessIcon className={classes.icon} style={{ fontSize: 30 }} />;
        }
    }

    return (
        <Box className={classes.iconContainer} key={key} flexDirection="column">
            <IconButton key={key} onClick={execute} className={classes.container}>
                {RightIcon(image)}
            </IconButton>
            <Typography variant="caption">{name}</Typography>
        </Box>
    );
};

export default Icon;
