import React from "react";
import { Grid, Typography, Box } from '@mui/material';

const useStyles = {
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 30,
        margin: 0.5,
        padding: 1,
        height: 75,
        display: 'flex',
        flexDirection: 'column', 
    },
    highlighted: {
        backgroundColor: '#def1ff',
    },
    divider: {
        width: '100%',
        height: 0.01,
        backgroundColor: '#ccc',
        marginVertical: 0.5,
    },
};


export default function DatePill({ date, day, month, highlighted, onPressFunc, today }) {
    const classes = useStyles;
    return (
        <Grid container sx={highlighted ? [classes.container, classes.highlighted] : classes.container} onClick={onPressFunc}>
            {/* {today && (
                <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: '50%', width: 75, height: 75, position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="caption" style={{ textTransform: 'uppercase', color: '#000' }}>Today</Typography>
                </Box>
            )} */}
            <Typography variant="body2" style={{ textTransform: 'uppercase', fontWeight: highlighted ? 'bold' : 'normal', alignSelf: 'center' }}>{day} </Typography>
            <Box sx={classes.divider}></Box>
            <Typography style={{ whiteSpace: 'nowrap', alignSelf: 'center' }}>{date} {month}</Typography>
        </Grid>
    )
}