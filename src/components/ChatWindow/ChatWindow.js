import React, {useEffect, useState} from 'react';
import style from './ChatWindow.module.css'
import Messages from "./Messages/Messages";
import Chats from "./Chats/Chats";
import axios from "axios";
import {SECURED_API_PATH} from "../../constants/API_PATH_DEFAULT";
import {Redirect} from "react-router-dom";
import ProfileBar from "./ProfileBar/ProfileBar";
import DefaultMessageWindow from "./Messages/DefaultMessageWindow/DefaultMessageWindow";
import {getBearerToken} from "../../constants/getBearerToken";
import getMessagesFromChat from "../../constants/getMessagesFromChat";
import {webSocketInstance} from "../../constants/webSocketInstance";
import MenuIcons from "./MenuIcons/MenuIcons";
import RandomColor from "../../constants/RandomColor";
import useSound from "use-sound";
import messageSound from '../../media/sounds/1.mp3'

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
    const [messagesPage, setMessagesPage] = useState(1)
    const [receivedMessage, setReceivedMessage] = useState({
        id: 0,
        time: 0
    })
    const [messageIsSent, setMessageIsSent] = useState({
        id: 0,
        time: 0,
        isSent: true
    })
    const [messageChanged, setMessageChanged] = useState({
        id: 0,
        time: 0,
        edited: false,
        deleted: false
    })
    const [menuMessageSent, setMenuMessageSent] = useState({
        id: 0,
        time: 0,
        recipientId: 0,
        chatId: 0
    })
    const [chatIsDeleted, setChatIsDeleted] = useState(0)
    // const {message, errorMessage, serverResponse} = sessionResponse
    const [playSound] = useSound(messageSound,
        {volume: 0.25})
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()

    //initial render, data fetch
    useEffect(() => {
        const JWT_header = getBearerToken('ChatWindow initial')
        if (isLoggedIn === true && JWT_header !== null) {
            getUser(JWT_header)
            getChats(JWT_header)
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

    //sets WebSocket connection after successful user setting
    useEffect(() => {
        if (currentUser.id !== 0) {
            webSocketInstance(setReceivedMessage, currentUser.id)
            setProfilePictureColors(prevColors => ({
                ...prevColors,
                [currentUser.id]: RandomColor()
            }))
        }
    }, [currentUser.id])

    // rerender component to display message preview, based on sent messages
    useEffect(() => {
        const JWT_header = getBearerToken('ChatWindow message sent')
        if (isLoggedIn === true && JWT_header !== null) {
            getChats(JWT_header)
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

    /* rerender component to display chats and message preview,
     based on edited or deleted messages */
    useEffect(() => {
        const fetchData = async () => {
            const JWT_header = getBearerToken('ChatWindow message changed')
            //updates lastMessages array if the changed message is last
            const lastMessageChanged =
                lastMessages.find(message => message.id === messageChanged.id)

            if (lastMessageChanged) {
                if (isLoggedIn === true && JWT_header !== null) {
                    getChats(JWT_header)
                    getLastMessages(JWT_header)
                }
            }

            if (JWT_header !== null && messageChanged.id !== 0) {
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
        }
        fetchData().then()
    }, [messageChanged])

    //rerender component to display messages after receiving a new message
    useEffect(() => {
        if (receivedMessage.id !== 0) {

            const JWT_header = getBearerToken('ChatWindow message sent')
            if (isLoggedIn === true && JWT_header !== null) {
                getLastMessages(JWT_header)
                if (chatsData.some(el => el.chatId !== receivedMessage.chatId)) {
                    getChats(JWT_header)
                }
            }
            // if (!messageAreaHasFocus) {
            if (selectedChat === 0 ||
                selectedChat !== receivedMessage.chatId) {
                playSound()
            }
            return () => {
                source.cancel("axios fetch cancelled")
                setSessionResponse(prevSessionResponse => ({
                    ...prevSessionResponse,
                    message: `axios fetch cancelled`,
                    requestCancelled: true
                }))
            }
        }
    }, [receivedMessage])

    //rerender components to display new message sent from menu
    useEffect(() => {
        if (menuMessageSent.id !== 0) {
            const JWT_header = getBearerToken('ChatWindow menu message sent')
            if (isLoggedIn === true && JWT_header !== null) {
                getChats(JWT_header)
                getLastMessages(JWT_header)
                if (selectedChat === menuMessageSent.chatId) {
                    getMessagesFromChat(JWT_header, selectedChat)
                        .then(response => setMessages(response))
                }
            }
            console.log(menuMessageSent)
        }
    }, [menuMessageSent])


    useEffect(() => {
        if (chatIsDeleted !== 0) {
            const JWT_header = getBearerToken('ChatWindow menu message sent')
            if (isLoggedIn === true && JWT_header !== null) {
                getChats(JWT_header)
                setSelectedChat(0)
            }
            console.log(chatIsDeleted)
        }
        console.log(sessionResponse)
    }, [chatIsDeleted])

    const getUser = (JWT_header) => {
        axios.get(`${SECURED_API_PATH}/user`, {
            headers: {authorization: JWT_header},
            cancelToken: source.token
        })
            .then(response => {
                // console.log('ChatWindow.js getUser response.data', response.data)
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

    const getChats = (JWT_header) => {
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
                    time: Date.now(),
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
                                profilePictureColors={profilePictureColors}
                                setCurrentUser={setCurrentUser}/>

                    <MenuIcons profilePictureColors={profilePictureColors}
                               setMenuMessageSent={setMenuMessageSent}
                               currentUser={currentUser}
                               setIsLoggedIn={setIsLoggedIn}
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
                           setProfilePictureColors={setProfilePictureColors}
                           receivedMessage={receivedMessage}/>
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
                                  setMessageIsSent={setMessageIsSent}
                                  messagesPage={messagesPage}
                                  setMessagesPage={setMessagesPage}
                                  receivedMessage={receivedMessage}
                                  setChatIsDeleted={setChatIsDeleted}
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
