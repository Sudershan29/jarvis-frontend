import React, { useState, useContext } from "react";
import { Button, Box, TextField, Typography } from '@mui/material';
import TimePreference from "../../components/TimePreference";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import { createTask } from "../../api/Task";

export default function TaskCreateScreen() {
    const { userToken, setRefreshToggle, refreshToggle, setFlashMessage } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [duration, setDuration] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    const [categories, setCategories] = useState('');
    const [timePreferences, setTimePreferences] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = () => {
        const taskData = {
            name: name,
            description: description,
            duration: duration,
            deadline: deadline,
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

    const handleDeadlineChange = (event, selectedDate) => {
        const currentDate = selectedDate || new Date();
        setDeadline(currentDate);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2 }}>
            <TextField
                variant="outlined"
                placeholder="Name"
                value={name}
                onChange={event => setName(event.target.value)}
                fullWidth
                margin="normal"
            />

            <TextField
                variant="outlined"
                placeholder="Description"
                value={description}
                onChange={event => setDescription(event.target.value)}
                fullWidth
                margin="normal"
            />
            
            <TextField
                variant="outlined"
                placeholder="Duration"
                value={duration.toString()}
                type="number"
                onChange={event => {
                    const parsedValue = parseInt(event.target.value);
                    if (!isNaN(parsedValue)) {
                        setDuration(parsedValue);
                    } else {
                        setDuration(0);
                    }
                }}
                fullWidth
                margin="normal"
            />

            <Button variant="contained" onClick={() => setShowDetails(!showDetails)}>{showDetails ? "Hide Optional Preferences" : "Add Optional Preferences"}</Button>
            {showDetails && (
                <Box>
                    <TextField
                        variant="outlined"
                        placeholder="Deadline (Eg: 2006-01-02 15:04:05)"
                        value={deadline}
                        onChange={event => setDeadline(event.target.value)}
                        fullWidth
                        margin="normal"
                    />

                    <TimePreference timePreferences={timePreferences} setTimePreferences={setTimePreferences} />
                    <TextField
                        variant="outlined"
                        placeholder="Categories"
                        value={categories}
                        onChange={event => setCategories(event.target.value)}
                        fullWidth
                        margin="normal"
                    />

                </Box>
            )}
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </Box>
    )
}
