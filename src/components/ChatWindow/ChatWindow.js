import React, {useEffect, useState} from 'react';
import style from './ChatWindow.module.css'
import Messages from "./Messages/Messages";
import Chats from "./Chats/Chats";
import axios from "axios";
import {SECURED_API_PATH} from "../constants/API_PATH_DEFAULT";
import {getLocalWithExpiry} from "../Authorization/localStorage";
import {Redirect} from "react-router-dom";
import ProfileBar from "./ProfileBar/ProfileBar";
import DefaultMessageWindow from "./Messages/DefaultMessageWindow/DefaultMessageWindow";

function ChatWindow(props) {
    const [chatsData, setChatsData] = useState([])
    const [messages, setMessages] = useState([])
    const [lastMessages, setLastMessages] = useState([])
    const [selectedChat, setSelectedChat] = useState(0)
    const [secondChatUser, setSecondChatUser] = useState({})
    const [profilePictureColors, setProfilePictureColors] = useState({})
    const [sessionResponse, setSessionResponse] = useState({
        message: '',
        errorMessage: '',
        serverResponse: ''
    })
    const [dataIsFetched, setDataIsFetched] = useState({
        user: false,
        chats: false,
        lastMessages: false
    })

    const {message, errorMessage, serverResponse} = sessionResponse
    const {isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser} = props


    useEffect(() => {
        const cancelToken = axios.CancelToken
        const source = cancelToken.source()

        const JWT = getLocalWithExpiry('token')
        let JWT_header
        if (JWT !== null && JWT !== "") {
            JWT_header = `Bearer ${JWT}`
            console.log(`ChatWindow.js ${JWT_header}`)
        } else {
            // setTokenExpired(true)
            if (JWT === '') {
                console.log(JWT)
                localStorage.removeItem('token')
            }
            setIsLoggedIn(false)
        }

        if (isLoggedIn === true && JWT_header !== "") {

            getUser(JWT_header, source)

            getChat(JWT_header, source)

            getLastMessages(JWT_header, source)
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


    const getUser = (JWT_header, source) => {
        axios.get(`${SECURED_API_PATH}/user`, {
            headers: {authorization: JWT_header},
            cancelToken: source.token
        })
            .then(response => {
                console.log('ChatWindow.js response.data', response.data)
                setCurrentUser(response.data)
                setDataIsFetched(prevData => ({
                    ...prevData,
                    user: true
                }))
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
    }

    const getChat = (JWT_header, source) => {
        axios.get(`${SECURED_API_PATH}/chat`, {
                headers: {authorization: JWT_header},
                cancelToken: source.token
            }
        )
            .then(response => {
                console.log(response.data)
                setChatsData(response.data)
                setSessionResponse(prevSessionResponse => ({
                    ...prevSessionResponse,
                    message: `success`,
                }))
                setDataIsFetched(prevData => ({
                    ...prevData,
                    chats: true
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
    }

    const getLastMessages = (JWT_header, source) => {
        axios.get(`${SECURED_API_PATH}/messages/last/`, {
            headers: {authorization: JWT_header},
            cancelToken: source.token
        })
            .then(response => {
                console.log('last message', response.data)
                setLastMessages(response.data)
                setDataIsFetched(prevData => ({
                    ...prevData,
                    lastMessages: true
                }))
            })
            .catch(error => {
                console.log(error, error.response)
            })
    }

    return (
        isLoggedIn ?
            <div className={style.chatWindow}>
                <div className={style.chatSectionWrap}>
                            <ProfileBar currentUser={currentUser}
                                        setCurrentUser={setCurrentUser}/>

                    {(dataIsFetched.user && dataIsFetched.chats && dataIsFetched.lastMessages)&&
                            <Chats chatsData={chatsData}
                                   currentUser={currentUser}
                                   setSecondChatUser={setSecondChatUser}
                                   setIsLoggedIn={setIsLoggedIn}
                                   setMessages={setMessages}
                                   lastMessages={lastMessages}
                                   selectedChat={selectedChat}
                                   setSelectedChat={setSelectedChat}
                                   profilePictureColors={profilePictureColors}
                                   setProfilePictureColors={setProfilePictureColors}/>
                    }

                </div>
                <div className={style.messageSectionWrap}>
                    {selectedChat !== 0 ?
                        <Messages selectedChat={selectedChat}
                                  currentUser={currentUser}
                                  secondChatUser={secondChatUser}
                                  profilePictureColors={profilePictureColors}
                                  messages={messages}/>
                        :
                        <DefaultMessageWindow/>
                    }
                </div>


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