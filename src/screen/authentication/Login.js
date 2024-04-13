
import React, { useContext, useState } from "react";
import { TextField, Button, Box, Typography, Grid } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button'

import { AuthContext } from "../../context/AuthContext"
import { GoogleLoginURL, GoogleCallbackURL }  from "../../api/Login"

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    inputView: {
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
    },
    TextInput: {
        height: 50,
        width: '100%',
        padding: 10,
        marginLeft: 20,
    }
});

export default function LoginScreen() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login } = useContext(AuthContext)

    function NavigateToLogin(){
        window.location.href = GoogleLoginURL();
    }

    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Box className={classes.inputView}>
                <TextField
                    className={classes.TextInput}
                    placeholder="Email."
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Box>
            <Box className={classes.inputView}>
                <TextField
                    className={classes.TextInput}
                    placeholder="Password."
                    variant="outlined"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Box>

            <Grid container direction="row" justifyContent="center">
                <Button
                    variant="contained"
                    onClick={() => login(email, password)}
                >
                    Login
                </Button>
            </Grid>

            <GoogleButton variant="contained" onClick={NavigateToLogin} />

            <Typography
                variant="body2"
                onClick={() => navigate('/sign-up')}
                style={{ cursor: 'pointer', marginTop: '10px' }}
            >
                Don't have an account? Register
            </Typography>

            <Typography
                variant="body2"
                onClick={() => navigate('/login-reset')}
                style={{ cursor: 'pointer', marginTop: '10px' }}
            >
                Forgot password?
            </Typography>


        </Box>
    )
}
