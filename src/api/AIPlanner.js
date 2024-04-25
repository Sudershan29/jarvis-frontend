import axios from 'axios';

export const getPlanner = async (token, startDate, endDate) => {
    try {
        const params = {};
        if (startDate) {
            params.startDate = startDate;
        }
        if (endDate) {
            params.endDate = endDate;
        }

        const response = await axios.get(`${process.env.REACT_APP_BRAIN_URL}/plan`, {
            params,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return { success: true, events: response.data, message: '' };
    } catch (error) {
        return { success: false, events: [[], [], []], message: 'Please try again later' };
    }
}

export const chatWithPlanner = async (token, message) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BRAIN_URL}/chat`, {
            message
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return { success: true, response: response.data, message: '' };
    } catch (error) {
        return { success: false, response: null, message: 'Please try again later' };
    }
}

export const submitProposal = async (token, proposal) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/submitProposal`, {
            proposal
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return { success: true, response: response.data, message: '' };
    } catch (error) {
        return { success: false, response: null, message: 'Please try again later' };
    }
}