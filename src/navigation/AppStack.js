
import React, { useContext, useEffect } from 'react'

import { Route, Routes } from 'react-router-dom'

import Home from '../screen/Dashboard/Home'
import Login from '../screen/Authentication/Login'
import Calendar from '../screen/Dashboard/Calendar'
import Profile from '../screen/Dashboard/Profile'
import Skill from '../screen/Dashboard/Skill'
import Task from '../screen/Dashboard/Task'
import BottomNav from '../components/BottomNav'

export default function AppStackNavigation() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/calendar" element={<Calendar />} />
                <Route exact path="/skills" element={<Skill />} />
                <Route exact path="/tasks" element={<Task />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route path="*" element={<Home />} />
            </Routes>
            <BottomNav />
        </>
    )
}
