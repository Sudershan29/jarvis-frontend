import React from "react";
import { Grid, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        margin: 5,
        padding: 10,
        height: 75,
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
        <Grid container className={highlighted ? classes.highlighted : classes.container} onClick={onPressFunc}>
            <Typography variant="body2" style={{ textTransform: 'uppercase', fontWeight: highlighted ? 'bold' : 'normal' }}>{day}</Typography>
            <Box className={classes.divider}></Box>
            <Typography variant="caption" style={{ whiteSpace: 'nowrap' }}>{date} {month}</Typography>
        </Grid>
    )
}