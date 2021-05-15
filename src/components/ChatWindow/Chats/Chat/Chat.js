import React, {useEffect, useState} from 'react';
import style from './chat.module.css'
import * as SockJS from 'sockjs-client'
import {Client} from '@stomp/stompjs'
import {API_PATH} from "../../../constants/API_PATH_DEFAULT";
import getFormattedTime from "../../../constants/getFormattedTime";
import RandomColor from "../../../constants/RandomColor";
import getMessagesFromChat from '../../../constants/getMessagesFromChat'
import {getBearerToken} from "../../../constants/getBearerToken";

const Chat = (props) => {
    const {
        chatId, setReceivedMessage, receivedMessage,
        secondUser, setSecondChatUser, currentUser,
        selectedChat, setSelectedChat,
        setIsLoggedIn, setMessages, lastMessage,
        profilePictureColors, setProfilePictureColors
    } = props

    const [messageTime, setMessageTime] = useState(null)
    let chatClass = style.chat;     //ordinary chat style
    const chatClassActive = `${style.chat} ${style.active}`;    //chat style when selected

    const selectChat = async () => {
        const JWT_header = getBearerToken()
        if (JWT_header !== null) {
            try {
                const messages = await getMessagesFromChat(JWT_header, chatId)
                if (messages !== null) {
                    setMessages(messages)
                } else {
                    setIsLoggedIn(false)
                    localStorage.removeItem('token')
                }
                console.log('Chat.js messages array', messages)
            } catch (e) {
                console.log(e)
            }
        } else {
            setIsLoggedIn(false)
            localStorage.removeItem('token')
        }

        setSecondChatUser(secondUser)
        // console.log(secondUser)
        setSelectedChat(chatId)
    }



    useEffect(() => {
        setProfilePictureColors(prevColors => ({
            ...prevColors,
            [chatId]: RandomColor()
        }))
        // console.log(`Chat.js currentUser ${chatId}`, currentUser)
    }, [])

    useEffect(() => {
        const [messageSentAt] = getFormattedTime(lastMessage.sentAt)
        setMessageTime(messageSentAt)
    }, [lastMessage])

    useEffect(() => {
        if (receivedMessage.id !== 0)
            console.log(receivedMessage)
    }, [receivedMessage])

    return (
        //if the selectedDialog matches with dialog id it displays active CSS class
        //otherwise it displays usual dialog class
        <div className={selectedChat === chatId ? chatClassActive : chatClass}
             onClick={selectChat}>
            <div className={style.profilePicture}
                 style={profilePictureColors[chatId]}>
                {secondUser &&
                <span className={style.initials}>
                        {((secondUser.firstname || '').charAt(0) || '').toUpperCase()}
                    {((secondUser.lastname || '').charAt(0) || '').toUpperCase()}
                    </span>}
            </div>

            <div className={style.chatInfo}>
                <div className={style.chatUsername}>{secondUser.username}</div>
                <div className={style.lastMessageWrap}>
                    {lastMessage.senderName === currentUser.username ?
                        <span className={style.lastMessage}>
                            <span className={style.lastMessageFromMe}>You:</span> {lastMessage.text}
                        </span> :
                        <span className={style.lastMessage}>
                            {lastMessage.text}
                        </span>
                    }
                    <span className={style.messageTime}>{messageTime || ''}</span>
                </div>
            </div>

        </div>
    )
}

export default Chat