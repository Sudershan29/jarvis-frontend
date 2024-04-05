
import React, { useContext, useEffect } from 'react'

import { Route, Routes } from 'react-router-dom'

import Login from '../screen/Authentication/Login'

export default function AppStackNavigation() {
    return (
        <Routes>
            <Route exact path="/login" element={<Login />} />
        </Routes>
    )
}