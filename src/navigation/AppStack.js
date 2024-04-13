
import React from 'react'

import { Route, Routes } from 'react-router-dom'

import Home from '../screen/dashboard/Home'
import TaskScreen from '../screen/dashboard/Task'
import Calendar from '../screen/dashboard/Calendar'
import Profile from '../screen/dashboard/Profile'
import Skill from '../screen/dashboard/Skill'
import SkillCreateScreen from '../screen/skill/CreateSkill'
import ShowSkillScreen from '../screen/skill/ShowSkill'
import ShowTaskScreen from '../screen/task/ShowTask'
import TaskCreateScreen from '../screen/task/CreateTask'
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
                <Route exact path="/tasks/:id" element={<ShowTaskScreen />} />
                <Route exact path="/tasks" element={<TaskScreen />} />

                <Route exact path="/profile" element={<Profile />} />
                <Route path="*" element={<Home />} />
            </Routes>
            <Box>
                <BottomNav />
            </Box>
        </Box>
    )
}
