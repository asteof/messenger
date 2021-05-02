import React, {useState, useEffect} from 'react';
import axios from "axios";
import style from './test.module.css'
import {SECURED_API_PATH} from "../constants/API_PATH_DEFAULT";
import {getLocalWithExpiry} from "../Authorization/localStorage";

const ChatFetch = () => {

    const [chats, setChats] = useState([])

    useEffect(() => {
        const JWT = `Bearer ${getLocalWithExpiry('token')}`

        console.log(JWT)

        axios.get(`${SECURED_API_PATH}/chat`, {
            headers: {
                authorization: JWT
            }
        })
            .then(response => {
                console.log(response.data)
                setChats(response.data)
            })
            .catch(error => console.log(error))
    }, [])


    let chatsMap = chats.map(chat=>
    <div key={chat.chatId} className={style.hi}>
        <p className={style.bold}>Chat ID: <span className={style.redSpan}>{chat.chatId}</span></p>
        <p className={style.bold}>Chat participants:</p>
        {chat.chatUsers.map(user=><p key={user.id}>Username: <span className={style.redSpan}>{user.username}</span>, ID: {user.id}</p>)}
    </div>
    )

    return (
        <div className={style.wrap}>
           <h2>Chats for logged in user:</h2>
            {chatsMap}
        </div>
    )
}

export default ChatFetch