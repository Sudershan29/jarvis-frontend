
import React, { useContext, useEffect } from 'react'

import { Route, Routes } from 'react-router-dom'

import Home from '../screen/Dashboard/Home'
import Calendar from '../screen/Dashboard/Calendar'
import Profile from '../screen/Dashboard/Profile'
import Skill from '../screen/Dashboard/Skill'
import SkillCreateScreen from '../screen/skill/CreateSkill'
import ShowSkillScreen from '../screen/skill/ShowSkill'
import Task from '../screen/Dashboard/Task'
import TaskScreen from '../screen/Task/ShowTask'
import TaskCreateScreen from '../screen/Task/CreateTask'
import BottomNav from '../components/BottomNav'
import Box from '@mui/material/Box'

export default function AppStackNavigation() {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/calendar" element={<Calendar />} />

                <Route exact path="/skills-create" element={<SkillCreateScreen />} />
                <Route exact path="/skills/:id" element={<ShowSkillScreen />} />
                <Route exact path="/skills" element={<Skill />} />

                <Route exact path="/task-create" element={<TaskCreateScreen />} />
                <Route exact path="/tasks/:id" element={<TaskScreen />} />
                <Route exact path="/tasks" element={<Task />} />

                <Route exact path="/profile" element={<Profile />} />
                <Route path="*" element={<Home />} />
            </Routes>
            <Box mt="auto">
                <BottomNav />
            </Box>
        </Box>
    )
}
