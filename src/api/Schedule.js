
import axios from 'axios';

export const planMyWeek = async (token) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/schedule/week`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            }
        });
        if (response.status === 200)
            return true
        return false
    } catch (error) {
        console.error('Error fetching profile:', error);
        return false;
    }
}

export const calibrateCalendar = async (token) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/calibrateWeek`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            }
        });
        if (response.status === 200)
            return true
        return false
    } catch (error) {
        console.error('Error syncing', error);
        return false;
    }
}

export const clearMyDay = async (token) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/clearDay`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            }
        });
        if (response.status === 200)
            return true
        return false
    } catch (error) {
        console.error('Error clearing day', error);
        return false;
    }
}

export const clearMyWeek = async (token) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/clearWeek`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            }
        });
        if (response.status === 200)
            return true
        return false
    } catch (error) {
        console.error('Error clearing week', error);
        return false;
    }
}