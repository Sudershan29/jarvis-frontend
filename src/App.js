
import React, { useState, useContext } from 'react'
import {Paper, Typography } from '@mui/material';
import AppNav from "./navigation/AppNav";
import { AuthProvider } from "./context/AuthContext";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <MessageRenderer/>
      <AppNav />
    </AuthProvider>
  );
}

function MessageRenderer(){
  const { flashMessage } = useContext(AuthContext);
  return (
    <>
      {flashMessage && flashMessage.message && 
        <Paper elevation={3} sx={{ 
            color: flashMessage.type === 'error' ? 'red' : 'blue',
            backgroundColor: flashMessage.type === 'error' ? '#ffe6e6' : '#e6f2ff',
            border: '1px solid',
            borderColor: flashMessage.type === 'error' ? 'red' : 'blue',
            borderRadius: '5px',
            padding: '10px',
            fontSize: '18px',
            textAlign: 'center',
            width: '80%',
            margin: '10px auto'
        }}>
          <Typography variant="h6">{flashMessage.message}</Typography>
        </Paper>
      }
    </>
  );
}