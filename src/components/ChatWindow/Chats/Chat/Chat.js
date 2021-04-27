import React, {useEffect, useState} from 'react';
import style from './chat.module.css'
import * as SockJS from 'sockjs-client'
import * as Stomp from '@stomp/stompjs'
import {API_PATH} from "../../../constants/API_PATH_DEFAULT";

const Chat = (props) => {

    let chatClass = style.chat;
    const chatClassActive = `${style.chat} ${style.active}`;

    const {id, username, selectedDialog, setSelectedDialog} = props

    const selectDialog = () => {
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

        console.log(`id ${id}`)
        console.log(`name ${JSON.stringify(username)}`)
        console.log(`selectedOption ${selectedDialog}`)
        console.log(`setSelectedOption ${selectedDialog}`)
        setSelectedDialog(id)
    }

    return (
        //if the selectedDialog matches with dialog id it displays active CSS class
        //otherwise it displays usual dialog class
        <div className={selectedDialog === id ? chatClassActive : chatClass}
             onClick={selectDialog}>
            {JSON.stringify(username)}
        </div>
    )
}

export default Chat