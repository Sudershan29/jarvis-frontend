
import React, { createContext, useState, useEffect } from 'react'
import { userLogin, userGoogleLogin, userSignUp } from "../api/Login"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [flashMessage, setFlashMessageReal] = useState({});
    const [refreshToggle, setRefreshToggle] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [connectedToCalendar, setConnectedToCalendar] = useState(false)

    useEffect(() => {
        checkLoginStatus()
    }, []);

    function setFlashMessage(message) {
        setFlashMessageReal(message)
        setTimeout(() => {
            setFlashMessageReal({})
        }, 5000)
    }

    async function login(email, password) {
        setIsLoading(true)
        const response = await userLogin(email, password)
        if (!response.success) {
            setFlashMessage({
                message: response.message,
                type: "error",
            })
            setIsLoading(false);
            return;
        }
        setUserToken(response.token)
        localStorage.setItem(`@LoginStore:userToken-${process.env.REACT_APP_COOKIE_PREFIX}`, response.token)
        setIsLoading(false)
    }

    async function loginGoogleSuccess(token) {
        setIsLoading(true)
        setUserToken(token)
        localStorage.setItem(`@LoginStore:userToken-${process.env.REACT_APP_COOKIE_PREFIX}`, token)
        setIsLoading(false)
    }

    async function loginGoogle() {
        setIsLoading(true)
        const response = await userGoogleLogin()
        if (!response.success) {
            setIsLoading(false);
            setFlashMessage({
                message: response.message,
                type: "error",
            });
            return;
        }

        setUserToken(response.token)
        localStorage.setItem(`@LoginStore:userToken-${process.env.REACT_APP_COOKIE_PREFIX}`, response.token)
        setIsLoading(false)
    }

    async function renderLoadingScreen(func) {
        setIsLoading(true)
        await func();
        setIsLoading(false)
        setRefreshToggle(!refreshToggle)
    }

    function logout() {
        setIsLoading(true)
        setUserToken(null)
        localStorage.removeItem(`@LoginStore:userToken-${process.env.REACT_APP_COOKIE_PREFIX}`)
        setIsLoading(false)
    }

    async function checkLoginStatus() {
        try {
            setIsLoading(true)
            let userToken = localStorage.getItem(`@LoginStore:userToken-${process.env.REACT_APP_COOKIE_PREFIX}`);
            setUserToken(userToken)
            setIsLoading(false)
        } catch (e) {
            console.log("cannot load userTokens")
        }
    }

    function calendarConnectSuccess(whatTodoAfter) {
        setConnectedToCalendar(true)
        whatTodoAfter()
    }

    function isLoggedIn() {
        return userToken !== null
    }

    async function signUp(name, email, password) {
        try {
            const resp = await userSignUp(name, email, password)
            if (resp.success){
                await login(email, password)
                return
            }
            setFlashMessage({
                message: resp.message,
                type: "error",
            })
        } catch(e) {
            setFlashMessage({
                message: "An error occurred. Please try again later.",
                type: "error",
            })
        }
    }

    return (
        <AuthContext.Provider value={{
            userToken, isLoading, connectedToCalendar,
            refreshToggle, flashMessage, setFlashMessage, setRefreshToggle,
            isLoggedIn, login, logout, loginGoogle, signUp,
            loginGoogleSuccess, calendarConnectSuccess, renderLoadingScreen
        }}>
            {children}
        </AuthContext.Provider>
    )
}