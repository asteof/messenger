import React, {useEffect, useRef, useState} from 'react';
import style from './Messages.module.css'
import Message from "./Message/Message";
import ChatProfileBar from "./ChatProfileBar/ChatProfileBar";


const Messages = (props) => {
    const {
        selectedChat, messages,
        currentUser, secondChatUser,
        profilePictureColors
    } = props
    const selectedRef = useRef(0)
    const inputRef = useRef(null)

    let date = new Date()
    const [newMessage, setNewMessage] = useState({
        id: 0,
        text: '',
        senderName: currentUser.username,
        sentAt: date.getTime()
    })


    const messageInput = event => {
        // console.log('messageInput method called')
        setNewMessage(prevNewMsg => ({
            ...prevNewMsg,
            text: event.target.value
        }))
    }

    const addMessage = (event) => {
        event.preventDefault()

        let messageAreaElement = document.getElementById('messageArea')

        if (newMessage.text !== '') {
            setNewMessage(prevNewMsg => ({
                ...prevNewMsg,
                id: date.getTime(),
                senderName: currentUser.username,
                sentAt: date.getTime()
            }))
            messages.unshift(newMessage)
        }

        messageAreaElement.focus()
        messageAreaElement.value = ''
        console.log(newMessage)
        console.log("Messages.js current user", currentUser)
    }
    // console.log("Messages.js current user", currentUser)
    console.log("Messages.js secondChatUser", secondChatUser)

    // console.log('Messages.js selectedChat', selectedChat)

    useEffect(() => {
        console.log(`small uf call
        selectedChat: ${selectedChat}, selectedRef: ${selectedRef.current}`)
        if (selectedChat !== selectedRef.current) {
            selectedRef.current = selectedChat
        }
    }, [selectedRef.current, selectedChat])

    useEffect(() => {
        console.log('Messages.js selectedChat useEffect', selectedChat)
        console.log(`big uf call
        selectedChat: ${selectedChat}, selectedRef: ${selectedRef.current}`)

        if (selectedRef.current !== 0) {
            const messagesElement = document.getElementById('messages')
            messagesElement.scrollTo({left: 0, top: (messagesElement.scrollHeight), behavior: "smooth"})
            console.log('messagesMap', messagesMap)
            inputRef.current.focus()
        }
    }, [selectedRef.current])

    useEffect(() => {
        if (selectedRef.current !== 0) {
            const messagesElement = document.getElementById('messages')
            messagesElement.scrollTo({left: 0, top: (messagesElement.scrollHeight), behavior: "smooth"})
            console.log('messagesMap', messagesMap)
            inputRef.current.focus()
        }
    }, [newMessage.id])

    for (let i = 0; i < messages.length - 1; i++) {
        const messageDate_current = new Date(messages[i].sentAt).getDate()
        const messageDate_next = new Date(messages[i + 1].sentAt).getDate()
        // console.log(messageDate_current)
        // console.log(messageDate_next)
        if (messageDate_current > messageDate_next) {
            messages[i].dateChange = true
        }
    }

    let messagesMap = messages.map((message) => {
        ///sets fromMe to true if sender name equal to current username
        message.fromMe = message.senderName === currentUser.username;
        //sets false otherwise
        // console.log(messages)
        return <Message
            key={message.id}
            messageText={message.text}
            fromMe={message.fromMe}
            dateChange={message.dateChange}
            recipientName={message.recipientName}
            senderName={message.senderName}
            sentAt={message.sentAt}
        />
    }).reverse();

    return (
        <div className={style.messageSection}>
            <div className={style.chatProfileBarWrap}>
                <ChatProfileBar secondChatUser={secondChatUser}
                                profilePictureColors={profilePictureColors}
                                selectedChat={selectedChat}/>
            </div>

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
                        ref={inputRef}
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


// if (e.which === 13 && !e.shiftKey)
// {
//
// }