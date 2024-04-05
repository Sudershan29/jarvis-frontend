import React, { useState, useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getSkills, skillAnalysis } from "../../api/Skill";
import Skill from "../../components/Skill";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
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

export default function SkillScreen() {
    const classes = useStyles();
    const { userToken, refreshToggle, setFlashMessage } = useContext(AuthContext);
    const [skillsData, setSkillsData] = useState([]);
    const [skillAnalysisData, setSkillAnalysisData] = useState({});
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchSkills = async () => {
            const res = await getSkills(userToken)
            if (res.success) {
                if (res.skills?.length > 0)
                    setSkillsData(res.skills)
            } else {
                setFlashMessage({
                    message: res.message,
                    type: "error",
                });
            }
        }

        const fetchAnalysis = async () => {
            const res = await skillAnalysis(userToken)
            if (res.success)
                setSkillAnalysisData(res.data.data)
            else {
                setFlashMessage({
                    message: res.message,
                    type: "error",
                })
            }
        }

        fetchSkills()
        fetchAnalysis()
    }, [refreshToggle]);

    const handleButtonClick = () => {
        setTimeout(() => {
            setIsButtonClicked(isButtonClicked);
        }, 1000);

        setIsButtonClicked(!isButtonClicked);
        navigate('SkillCreate');
    };

    return (
        <Box className={classes.container}>
            {skillAnalysisData &&
                <Box display="flex" flexDirection="row" justifyContent="space-between">
                    <Typography variant="h6" gutterBottom align="left"> Progress: </Typography><Typography variant="body1"> {(skillAnalysisData?.achieved) / 60} / {(skillAnalysisData?.allocated) / 60} hrs </Typography>
                    <Typography variant="h6" gutterBottom align="right"> Total: </Typography><Typography variant="body1"> {skillAnalysisData?.total} hrs </Typography>
                </Box>
            }
            {skillsData.length !== 0 &&
                <Box>
                    {skillsData.map((skill, index) => (
                        <Skill id={skill.id}
                            name={skill.name}
                            duration={skill.duration}
                            timepreference={skill.timepreference}
                            categories={skill.categories}
                            key={index}
                            achieved={skill.achieved}
                            allocated={skill.allocated} />
                    ))}
                </Box>
            }
            {
                skillsData.length === 0 &&
                <Box>
                    <Skill sample={true}/>
                    <Typography align="center" variant="body2" gutterBottom> You do not have any ongoing skills listed on the platform </Typography>
                    <Typography align="center" variant="caption" color="textSecondary" fontWeight="bold"> Note: Use `+` to create your own skills </Typography>
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
