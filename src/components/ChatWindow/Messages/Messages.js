import React, {useEffect, useState} from 'react';
import style from './Messages.module.css'
import Message from "./Message/Message";


const Messages = (props) => {
    const {chatIsSelected, messages, currentUser} = props
    let date = new Date()
    const [newMessage, setNewMessage] = useState({
        id: 0,
        text: '',
        senderName: currentUser.username
    })

    let messagesElement
    let messageAreaElement


    const messageInput = event => {
        // console.log('messageInput method called')
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

            messages.push(newMessage)

            setNewMessage(prevNewMsg => ({
                ...prevNewMsg,
                text: ''
            }))
        }

        messageAreaElement.focus()
        messageAreaElement.value = ''
        console.log(newMessage)
        console.log("Messages.js current user",currentUser)
    }


    useEffect(() => {
        if (chatIsSelected) {
            messagesElement = document.getElementById('messages')
            messagesElement.scrollTo({left: 0, top: (messagesElement.scrollHeight), behavior: "smooth"})
        }
        // messageAreaElement.addEventListener('keydown', ()=>sendByEnter())
    }, [newMessage.id])


    let messagesMap = messages.map(message => {
        ///sets fromMe to true if sender name equal to current username
        message.fromMe = message.senderName === currentUser.username;
        //sets false otherwise
        return <Message
            key={message.id}
            messageText={message.text}
            fromMe={message.fromMe}
            recipientName={message.recipientName}
            senderName={message.senderName}
            sentAt={message.sentAt}
        />
    });

    if (chatIsSelected) {
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
    } else {
        return (
            <div className={style.selectChatWrap}>
                <div className={style.selectChat}>
                    Select a chat to start messaging
                </div>
            </div>
        )
    }
}

export default Messages;


// if (e.which === 13 && !e.shiftKey)
// {
//
// }
