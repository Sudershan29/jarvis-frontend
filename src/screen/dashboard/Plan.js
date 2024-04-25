
import React, {useState, useEffect, useContext} from 'react'
import {Box, Grid, Button, TextField, Stack, Typography} from '@mui/material'
import {ArrowBackIos as ArrowBackIosIcon, ArrowForwardIos as ArrowForwardIosIcon} from '@mui/icons-material'
import SendIcon from '@mui/icons-material/Send';
import Event from '../../components/Event'
import { getPlanner, chatWithPlanner, submitProposal } from '../../api/AIPlanner'
import Loader from '../../components/Loader'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AI = "AI(👽)"

// Start of Selection
function DateFormat({date, day, month}) {
    return (
        <Box justifyContent={"center"} textAlign="center">
            <Typography variant="caption" fontWeight="bold">{day}</Typography>
            <Typography variant="body1" fontWeight="bold">{date}</Typography>
            <Typography variant="caption" fontWeight="bold">{month}</Typography>
        </Box>
    )
}

export default function Plan({days = 3}) {
    const today12AM = new Date();
    const navigate = useNavigate()
    today12AM.setHours(0, 0, 0, 0);
    const loadingMessage = "Loading your schedule..."
    const [search, setSearch] = useState('')
    const [dateIndex, setDateIndex] = useState(0)
    const [events, setEvents] = useState({day1: [], day2: [], day3: []});
    const [refresh, setRefresh] = useState(true)
    const [messages, setMessages] = useState([
        {
            role: AI, 
            message: "Hi human! Do you like the timetable created for you? Describe any changes and I will help you make it better!"
        }
    ])
    const { userToken } = useContext(AuthContext) 

    const tomorrow = new Date(today12AM);
    tomorrow.setDate(today12AM.getDate() + 1);
    const daysAfter3 = new Date(today12AM);
    daysAfter3.setDate(today12AM.getDate() + 3);

    let currDate = new Date(tomorrow);
    currDate.setDate(tomorrow.getDate() + dateIndex);

    useEffect(() => {
        const fetchData = async () => {
            setRefresh(true)
            const response = await getPlanner(userToken, tomorrow.toISOString(), daysAfter3.toISOString())
            setEvents(response.events)
            setRefresh(false)
        }
        fetchData()
    }, [])

    const handleSubmitProposal = async () => {
        let proposals = []
        for(let i=0; i < days; i++)
            proposals = proposals.concat(events["day" + (i + 1)]);

        await submitProposal(userToken, proposals)
        navigate('/')
    }

    const handleCancelProposal = async () => {
        navigate('/')
    }

    return (
        <Grid container padding={2} sx={{ marginBottom: 5 }}>
            <Grid item xs={12}>
                <Box sx={{ borderRadius: 10, backgroundColor: 'green', paddingLeft: 2, width: '40%', marginLeft: 'auto' }}>
                    <Typography variant="caption" fontWeight="bold" sx={{ color: 'white' }}>Supported by OpenAI</Typography>
                </Box>
                <Typography variant="h4" fontWeight="bold">Plan</Typography>
            </Grid>

            <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Button onClick={() => { setDateIndex((dateIndex - 1 + days) % days) }}>
                        <ArrowBackIosIcon />
                    </Button>
                    <Grid container item direction="column" alignItems="center">
                        {/* <Typography variant="caption">Date</Typography> */}
                        <DateFormat date={currDate.getDate()} day={currDate.toLocaleString('en-us', {weekday: 'long'})} month={currDate.toLocaleString('en-us', {month: 'long'})} />
                    </Grid>
                    <Button onClick={() => { setDateIndex((dateIndex + 1) % days) }}>
                        <ArrowForwardIosIcon/>
                    </Button>
                </Box>
                <Box mt={2} sx={{overflow: 'auto', minHeight: '350px'}}>
                    {refresh ? <Loader size="sm" loadingText={loadingMessage} /> : <Event events={events["day" + (dateIndex + 1)]} isDate={false} />}
                </Box>
            </Grid>

            <Grid item xs={12}>
                <Typography variant="h6" fontWeight="bold">Messages (Coming Soon) </Typography>
                {/* <Box mt={2} sx={{overflow: 'auto', maxHeight: '150px', display: 'flex', flexDirection: 'column', scrollBehavior: 'smooth'}}>
                    {messages.map((message, index) => (
                        <Box key={index}>
                            <Typography variant="caption" sx={{
                                color: index === messages.length - 1 ? 'grey' : 'black', }}>
                                    {message.role}
                            </Typography>
                            <Box sx={{ 
                                backgroundColor: index === messages.length - 1 ? 'blue' : 'grey', 
                                borderRadius: '10px', 
                                padding: '10px', 
                                width: '50%', 
                                margin: '5px 0', 
                                alignSelf: message.role === AI ? 'flex-start' : 'flex-end',
                                marginLeft: message.role === AI ? '0' : 'auto',
                                marginRight: message.role === AI ? 'auto' : '0'
                            }}>
                                <Typography variant="body2" sx={{ color: 'white' }}>{message.message}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box> */}
            </Grid>

            <Grid item xs={12} container direction="row" alignItems="center">
                <Grid item xs={10}>
                    <TextField
                        label="Change Schedule"
                        variant="outlined"
                        value={search}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setSearch(e.target.value)} />
                </Grid>
                <Grid item xs={2}>
                    <Button 
                    variant="contained"
                    color="primary"
                    style={{height: '130%'}} 
                    disabled={search.length == 0}
                    onClick={async () => {
                        setSearch('')
                        setMessages([...messages, { role: "User", message: search }, { role: AI, message: "I am working on my changes. How do you like them?"}])
                    }}
                    >
                        <SendIcon />
                    </Button>
                </Grid>
            </Grid>

            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={6}> 
                    <Button variant="contained" color="error" onClick={() => handleCancelProposal()}>Nah! Ban {AI}
                    </Button> 
                </Grid>
                <Grid item xs={6}> 
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => { handleSubmitProposal() }}>Great Proposal :D
                    </Button> 
                </Grid>
            </Grid>
        </Grid>

    )
}