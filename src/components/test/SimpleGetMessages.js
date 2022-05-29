import React, {useState, useEffect} from 'react';
import axios from "axios";
import style from './test.module.css'
import {SECURED_API_PATH} from "../../constants/API_PATH_DEFAULT";

const SimpleGetMessages = (props) => {

    const [testMessages, setTestMessages] = useState([])
    const [id, setId] = useState(0)
    const newJWT = props.newJWT

    const fetch = () => {
        let JWT_header
        if (newJWT !== "") {
            JWT_header = `Bearer ${newJWT}`
            console.log(`SimpleChatFetch.js ${JWT_header}`)
        }

        axios.get(`${SECURED_API_PATH}/messages/chat/${id}`, {
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
                setTestMessages(response.data)
            })
            .catch(error => console.log(error, error.response))

    }

    useEffect(() => {
        console.log('SimpleGetMessages.js uf called')
    }, [testMessages])

    let messageMap = testMessages.map(message =>
        <div key={message.id}>
            <p>id: <span className={style.redSpan}>{message.id}</span></p>
            <p>Text: {message.text}</p>
            <p>sender <span className={style.redSpan}>{message.senderName}</span></p>
            <p>recipient <span className={style.redSpan}>{message.recipientName}</span></p>
        </div>)


    return (
        <div className={style.wrap}>
            <input type="number" onChange={e=>setId(e.target.value)} className={style.inputField}/>
            <div className={style.hint}>Click "Get messages" to fetch chats from specified chat using temporary JWT</div>
            <p>Messages for chat {id}:</p>
            <div className={style.flex}>
                {messageMap}
            </div>
            <button onClick={fetch} className={style.submitBtn}>Get messages</button>
            <div className={style.extraSmall}>{JSON.stringify(newJWT)}</div>
        </div>
    )
}

export default SimpleGetMessages;
