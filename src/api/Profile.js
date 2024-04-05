import axios from 'axios';

export const getProfile = async (token) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            }
        });
        return response.data.user;
    } catch (error) {
        console.error('Error fetching profile:', error);
        return {};
    }
}

export const getCalendars = async (token) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/calendars`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            }
        });
        return response.data.calendars;
    } catch (error) {
        console.error('Error fetching calendars:', error);
        return [];
    }
}

export const GoogleCalendarConnectFn = (token) => `${process.env.REACT_APP_BACKEND_URL}/calendar/connect?token=${token}`

export const getProgressBar = async (token) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/progressTracker`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            }
        });
        return { success: true, data: response.data.data };
    } catch (error) {
        console.error('Error fetching progress:', error);
        return {};
    }
}

