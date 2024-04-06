
import React, { useState, useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getTasks, taskAnalysis } from "../../api/Task";
import Task from "../../components/Task"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 75,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#2196f3',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.2)',
    },
    button: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    }
});

export default function TaskScreen() {
    const classes = useStyles();
    const { userToken, refreshToggle, setFlashMessage } = useContext(AuthContext)
    const [taskAnalysisData, setTaskAnalysisData] = useState({})
    const [TasksData, setTasksData] = useState([])
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        const tasks = async() => {
            const res = await getTasks(userToken)
            if (res.success)
                setTasksData(res.tasks)
            else {
                setFlashMessage({
                    message: res.message,
                    type: "error",
                })
            }
        }

        const analysis = async () => {
            const res = await taskAnalysis(userToken)
            if (res.success)
                setTaskAnalysisData(res.data.data)
            else {
                setFlashMessage({
                    message: res.message,
                    type: "error",
                })
            }
        }

        analysis();
        tasks();
    }, [refreshToggle])

    const handleButtonClick = () => {
        setTimeout(() => {
            setIsButtonClicked(isButtonClicked);
        }, 1000);

        setIsButtonClicked(!isButtonClicked);

        navigate('/task-create');
    };

    return (
        <Box className={classes.container}>
            {taskAnalysisData && 
                <Box display="flex" flexDirection="row" justifyContent="space-between">
                    <Typography variant="h6" fontWeight="bold" marginBottom={1}> Progress: </Typography><Typography variant="h6" marginBottom={1}> {(taskAnalysisData?.achieved) / 60} / {(taskAnalysisData?.allocated) / 60} hrs </Typography>
                    <Typography variant="h6" fontWeight="bold" marginBottom={1} textAlign="right"> Total: </Typography><Typography variant="h6" marginBottom={1} textAlign="right"> {taskAnalysisData?.total} hrs </Typography>
                </Box>
            }
            <Box padding={2}>
                {TasksData.length !== 0 &&
                    TasksData.map((task, index) => (
                        <Task
                            id={task.id}
                            name={task.name}
                            deadline={task.deadline}
                            key={index}
                            description={task.description}
                            duration={task.duration}
                            categories={task.categories}
                            timepreference={task.timepreference}
                            hasDeadline={task.hasDeadline}
                            isDone={task.isDone} />
                    ))
                }
            </Box>
            {
                TasksData.length === 0 &&
                <Box>
                        <Task sample={true} />
                        <Typography align="center" variant="body1" padding={1}> You do not have any ongoing tasks listed on the platform </Typography>
                        <Typography align="center" variant="caption" color="grey" fontWeight="bold"> Note: Use `+` to create your own tasks </Typography>
                </Box>
            }
            <Button className={classes.buttonContainer} onClick={handleButtonClick}>
                <Box className={classes.button}>
                    <Typography className={classes.buttonText}>{isButtonClicked ? 'x' : '+'}</Typography>
                </Box>
            </Button>
        </Box>
    );
}
