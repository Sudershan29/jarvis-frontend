import React, { useState, useContext } from "react";
import { Button, TextField, Box, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TimePreference from "../../components/TimePreference";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import { createSkill } from "../../api/Skill";

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        margin: 10,
        width: '80%',
    },
});

export default function SkillCreateScreen() {
    const classes = useStyles();
    const navigate = useNavigate();
    const { userToken, setRefreshToggle, refreshToggle, setFlashMessage } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [level, setLevel] = useState('');
    const [duration, setDuration] = useState('0h 0m');
    const [showDetails, setShowDetails] = useState(false);
    const [categories, setCategories] = useState('');
    const [timePreferences, setTimePreferences] = useState([]);

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

        if (!name || !durationInMinutes) {
            setFlashMessage({
                message: "Please ensure you have filled in name and duration",
                type: "error",
            });
            return;
        }

        const skillData = {
            name: name,
            duration: durationInMinutes,
            level: showDetails ? level : '',
            categories: showDetails ? [categories] : [],
            timepreferences: showDetails ? timePreferences : [],
        };
        createSkill(userToken, skillData)
            .then(res => {
                if (res.success) {
                    setFlashMessage({
                        message: "Skill created successfully",
                        type: "success",
                    });
                    setRefreshToggle(!refreshToggle);
                    navigate('/skills');
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

    return (
        <Stack spacing={2} margin={2} justifyContent="center">
            <Typography variant="h4" fontWeight="bold">Create Skill</Typography>
            <TextField
                variant="outlined"
                className={classes.input}
                label="Name"
                value={name}
                fullWidth
                InputLabelProps={{ shrink: true }}
                onChange={e => setName(e.target.value)}
            />

            <TextField
                variant="outlined"
                label="Duration"
                InputLabelProps={{ shrink: true }}
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

            <Button variant="contained" onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? "Hide Optional Preferences" : "Add Optional Preferences"}
            </Button>

            {showDetails && (
                <Stack spacing={2} alignItems="center" margin={2} >
                    <Stack alignItems="center" spacing={0.1}>
                        <Typography variant="body1" fontWeight="bold">I prefer working on</Typography>

                        <TimePreference
                            timePreferences={timePreferences}
                            setTimePreferences={setTimePreferences}
                        />
                    </Stack>

                    <TextField
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        className={classes.input}
                        label="Categories"
                        value={categories}
                        fullWidth
                        onChange={e => setCategories(e.target.value)}
                    />

                    <TextField
                        InputLabelProps={{ shrink: true }}
                        className={classes.input}
                        label="Level"
                        value={level}
                        fullWidth
                        variant="outlined"
                        onChange={e => setLevel(e.target.value)}
                    />

                </Stack>
            )}
            <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
        </Stack>
    )
}
