
import React, { useState, useContext } from 'react'
import Modal from '@mui/material/Modal';
import { Box, Typography, Stack, Button, Grid, TextField } from '@mui/material';
import { createRoutine, removeRoutine } from '../api/Routine';
import { AuthContext } from '../context/AuthContext';

function Schedule({ name, start, end, key, scheduleId, removable = true, refreshToggle }){
    const { userToken, setFlashMessage } = useContext(AuthContext);

    const removeRoutineAPI = async () => {
        const response = await removeRoutine(userToken, scheduleId);
        if (response.success) {
            setFlashMessage({
                message: "Routine removed successfully",
                type: "success",
            });
            refreshToggle()
        } else {
            setFlashMessage({
                message: response.message,
                type: "error",
            });
        }
    }

    return (
        <Grid container direction="row" spacing={1} key={key} sx={{ width: 350, marginBottom: 0.5, marginTop: 0.5 }} justifyContent="center" alignContent="center">
            <Grid item xs={3}><Typography variant="body1">{name}</Typography></Grid>
            <Grid item xs={3}><Typography variant="body1">{start}</Typography></Grid>
            <Grid item xs={3}><Typography variant="body1" alignItems="center">{end}</Typography></Grid>
            <Grid item xs={3}>
                <Button sx={{ borderRadius: 6, width: 1, fontSize: 10, minWidth: '16px' }} 
                            variant="contained"
                            color="warning"
                            disabled={!removable}
                            onClick={removeRoutineAPI}>
                                -
                </Button>
            </Grid>
        </Grid>
    )
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ScheduleGroup({ schedule = [], refresh }){
    const { userToken, setFlashMessage } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [name, setName] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const handleSubmit = async () => {
        const response = await createRoutine(userToken, { name, start, end });
        if (response.success) {
            handleClose();
            refresh();
        } else {
            setFlashMessage({
                message: response.message,
                type: "error",
            })
        }
    };

    return (
        <Stack alignItems="center" justifyContent="center">
            <Typography variant="h6" fontWeight="bold" >Schedule</Typography>

            { schedule.length > 0 &&
                <Box>
                    <Grid container direction="row" spacing={1} sx={{ width: 350, marginBottom: 0.5, marginTop: 0.5 }} justifyContent="center">
                        <Grid item xs={3}><Typography variant="body1" fontWeight="bold">Name</Typography></Grid>
                        <Grid item xs={3}><Typography variant="body1" fontWeight="bold">Starts</Typography></Grid>
                        <Grid item xs={3}><Typography variant="body1" fontWeight="bold">Ends</Typography></Grid>
                        <Grid item xs={3}><Typography variant="body1" fontWeight="bold">Remove</Typography></Grid>
                    </Grid>
                    {schedule.map((ss, index) => (
                        <Schedule key={index} name={ss.name} start={ss.start} end={ss.end} removable={ss.removable} scheduleId={ss.id} refreshToggle={()=>refresh()}/>
                    ))}
                </Box>
            }

            {schedule.length === 0 && <Typography variant="body2">No schedules yet</Typography>}

            <Button variant="contained"
                    color="primary"
                    sx={{ borderRadius: 30, width: 1, fontSize: 10, minWidth: '12px' }}
                    onClick={() => handleOpen()}>+</Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" fontWeight="bold">
                        Add Schedule
                    </Typography>
                    <Stack spacing={2} sx={{ marginTop: 2 }}>
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
                            label="Starts"
                            type="time"
                            value={start}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            onChange={e => setStart(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            label="Ends"
                            type="time"
                            value={end}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            onChange={e => setEnd(e.target.value)}
                        />
                        <Button variant="contained" color="primary" onClick={handleSubmit}>Add</Button>
                    </Stack>
                </Box>
            </Modal>
        </Stack>
    )
}
