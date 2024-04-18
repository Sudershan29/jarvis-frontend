
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

    const { login, setFlashMessage } = useContext(AuthContext)

    function NavigateToLogin(){
        window.location.href = GoogleLoginURL();
    }

    function handleLogin(){
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setEmail('');
            setPassword('');
            setFlashMessage({ message: 'Invalid email format', type: 'error' });
            return;
        }

        if(!email || !password)
            setFlashMessage({ message: 'Please fill all the fields', type: 'error' })

        login(email, password)
    }

    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Typography variant="h4" fontWeight="bold" style={{ marginBottom: 20 }}>Login</Typography>

            {/* <Box className={classes.inputView}>
                <TextField
                    value={email}
                    className={classes.TextInput}
                    placeholder="Email."
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Box>
            <Box className={classes.inputView}>
                <TextField
                    value={password}
                    className={classes.TextInput}
                    placeholder="Password."
                    variant="outlined"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Box> */}

            <Grid container direction="column" justifyContent="center" spacing={2} alignItems="center" padding={2}>
                {/* <Grid item>
                    <Button
                        variant="contained"
                        onClick={() => handleLogin()}
                    >
                        Login
                    </Button>
                </Grid> */}

                <Grid item>
                    <GoogleButton variant="contained" onClick={NavigateToLogin} />
                </Grid>
            </Grid>

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
