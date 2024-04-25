import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Battery0BarIcon from '@mui/icons-material/Battery0Bar';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import EventNoteIcon from '@mui/icons-material/EventNote';

const useStyles = {
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
        paddingRight: 1.5,
        paddingLeft: 1.5, 
        paddingTop: 1.5,
    },
    icon: {
        marginBottom: 0.8,
    }
};

const Icon = ({ name, execute, image, key, experimentalTitle }) => {
    const classes = useStyles;

    function RightIcon(image) {
        switch (image) {
            case 'refresh':
                return <EventNoteIcon sx={classes.icon} style={{ fontSize: 30 }} />;
            case 'git-pull-request':
                return <CloudSyncIcon sx={classes.icon} style={{ fontSize: 30 }} />;
            case 'battery-dead':
                return <Battery0BarIcon sx={classes.icon} style={{ fontSize: 30 }} />;
            case 'airplane-outline':
                return <BeachAccessIcon sx={classes.icon} style={{ fontSize: 30 }} />;
            default:
                return <BeachAccessIcon sx={classes.icon} style={{ fontSize: 30 }} />;
        }
    }

    return (
        <Box sx={{ position: 'relative' }}>
            <Box sx={classes.iconContainer} key={key} flexDirection="column">
                <IconButton key={key} onClick={execute} sx={classes.container}>
                    {RightIcon(image)}
                </IconButton>
                <Typography variant="caption" align="center">{name}</Typography>
            </Box>
            {experimentalTitle && (
                <Box sx={{ position: 'absolute',
                    borderRadius: 5,
                    top: 0,
                    right: 0,
                    background: 'yellow',
                    color: 'black',
                    paddingLeft: 1,
                    paddingRight: 1,
                    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.5)'
                }}>
                    <Typography variant="caption">{experimentalTitle}</Typography>
                </Box>
            )}
        </Box>
    );
};

export default Icon;
