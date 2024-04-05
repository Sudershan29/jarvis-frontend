
import React, { useContext, useEffect } from 'react'

import { Route, Routes } from 'react-router-dom'

import Home from '../screen/Dashboard/Home'
import Login from '../screen/Authentication/Login'

export default function AppStackNavigation() {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="*" element={<Login />} />
        </Routes>
    )
}