import React, {useState, useEffect} from 'react';
import axios from "axios";
import style from './test.module.css'
import {SECURED_API_PATH} from "../constants/API_PATH_DEFAULT";
import {getLocalWithExpiry} from "../Authorization/localStorage";

const SimpleChatFetch = (props) => {

    const [chats, setChats] = useState([])
    const newJWT = props.newJWT
    let chatsMap

    const fetch = () => {
        let JWT_header
        if (newJWT !== "") {
            JWT_header = `Bearer ${newJWT}`
            console.log(`SimpleChatFetch.js ${JWT_header}`)
        }

        axios.get(`${SECURED_API_PATH}/chat`, {
            headers: {
                authorization: JWT_header
            }
        })
            .then(response => {
                console.log(response.data)
                setChats(response.data)
            })
            .catch(error => console.log(error, error.response))

    }

    useEffect(() => {
        console.log('SimpleChatFetch.js uf called')
    }, [chats])

    chatsMap = chats.map(chat =>
        <div key={chat.chatId} className={style.hu2}>
            <p>Chat ID: <span className={style.redSpan}>{chat.chatId}</span></p>
            <p>Chat participants:</p>
            {chat.chatUsers.map(user => <p key={user.id}><span className={style.redSpan}>{user.username}</span>,
                ID: {user.id}</p>)}
        </div>)


    return (
        <div className={style.wrap}>
            <div className={style.hint}>Click "Get chats" to fetch chats from temporary JWT</div>
            <p>Chats for this user:</p>
            <div className={style.hi2}>
            {chatsMap}
            </div>
            <button onClick={fetch} className={style.submitBtn}>Get chats</button>
            <div className={style.extraSmall}>{JSON.stringify(newJWT)}</div>
        </div>
    )
}

export default SimpleChatFetch