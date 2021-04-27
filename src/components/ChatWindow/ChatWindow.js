import React, {useEffect, useState} from 'react';
import style from './ChatWindow.module.css'
import Messages from "./Messages/Messages";
import Chats from "./Chats/Chats";
import axios from "axios";
import {SECURED_API_PATH} from "../constants/API_PATH_DEFAULT";
import {getLocalWithExpiry} from "../Authorization/localStorage";
import {Redirect} from "react-router-dom";

function ChatWindow(props) {

    const [chatsData, setChats] = useState([])

    const [sessionResponse, setSessionResponse] = useState({
        message: '',
        errorMessage: '',
        serverResponse: ''
    })

    const {isLoggedIn, setIsLoggedIn, setTokenExpired} = props

    let messagesData = [
        {id: 1, text: 'Hui', fromMe: false},
        {id: 2, text: 'Pizda', fromMe: true},
        {id: 3, text: 'Skovoroda'},
        {id: 4, text: 'Ponimayu', fromMe: true},
        {id: 5, text: 'Ne ponimayu'},
        {id: 6, text: 'Spravedliva', fromMe: true},
        {id: 7, text: 'Ne spravedliva'},
        {id: 8, text: 'Sliva'},
        {id: 9, text: 'Sliva'},
        {id: 10, text: 'Sliva'},
        {id: 11, text: 'Sliva', fromMe: true},
        {id: 12, text: 'Sliva'},
        {id: 13, text: 'Sliva'}
    ]

    useEffect(() => {

        const cancelToken = axios.CancelToken
        const source = cancelToken.source()
        let JWT = ``

        if (getLocalWithExpiry('token') !== null || getLocalWithExpiry('token') !== "") {
            JWT = `Bearer ${getLocalWithExpiry('token')}`
            console.log(`ChatWindow.js ${JWT}`)
        } else {
            // setTokenExpired(true)
            setIsLoggedIn(false)
        }

        if (isLoggedIn === true && JWT !== '') {
            axios.get(`${SECURED_API_PATH}/chat`, {
                    headers:
                        {authorization: JWT},
                    cancelToken: source.token
                }
            )
                .then(response => {
                    console.log(response.data)
                    setChats(response.data)
                })
                .catch(error => {
                    console.log(error)

                    if (typeof error.response === 'undefined') {
                        setSessionResponse(prevSessionResponse => ({
                            ...prevSessionResponse,
                            errorMessage: `Cannot log in due to a network error.`,
                            serverResponse: error.toString()
                        }))
                        console.log(sessionResponse)
                    } else if (axios.isCancel(error)) {
                        console.log(`axios fetch cancelled\n${error}`)
                    } else {
                        if (error.response.status === 401) {
                            setSessionResponse(prevSessionResponse => ({
                                ...prevSessionResponse,
                                message: `Your session was active for a long time. Please log in again`
                            }))
                            setIsLoggedIn(false)
                            console.log(sessionResponse)
                        } else {
                            setSessionResponse(prevSessionResponse => ({
                                ...prevSessionResponse,
                                errorMessage: `Cannot continue due to an error.`,
                                serverResponse: error.toString()
                            }))
                            console.log(sessionResponse)
                        }
                    }
                })
        }
        return () => {
            source.cancel("axios fetch cancelled")
        }
    }, [])


    return (
        isLoggedIn ?
            <div className={style.chatWindow}>
                <Chats chatsData={chatsData}/>
                <Messages messagesData={messagesData}/>
            </div>
            : <Redirect to="/login"/>

    )
}

export default ChatWindow;


// else if (error.response.status === 500) {
//     setSessionResponse(prevSessionResponse => ({
//         ...prevSessionResponse,
//         message: `Unknown error. Please log in again`
//     }))
//     setIsLoggedIn(false)
//     console.log(sessionResponse)
// }