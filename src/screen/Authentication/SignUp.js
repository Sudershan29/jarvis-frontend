import React, { useContext, useState } from "react";
import { TextField, Button, Box, Typography, Grid } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext"

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

export default function SignUpScreen() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { signUp, setFlashMessage } = useContext(AuthContext)

    const classes = useStyles();

    const handleSignUp = () => {
        if(password !== confirmPassword) {
            setFlashMessage({
                message: "Passwords do not match",
                type: "error"
            })
            return;
        }
        signUp(name, email, password);
    }

    return (
        <Box className={classes.container}>
            <Box className={classes.inputView}>
                <TextField
                    className={classes.TextInput}
                    placeholder="Name."
                    variant="outlined"
                    onChange={(e) => setName(e.target.value)}
                />
            </Box>
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
            <Box className={classes.inputView}>
                <TextField
                    className={classes.TextInput}
                    placeholder="Confirm Password."
                    variant="outlined"
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </Box>

            <Grid container direction="row" justifyContent="center">
                <Button
                    variant="contained"
                    onClick={handleSignUp}
                >
                    Sign Up
                </Button>
            </Grid>

            <Typography
                variant="body2"
                onClick={() => navigate('/login')}
                style={{ cursor: 'pointer', marginTop: '10px' }}
            >
                Already have an account? Login
            </Typography>
        </Box>
    )
}
