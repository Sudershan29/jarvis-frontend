
import axios from 'axios';

export async function getSkills(token) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/skills`, { headers: { 'Authorization': `Bearer ${token}`, "ngrok-skip-browser-warning": "69420" } });
        if (response.status === 200) {
            return { success: true, skills: response.data.skills }
        }
        return { success: false, message: response.data.message }
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export async function getSkill(token, skillId) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/skills/${skillId}`, { headers: { ' Authorization': `Bearer ${token}`, "ngrok-skip-browser-warning": "69420" } });
        if (response.status === 200) {
            return { success: true, skill: response.data.skill }
        }
        return { success: false} 
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export async function createSkill(token, skill) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/skills`, skill, { headers: { 'Authorization': `Bearer ${token}`, "ngrok-skip-browser-warning": "69420" } });
        if (response.status === 200) {
            return { success: true, message: response.data.message }
        }

        return { success: false, message: response.data.message }
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export async function getProposals(token, skillId) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/skills/${skillId}/proposals`, { headers: { 'Authorization': `Bearer ${token}`, "ngrok-skip-browser-warning": "69420" } });

        if (response.status === 200) {
            return { success: true, proposals: response.data.proposals }
        } else {
            return { success: false, proposals: [] }
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export async function cancelProposal(token, skillId, proposalId) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/skills/${skillId}/cancel/${proposalId}`, {}, { headers: { 'Authorization': `Bearer ${token}`, "ngrok-skip-browser-warning": "69420" } });
        if (response.status === 200) {
            return { success: true, message: response.data.message }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export async function skillAnalysis(token) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/skills/dashboard`, { headers: { 'Authorization': `Bearer ${token}`, "ngrok-skip-browser-warning": "69420" } });
        if (response.status === 200) {
            return { success: true, data: response.data }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}