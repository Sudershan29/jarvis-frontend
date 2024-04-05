
import React, { useContext, useEffect } from 'react'

import { Route, Routes } from 'react-router-dom'

import Login from '../screen/Authentication/Login'
import SignUp from '../screen/Authentication/SignUp'
import LoginResetScreen from '../screen/Authentication/LoginReset'
import GoogleLoginSuccess from '../screen/Authentication/GoogleLoginSuccess'

export default function AppStackNavigation() {
    return (
        <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/sign-up" element={<SignUp />} />
            <Route exact path="/login-reset" element={<LoginResetScreen />} />
            <Route exact path="/googleLoginSuccess" element={<GoogleLoginSuccess />} />
            <Route exact path="*" element={<Login />} />
        </Routes>
    )
}