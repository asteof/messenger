import React, {useEffect, useState} from 'react';
import style from './chat.module.css'
import * as SockJS from 'sockjs-client'
import * as Stomp from '@stomp/stompjs'
import {API_PATH} from "../../../constants/API_PATH_DEFAULT";
import {getLocalWithExpiry} from "../../../Authorization/localStorage";

const Chat = (props) => {

    let chatClass = style.chat;
    const chatClassActive = `${style.chat} ${style.active}`;

    const {chatId, secondUser, selectedChat, setSelectedChat, setIsLoggedIn} = props

    const selectChat = () => {

        let JWT = getLocalWithExpiry('token')
        if (JWT === null || JWT === '') {
            if (JWT === '') {
                console.log(JWT)
                localStorage.removeItem('token')
            }
            setIsLoggedIn(false)
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