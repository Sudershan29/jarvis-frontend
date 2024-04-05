
import React from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// import { AppNavigation } from "./navigation/App";
import AppNav from "./navigation/AppNav";

import { AuthProvider } from "./context/AuthContext";

export default function App() {


  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
    );
}