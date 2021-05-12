import React, {useEffect, useState} from 'react';
import style from './ChatWindow.module.css'
import Messages from "./Messages/Messages";
import Chats from "./Chats/Chats";
import axios from "axios";
import {SECURED_API_PATH} from "../constants/API_PATH_DEFAULT";
import {getLocalWithExpiry} from "../constants/localStorage";
import {Redirect} from "react-router-dom";
import ProfileBar from "./ProfileBar/ProfileBar";
import DefaultMessageWindow from "./Messages/DefaultMessageWindow/DefaultMessageWindow";
import {getToken} from "../constants/getToken";
import getMessagesFromChat from "../constants/getMessagesFromChat";

function ChatWindow(props) {
    const {isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser} = props

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
    const [messageIsSent, setMessageIsSent] = useState({
        time: 0,
        isSent: true
    })
    const [messageChanged, setMessageChanged] = useState({
        id: 0,
        time: 0,
        edited: false,
        deleted: false
    })

    // const {message, errorMessage, serverResponse} = sessionResponse
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()


    //initial render, data fetch
    useEffect(() => {

        const JWT_header = getToken('ChatWindow')

        if (isLoggedIn === true && JWT_header !== null) {

            getUser(JWT_header)
            getChat(JWT_header)
            getLastMessages(JWT_header)
        } else {
            setIsLoggedIn(false)
        }

        return () => {
            source.cancel("axios fetch cancelled")
            setSessionResponse(prevSessionResponse => ({
                ...prevSessionResponse,
                message: `axios fetch cancelled`,
                requestCancelled: true
            }))
        }

    }, [])//useEffect

    // rerender component to display message preview, based on sent messages
    useEffect(() => {
        const JWT_header = getToken('ChatWindow')
        if (isLoggedIn === true && JWT_header !== null) {
            getLastMessages(JWT_header)
        }

        return () => {
            source.cancel("axios fetch cancelled")
            setSessionResponse(prevSessionResponse => ({
                ...prevSessionResponse,
                message: `axios fetch cancelled`,
                requestCancelled: true
            }))
        }
    }, [messageIsSent])

    // rerender component to display messages after change
    // and message preview, based on edited or deleted messages
    useEffect(async () => {
        const JWT_header = getToken('ChatWindow')
        //updates lastMessages array if the changed message is last
        const lastMessageChanged =
            lastMessages.find(message => message.id === messageChanged.id)

        if (lastMessageChanged) {
            if (isLoggedIn === true && JWT_header !== null) {
                getLastMessages(JWT_header)
            }
        }

        if (JWT_header!==null) {
            try {
                const messages = await getMessagesFromChat(JWT_header, selectedChat)
                console.log('her', messages)
                if (messages !== null) {
                    setMessages(messages)
                }
            } catch (error) {
                console.log(error)
            }
        }


        return () => {
            source.cancel("axios fetch cancelled")
            setSessionResponse(prevSessionResponse => ({
                ...prevSessionResponse,
                message: `axios fetch cancelled`,
                requestCancelled: true
            }))
        }
    }, [messageChanged])

//sets new message data when message gets changed
//     useEffect(async () => {
//         // const messagess = getMessages(selectedChat)
//         //
//         // messagess
//         //     .then(response => {
//         //         console.log(response)
//         //         if (response === null) {
//         //             setIsLoggedIn(false)
//         //             localStorage.removeItem('token')
//         //         } else {
//         //             console.log('hui', response)
//         //             setMessages(response)
//         //         }
//         //     })
//         //     .catch(error => {
//         //         console.log(error)
//         //     })
//
//         console.log('messageChanged', JSON.stringify(messageChanged))
//         const JWT_header = getToken()
//
//         // await setMessagesAfterChange()
//
//     }, [messageChanged])

    const getUser = (JWT_header) => {
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

    const getChat = (JWT_header) => {
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
                        setIsLoggedIn(false)
                        localStorage.removeItem('token')
                    }
                }
            })
    }

    const getLastMessages = (JWT_header) => {
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
                setIsLoggedIn(false)
                localStorage.removeItem('token')
            })
    }


    return (
        isLoggedIn ?
            <div className={style.chatWindow}>

                <div className={style.chatSectionWrap}>
                    <ProfileBar currentUser={currentUser}
                                setCurrentUser={setCurrentUser}/>

                    {(dataIsFetched.user && dataIsFetched.chats && dataIsFetched.lastMessages) &&
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
                                  messages={messages}
                                  messageIsSent={messageIsSent}
                                  setIsLoggedIn={setIsLoggedIn}
                                  setMessageIsSent={setMessageIsSent}
                                  messageChanged={messageChanged}
                                  setMessageChanged={setMessageChanged}/>
                        :
                        <DefaultMessageWindow/>
                    }
                </div>


            </div>
            : <Redirect to="/login"/>
    )
}

export default ChatWindow;