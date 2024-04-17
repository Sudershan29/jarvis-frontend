import React, { useState, useContext } from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import { getSkills, skillAnalysis } from "../../api/Skill";
import Skill from "../../components/Skill";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { convertMinutesToHours } from "../../utils/time.js";

const useStyles = {
    container: {
        flexGrow: 1,
        margin: 2,
        backgroundColor: 'white',
        marginBottom: 8,
    },
    buttonContainer: {
        position: 'fixed',
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
};


export default function SkillScreen() {
    const classes = useStyles;
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
        navigate('/skills-create');
    };

    return (
        <Box sx={classes.container}>
            <Typography variant="h4" fontWeight="bold" marginBottom={2}> My Skills </Typography>

            {skillAnalysisData &&
                <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" fontWeight="bold" marginBottom={1}> Progress: </Typography><Typography variant="body1" marginBottom={1}> {convertMinutesToHours(skillAnalysisData?.achieved)} / {convertMinutesToHours(skillAnalysisData?.allocated)} </Typography>
                    <Typography variant="h6" fontWeight="bold" marginBottom={1} textAlign="right"> Total: </Typography><Typography variant="body1" marginBottom={1} textAlign="right"> {convertMinutesToHours(skillAnalysisData?.total)} </Typography>
                </Box>
            }
            <Stack padding={2} spacing={2}>
                {skillsData.length !== 0 &&
                    skillsData.map((skill, index) => (
                        <Skill id={skill.id}
                            name={skill.name}
                            duration={skill.duration}
                            timepreference={skill.timepreference}
                            categories={skill.categories}
                            key={index}
                            achieved={skill.achieved}
                            allocated={skill.allocated} />
                    ))
                }
            </Stack>

            {
                skillsData.length === 0 &&
                <Box>
                    <Skill sample={true}/>
                    <Typography align="center" variant="body2" gutterBottom> You do not have any ongoing skills listed on the platform </Typography>
                    <Typography align="center" variant="caption" color="textSecondary" fontWeight="bold"> Note: Use `+` to create your own skills </Typography>
                </Box>
            }
            <Button sx={classes.buttonContainer} onClick={handleButtonClick}>
                <Box sx={classes.button}>
                    <Typography sx={classes.buttonText}>{isButtonClicked ? 'x' : '+'}</Typography>
                </Box>
            </Button>
        </Box>
    );
}
