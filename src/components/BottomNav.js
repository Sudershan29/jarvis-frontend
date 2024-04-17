
import React, { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';

import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChecklistIcon from '@mui/icons-material/Checklist';

import { useNavigate } from 'react-router-dom';


import { useLocation } from 'react-router-dom';

export default function BottomNav() {
    const navigation = useNavigate();
    const location = useLocation();

    const getValueFromPath = (path) => {
        if (path === '/') {
            return 0;
        } else if (path.match(/(tasks)/)) {
            return 1;
        } else if (path.match(/(skills)/)) {
            return 3;
        } else if (path === '/calendar') {
            return 2;
        } else if (path === '/profile' || path === '/profile-edit') {
            return 4;
        } else {
            return 0;
        }
    }

    const [value, setValue] = useState(getValueFromPath(location.pathname));

    return (
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    switch (newValue) {
                        case 0:
                            navigation('/')
                            break;
                        case 1:
                            navigation('/tasks')
                            break;
                        case 2:
                            navigation('/calendar')
                            break;
                        case 3:
                            navigation('/skills')
                            break
                        case 4:
                            navigation('/profile')
                            break
                        default:
                            break;
                    }
                }}
            >
                <BottomNavigationAction label="Dashboard" icon={<DashboardIcon />} />
                <BottomNavigationAction label="Tasks" icon={<ChecklistIcon />} />
                <BottomNavigationAction label="Calendar" icon={<CalendarMonthIcon />} />
                <BottomNavigationAction label="Skills" icon={<FitnessCenterIcon />} />
                <BottomNavigationAction label="Profile" icon={<AccountBoxIcon />} />

            </BottomNavigation>
        </Box>
    )
}
