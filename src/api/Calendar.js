import axios from 'axios';

export const getEvents = async (token, startDate, endDate) => {
    try {
        const params = {};
        if (startDate) {
            params.startDate = startDate;
        }
        if (endDate) {
            params.endDate = endDate;
        }

        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/calendars/events`, {
            params,
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            }
        });
        return { success: true, events: response.data.events, message: '' };
    } catch (error) {
        return { success: false, events: [], message: 'Please resync your calendar' };
    }
}
