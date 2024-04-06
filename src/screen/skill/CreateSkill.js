import React, { useState, useContext } from "react";
import { Button, TextField, Box } from '@mui/material';
import {makeStyles  } from '@mui/styles';
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
    const [duration, setDuration] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    const [categories, setCategories] = useState('');
    const [timePreferences, setTimePreferences] = useState([]);

    const handleSubmit = () => {
        const skillData = {
            name: name,
            duration: duration,
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
        <Box className={classes.container}>
            <TextField
                className={classes.input}
                label="Name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <TextField
                className={classes.input}
                label="Duration"
                value={duration.toString()}
                type="number"
                onChange={e => {
                    const parsedValue = parseInt(e.target.value);
                    if (!isNaN(parsedValue)) {
                        setDuration(parsedValue);
                    } else {
                        setDuration(0);
                    }
                }}
            />
            <Button variant="contained" onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? "Hide Optional Preferences" : "Add Optional Preferences"}
            </Button>
            {showDetails && (
                <Box>
                    <TimePreference timePreferences={timePreferences} setTimePreferences={setTimePreferences} />
                    <TextField
                        className={classes.input}
                        label="Categories"
                        value={categories}
                        onChange={e => setCategories(e.target.value)}
                    />
                    <TextField
                        className={classes.input}
                        label="Level"
                        value={level}
                        onChange={e => setLevel(e.target.value)}
                    />
                </Box>
            )}
            <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
        </Box>
    )
}
