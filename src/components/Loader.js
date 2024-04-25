
import React from "react";

import {Grid, CircularProgress, Typography} from '@mui/material';


export default function Loader({ loadingText, size }) {
    return (
        <Grid container style={{ height: size === "sm" ? "350px" : '100vh' }} direction="column" justifyContent="center" alignItems="center">
            <CircularProgress />
            <Typography variant="h6" align="center">{loadingText}</Typography>
        </Grid>
    )
}