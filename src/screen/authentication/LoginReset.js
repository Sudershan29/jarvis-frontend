
import React from "react";
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function LoginResetScreen() {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                bgcolor: '#fff'
            }}
        >
            <Typography>Forgot Password Screen </Typography>
            <Button
                variant="contained"
                onClick={() => navigate('/login')}
            >
                Go to Login
            </Button>
        </Box>
    )
}
