import React, {useEffect, useState} from 'react';
import style from './chat.module.css'
// import * as SockJS from 'sockjs-client'
// import * as Stomp from '@stomp/stompjs'
import {API_PATH, SECURED_API_PATH} from "../../../constants/API_PATH_DEFAULT";
import {getLocalWithExpiry} from "../../../Authorization/localStorage";
import axios from "axios";
import {setFalseBoolean} from "../../../constants/ChangeDisplayStyle";

const Chat = (props) => {

    let chatClass = style.chat;
    const chatClassActive = `${style.chat} ${style.active}`;

    const {
        chatId,
        secondUser,
        selectedChat,
        setSelectedChat,
        setChatIsSelected,
        setIsLoggedIn,
        setMessagesDat
    } = props

    const selectChat = () => {

        const JWT = getLocalWithExpiry('token')
        let JWT_header = ''
        if (JWT !== null && JWT !== '') {
            JWT_header = `Bearer ${JWT}`
        } else if (JWT === null || JWT === '') {
            if (JWT === '') {
                console.log(JWT)
                localStorage.removeItem('token')
            }
            setIsLoggedIn(false)
        }
        if (JWT_header !== '') {
            axios.get(`${SECURED_API_PATH}/messages/chat/${chatId}`, {
                headers: {
                    authorization: JWT_header
                },
                params: {
                    size: 50,
                    page: 0
                }
            })
                .then(response => {
                    console.log(response.data)
                    setMessagesDat(response.data)
                })
                .catch(error => {
                    console.log(error, error.response)
                })
        }

        // let socket = new WebSocket()
        // let socket = new SockJS(`${API_PATH}/ws`)
        // let stompClient = Stomp.Stomp.over(socket)
        //
        // // stompClient.connect({}, function (frame) {
        // //     stompClient.setConnected(true);
        // // });
        //
        // stompClient.subscribe('/topic/messages/user/1', function (msg) {
        //     console.log(msg);
        // });
        //
        // stompClient.send("/app/chat", {}, JSON.stringify({'text' : "hello kirill", 'senderId' : 1, 'recipientId': 2}));

        console.log(`id ${chatId}
        selectedOption ${selectedChat}
        setSelectedOption ${selectedChat}`, '\nsecondUser', secondUser)
        setSelectedChat(chatId)
        if (selectedChat === 0) {
            setFalseBoolean(setChatIsSelected)
        }
    }

    return (
        //if the selectedDialog matches with dialog id it displays active CSS class
        //otherwise it displays usual dialog class
        <div className={selectedChat === chatId ? chatClassActive : chatClass}
             onClick={selectChat}>
            {secondUser.username}
        </div>
    )
}

export default Chat