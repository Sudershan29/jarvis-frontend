
import React, {useState} from 'react'
import {Box, Grid, Button, TextField, Stack, Typography} from '@mui/material'
import {ArrowBackIos as ArrowBackIosIcon, ArrowForwardIos as ArrowForwardIosIcon} from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import Event from '../../components/Event'

export default function Plan() {
    const [search, setSearch] = useState('')
    const [date, setDate] = useState('Today')
    const [events, setEvents] = useState([])
    const [messages, setMessages] = useState([
        "Change my meeting from 3pm to 4pm",
        "Make my gym meeting to 6pm today",
        "Change my meeting from 3pm to 4pm",
        "Make my gym meeting to 6pm today",
        "Change my meeting from 3pm to 4pm",
        "Make my gym meeting to 6pm today",
    ])

    return (
        <Grid container padding={2} sx={{marginBottom: 5}}>
            <Grid item xs={12}>
                <Box sx={{ borderRadius: 10, backgroundColor: 'green', paddingLeft: 2, width: '40%', marginLeft: 'auto' }}>
                    <Typography variant="caption" fontWeight="bold" sx={{ color: 'white' }}>Supported by OpenAI</Typography>
                </Box>
                <Typography variant="h4" fontWeight="bold">Plan</Typography>
            </Grid>

            <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <ArrowBackIosIcon />
                    <Grid container item direction="column" alignItems="center">
                        <Typography variant="caption">Date</Typography>
                        <Typography variant="body1">{date}</Typography>
                    </Grid>
                    <ArrowForwardIosIcon />
                </Box>
                <Box mt={2} sx={{overflow: 'auto', minHeight: '350px'}}>
                    <Event events={events} heading="Today" isDate={false} />
                </Box>
            </Grid>

            <Grid item xs={12}>
                <Typography variant="h6" fontWeight="bold">Messages</Typography>
                <Box mt={2} sx={{overflow: 'auto', maxHeight: '150px', display: 'flex', flexDirection: 'column'}}>
                    {messages.map((message, index) => (
                        <Box key={index} sx={{backgroundColor: index === messages.length - 1 ? 'blue' : 'grey', borderRadius: '10px', padding: '10px', margin: '5px 0', alignSelf: 'flex-end'}}>
                            <Typography variant="body2" sx={{color: index === messages.length - 1 ? 'white' : 'black'}}>{message}</Typography>
                        </Box>
                    ))}
                </Box>
            </Grid>

            <Grid item xs={12} container direction="row" alignItems="center">
                <Grid item xs={10}>
                    <TextField
                        label="Change Schedule"
                        variant="outlined"
                        value={search}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{ shrink: true }}/>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" color="primary" style={{height: '130%'}}>
                        <SearchIcon />
                    </Button>
                </Grid>
            </Grid>

            <Grid item xs={12} justifyContent="center">
                <Button variant="contained" color="primary">Confirm proposal</Button>
            </Grid>
        </Grid>

    )
}