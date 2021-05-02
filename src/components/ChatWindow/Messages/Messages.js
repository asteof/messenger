import React, {useEffect, useState} from 'react';
import style from './Messages.module.css'
import Message from "./Message/Message";
// import {MessageConsumer} from "../../context/messageContext";


const Messages = (props) => {
    // console.log(props)
    const {messagesData} = props
    let date = new Date()
    const [newMessage, setNewMessage] = useState({
        id: 0,
        text: '',
        fromMe: true
    })

    let messagesElement
    let messageAreaElement

    const messageInput = event => {
        console.log('messageInput method called')
        setNewMessage(prevNewMsg => ({
            ...prevNewMsg,
            text: event.target.value
        }))
    }

    const addMessage = (event) => {
        event.preventDefault()

        messageAreaElement = document.getElementById('messageArea')

        if (newMessage.text !== '') {
            setNewMessage(prevNewMsg => ({
                ...prevNewMsg,
                id: date.getTime()
            }))

            messagesData.push(newMessage)

            setNewMessage(prevNewMsg => ({
                ...prevNewMsg,
                text: ''
            }))
        }

        messageAreaElement.focus()
        messageAreaElement.value = ''
    }


    useEffect(() => {
        // console.log(newMessage)
        messagesElement = document.getElementById('messages')
        // messageAreaElement.addEventListener('keydown', ()=>sendByEnter())
        messagesElement.scrollTo({left: 0, top: (messagesElement.scrollHeight), behavior: "smooth"})
    }, [newMessage.id])


    let messagesMap = messagesData.map(message =>
        <Message key={message.id} messageText={message.text} fromMe={message.fromMe}/>);

    return (
        <div className={style.messagesWindow}>
            <div className={style.messages} id='messages'>
                {messagesMap}
            </div>

            <div className={style.messageAreaWrap}>
                <form onSubmit={addMessage} className={style.messageForm}>
                    <textarea
                        className={style.messageArea}
                        id='messageArea'
                        cols="30"
                        rows="3"
                        wrap='hard'
                        maxLength='800'
                        placeholder='Write a message...'
                        autoFocus

                        onChange={messageInput}
                    >
                    </textarea>
                    <button type='submit' className={style.sendBtn}>Send</button>

                </form>
            </div>
        </div>
    )
}

export default Messages;


// if (e.which === 13 && !e.shiftKey) {
//
// }
