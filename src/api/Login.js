
import axios from 'axios';

export async function userLogin(userEmail, password) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
            email: userEmail,
            password: password
        }, {
            "ngrok-skip-browser-warning": "69420"
        });

        return { success: true, token: response.data.token }
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export async function userGoogleLogin() {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/google/signin`, {
            "ngrok-skip-browser-warning": "69420"
        });
        return { success: true, token: response.data.token }
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export async function userSignUp(name, email, password) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
            name: name,
            email: email,
            password: password
        }, {
            "ngrok-skip-browser-warning": "69420"
        });

        if (response.status !== 201) {
            return { success: false, message: response.data.message }
        }

        return { success: true }
    } catch (error) {
        return { success: false, message: error.message }
    }
    
}

export const GoogleLoginURL = () => `${process.env.REACT_APP_BACKEND_URL}/google/signin`

export const GoogleCallbackURL = () => `${process.env.REACT_APP_BACKEND_URL}/google/callback`