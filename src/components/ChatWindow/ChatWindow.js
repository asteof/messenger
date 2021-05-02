import React, {useEffect, useState} from 'react';
import style from './ChatWindow.module.css'
import Messages from "./Messages/Messages";
import Chats from "./Chats/Chats";
import axios from "axios";
import {SECURED_API_PATH} from "../constants/API_PATH_DEFAULT";
import {getLocalWithExpiry} from "../Authorization/localStorage";
import {Redirect, useHistory} from "react-router-dom";
import ProfileBar from "./ProfileBar/ProfileBar";

function ChatWindow(props) {
    const [chatsData, setChats] = useState([])
    const [messages, setMessages] = useState([])
    const [chatIsSelected, setChatIsSelected] = useState(false)
    const [sessionResponse, setSessionResponse] = useState({
        message: '',
        errorMessage: '',
        serverResponse: ''
    })

    const {message, errorMessage, serverResponse} = sessionResponse
    const {isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser} = props


    useEffect(() => {
        let JWT
        const cancelToken = axios.CancelToken
        const source = cancelToken.source()

        if (getLocalWithExpiry('token') !== null && getLocalWithExpiry('token') !== "") {
            JWT = `Bearer ${getLocalWithExpiry('token')}`
            console.log(`ChatWindow.js ${JWT}`)
        } else {
            // setTokenExpired(true)
            setIsLoggedIn(false)
        }

        if (isLoggedIn === true && JWT !== "") {
            axios.get(`${SECURED_API_PATH}/chat`, {
                    headers: {authorization: JWT},
                    cancelToken: source.token
                }
            )
                .then(response => {
                    console.log(response.data)
                    setChats(response.data)
                    setSessionResponse(prevSessionResponse => ({
                        ...prevSessionResponse,
                        message: `success`,
                    }))
                })
                .catch(error => {
                    console.log(error)

                    if (typeof error.response === 'undefined') {
                        setSessionResponse(prevSessionResponse => ({
                            ...prevSessionResponse,
                            errorMessage: `Cannot log in due to a network error.`,
                            serverResponse: error.toString()
                        }))
                    } else {
                        console.log(error.response)
                        if (error.response.status === 401) {
                            setSessionResponse(prevSessionResponse => ({
                                ...prevSessionResponse,
                                message: `Your session was active for a long time. Please log in again`,
                            }))
                            setIsLoggedIn(false)
                            localStorage.removeItem('token')
                        } else {
                            setSessionResponse(prevSessionResponse => ({
                                ...prevSessionResponse,
                                errorMessage: `Cannot continue due to an error.`,
                                serverResponse: error.toString()
                            }))
                        }
                    }
                })

            axios.get(`${SECURED_API_PATH}/user`, {
                headers: {authorization: JWT},
                cancelToken: source.token
            })
                .then(response => {
                    console.log('ChatWindow.js response.data', response.data)
                    setCurrentUser(response.data)
                })
                .catch(error => {
                    // if (error.response.status ===400)
                    if (axios.isCancel(error)) {
                        console.log(`axios fetch cancelled\n${error}`)
                    }
                    setIsLoggedIn(false)
                    localStorage.removeItem('token')
                    console.log(error)
                })
        }//if condition

        return () => {
            source.cancel("axios fetch cancelled")
            setSessionResponse(prevSessionResponse => ({
                ...prevSessionResponse,
                message: `axios fetch cancelled`,
                requestCancelled: true
            }))
        }

    }, [])//useEffect

    return (
        isLoggedIn ?
            <div className={style.chatWindow}>
                <div className={style.chatSectionWrap}>
                    <ProfileBar currentUser={currentUser}/>
                    <Chats chatsData={chatsData}
                           currentUser={currentUser}
                           setIsLoggedIn={setIsLoggedIn}
                           setMessagesDat={setMessages}
                           setChatIsSelected={setChatIsSelected}/>
                </div>
                <Messages
                    chatIsSelected={chatIsSelected}
                    currentUser={currentUser}
                    messages={messages}/>
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