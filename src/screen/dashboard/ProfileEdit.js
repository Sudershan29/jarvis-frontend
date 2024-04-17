
import React, { useState, useContext } from 'react'
import { Grid, Button, Typography, Box, TextField, Stack} from '@mui/material';
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { editProfile } from '../../api/Profile'

const styles = {
    container: {
        margin: 3,
        marginBottom: 10,
    },
    form: {
        
    },
    divider: {
        width: '100%',
        height: 1.2,
        backgroundColor: '#ccc',
        margin: 1,
    },
}

export default function ProfileEdit() {
    const { userToken } = useContext(AuthContext)
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [timezone, setTimezone] = useState('')
    const [EarliestStartTime, setEarliestStartTime] = useState('')
    const [LatestEndTime, setLatestEndTime] = useState('')
    const navigate = useNavigate()

    const handleSaveProfile = async() => {
        await editProfile(userToken, 'personal', { name, phoneNumber })
        navigate('/profile')
    }

    const handleSaveCalendarInfo = async() => {
        await editProfile(userToken, 'timezone', { timezone, EarliestStartTime, LatestEndTime })
        navigate('/profile')
    }

    const handleSavePassword = async() => {
        await editProfile(userToken, 'password', { timezone, EarliestStartTime, LatestEndTime })
        navigate('/profile')
    }

    return (
        <Stack sx={styles.container} spacing={2}>
            <Typography variant="h4" fontWeight="bold">Edit Profile</Typography>
            <Stack spacing={2}>
                <Typography variant="h6" fontWeight="bold">Personal Information</Typography>
                <TextField
                    variant="outlined"
                    label="Name"
                    value={name}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={e => setName(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    label="Phone number"
                    value={phoneNumber}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={e => setPhoneNumber(e.target.value)}
                />
                <Button onClick={handleSaveProfile}> Save Information</Button>
            </Stack>

            <Box sx={styles.divider}/> 

            <Stack spacing={2}>
                <Typography variant="h6" fontWeight="bold">Password</Typography>
                <TextField
                    variant="outlined"
                    label="Current Password"
                    value={currentPassword}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={e => setCurrentPassword(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    label="New Password"
                    value={newPassword}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={e => setNewPassword(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    label="Confirm New Password"
                    value={confirmNewPassword}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={e => setConfirmNewPassword(e.target.value)}
                />
                <Button onClick={handleSavePassword}> Change Password </Button>
            </Stack>

            <Box sx={styles.divider} /> 

            <Stack spacing={2}>
                <Typography variant="h6" fontWeight="bold">Calendar Information</Typography>
                <TextField
                    variant="outlined"
                    label="Timezone"
                    value={timezone}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={e => setTimezone(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    label="EarliestStartTime"
                    type="time"
                    value={EarliestStartTime}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={e => setEarliestStartTime(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    label="LatestEndTime"
                    type="time"
                    value={LatestEndTime}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={e => setLatestEndTime(e.target.value)}
                />
                <Button onClick={handleSaveCalendarInfo}> Save Calendar Settings </Button>
            </Stack>

        </Stack>
    )
}