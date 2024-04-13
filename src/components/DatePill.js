import React from "react";
import { Grid, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 30,
        margin: 5,
        padding: 10,
        height: 75,
        display: 'flex',
        flexDirection: 'column', 
    },
    highlighted: {
        backgroundColor: '#def1ff',
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 5,
    },
});


export default function DatePill({ date, day, month, highlighted, onPressFunc, today }) {
    const classes = useStyles();
    return (
        <Grid container className={highlighted ? [classes.container, classes.highlighted] : classes.container} onClick={onPressFunc}>
            {today && <Typography variant="caption" style={{ alignSelf: 'center', textTransform: 'uppercase' }}>Today</Typography>}
            {!today && <>
                <Typography variant="body2" style={{ textTransform: 'uppercase', fontWeight: highlighted ? 'bold' : 'normal', alignSelf: 'center' }}>{day} </Typography>
                <Box className={classes.divider}></Box>
                <Typography style={{ whiteSpace: 'nowrap', alignSelf: 'center' }}>{date} {month}</Typography>
            </>}
        </Grid>
    )
}