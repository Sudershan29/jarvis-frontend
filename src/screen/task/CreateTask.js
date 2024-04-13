import React, { useState, useContext } from "react";
import { Button, Box, TextField, Typography, Stack } from '@mui/material';
import TimePreference from "../../components/TimePreference";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import { createTask } from "../../api/Task";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


export default function TaskCreateScreen() {
    const { userToken, setRefreshToggle, refreshToggle, setFlashMessage } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState(null);
    const [duration, setDuration] = useState('0h 0m');
    const [showDetails, setShowDetails] = useState(false);
    const [categories, setCategories] = useState('');
    const [timePreferences, setTimePreferences] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = () => {
        const durationInMinutes = duration.split(' ').reduce((total, time) => {
            if (time.includes('h')) {
                return total + parseInt(time) * 60;
            } else if (time.includes('m')) {
                return total + parseInt(time);
            } else {
                return total;
            }
        }, 0);

        if (!name || !description || !durationInMinutes) {
            setFlashMessage({
                message: "Please ensure you have filled in name, description and duration",
                type: "error",
            });
            return;
        }


        const taskData = {
            name: name,
            description: description,
            duration: durationInMinutes,
            deadline: deadline ? deadline.format("YYYY-MM-DD HH:mm:ss") : null,
            categories: showDetails && categories.length ? [categories] : [],
            timepreferences: showDetails ? timePreferences : [],
        };

        createTask(userToken, taskData)
            .then(res => {
                if (res.success) {
                    setFlashMessage({
                        message: "Task created successfully",
                        type: "success",
                    });
                    setRefreshToggle(!refreshToggle);
                    navigate('/tasks');
                } else {
                    setFlashMessage({
                        message: res.message,
                        type: "error",
                    });
                }
            })
            .catch(err => {
                setFlashMessage({
                    message: err.message,
                    type: "error",
                });
            });
    };

    const handleDeadlineChange = (selectedDate) => {
        setDeadline(selectedDate);
    };

    return (
        <Stack spacing={2} margin={2} justifyContent="center">
            <Typography variant="h4" fontWeight="bold">Create Task</Typography>

            <TextField
                variant="outlined"
                placeholder="Name"
                label="Name"
                value={name}
                onChange={event => setName(event.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
            />

            <TextField
                variant="outlined"
                placeholder="Description"
                value={description}
                onChange={event => setDescription(event.target.value)}
                fullWidth
                label="Description"
                margin="normal"
                InputLabelProps={{ shrink: true }}
            />
            
            <TextField
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                label="Duration"
                placeholder="Duration (e.g., 1h 30m)"
                value={duration}
                onChange={event => {
                    const value = event.target.value;
                    setDuration(value);
                }}
                onBlur={event => {
                    const value = event.target.value;
                    const isValid = /^(\d+h\s)?(\d+m)?$/.test(value);
                    if (!isValid) {
                        setDuration('');
                    }
                }}
                fullWidth
                margin="normal"
            />

            <Button variant="contained" onClick={() => setShowDetails(!showDetails)}>{showDetails ? "Hide Optional Preferences" : "Add Optional Preferences"}</Button>
            {showDetails && (
                <Stack spacing={2} alignItems="center" margin={2} >
                    <Stack alignItems="center" spacing={1}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                value={deadline}
                                onChange={handleDeadlineChange}
                                label="Deadline"
                                minDate={dayjs()}
                            />
                        </LocalizationProvider>
                    </Stack>

                    <Stack alignItems="center" spacing={0.1}>
                        <Typography variant="body1" fontWeight="bold">I prefer working on</Typography>

                        <TimePreference 
                            timePreferences={timePreferences} 
                            setTimePreferences={setTimePreferences} 
                        />
                    </Stack>

                    <TextField
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        label="Categories"
                        placeholder="Categories"
                        value={categories}
                        onChange={event => setCategories(event.target.value)}
                        fullWidth
                        margin="normal"
                    />

                </Stack>
            )}
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </Stack>
    )
}
