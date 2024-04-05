import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function GoogleLoginSuccess() {
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);

    const token = queryParams.get('token');

    const { loginGoogleSuccess } = useContext(AuthContext)

    useEffect(() => {
        if(token) {
            loginGoogleSuccess(token)
            navigate('/')
        }
    }, [token]);


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
            <Typography variant="h6"> Authentication Successful </Typography>
        </Box>
    )
}
