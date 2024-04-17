
import axios from 'axios';

export const getRoutines = async (token) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/routines`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (response.status === 200) {
            return response.data.routines
        }
        return []
    } catch (error) {
        return []
    }
}

export const createRoutine = async (token, routine) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/routines`, routine
            , { headers: { 'Authorization': `Bearer ${token}` } });
        if (response.status === 201) {
            return { success: true, message: response.data.message }
        }
        return {success: false, message: response.data.message}
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export const removeRoutine = async (token, routineId) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/routines/${routineId}`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (response.status === 200) {
            return { success: true, message: response.data.message }
        }
        return { success: false, message: response.data.message }
    }catch(error){
        return { success: false, message: error.message }
    }
}