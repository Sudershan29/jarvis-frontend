
import axios from 'axios';

export async function getTasks(token) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tasks`, { headers: { 'Authorization': `Bearer ${token}`, "ngrok-skip-browser-warning": "69420" } });
        if (response.status === 200) {
            return { success: true, tasks: response.data.tasks }
        }
        return { success: false, message: response.data.message }
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export async function getTask(token, taskId) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tasks/${taskId}`, { headers: { 'Authorization': `Bearer ${token}`, "ngrok-skip-browser-warning": "69420" } });
        if (response.status === 200) {
            return { success: true, task: response.data.task }
        }
        return { success: false, message: response.data.message }
    } catch (error) {
        return { success: false, message: error.message }
    }
}



export async function createTask(token, skill) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/tasks`, skill, { headers: { 'Authorization': `Bearer ${token}`, "ngrok-skip-browser-warning": "69420" } });
        if (response.status === 200) {
            return { success: true, message: response.data.message }
        }

        return { success: false, message: response.data.message }
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export async function getProposals(token, taskId) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tasks/${taskId}/proposals`, { headers: { 'Authorization': `Bearer ${token}`, "ngrok-skip-browser-warning": "69420" } });

        if (response.status === 200) {
            return { success: true, proposals: response.data.proposals }
        } else {
            return { success: false, proposals: [] }
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export async function cancelProposal(token, taskId, proposalId) {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/tasks/${taskId}/cancel/${proposalId}`, { headers: { 'Authorization': `Bearer ${token}`, "ngrok-skip-browser-warning": "69420" } });
        if (response.status === 200) {
            return { success: true, message: response.data.message }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export async function taskAnalysis(token) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tasks/dashboard`, { headers: { 'Authorization': `Bearer ${token}`, "ngrok-skip-browser-warning": "69420" } });
        if (response.status === 200) {
            return { success: true, data: response.data }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export async function markAsCompleted(token, taskId) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/tasks/${taskId}/complete`, {}, { headers: { 'Authorization': `Bearer ${token}`, "ngrok-skip-browser-warning": "69420" } });
        if (response.status === 200) {
            return { success: true, message: response.data.message }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}