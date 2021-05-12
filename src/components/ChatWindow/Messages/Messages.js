import React, {useEffect, useRef, useState} from 'react';
import style from './Messages.module.css'
import Message from "./Message/Message";
import ChatProfileBar from "./ChatProfileBar/ChatProfileBar";
import axios from "axios";
import {SECURED_API_PATH} from "../../constants/API_PATH_DEFAULT";
import MessageMenu from "./Message/MessageMenu/MessageMenu";
import getMessagesFromChat from "../../constants/getMessagesFromChat";
import {getToken} from "../../constants/getToken";

const Messages = (props) => {
    const {
        selectedChat, messages, setMessages,
        currentUser, secondChatUser,
        messageIsSent, setMessageIsSent,
        messageChanged, setMessageChanged,
        profilePictureColors, setIsLoggedIn
    } = props
    const selectedRef = useRef(0)
    const messageAreaRef = useRef(null)
    const messagesRef = useRef(null)
    const [showMessageMenu, setShowMessageMenu] = useState(false)
    const [selectedMessage, setSelectedMessage] = useState()

    const [newMessage, setNewMessage] = useState({
        text: '',
        recipientId: secondChatUser.id,
    })
    const [messageMenuData, setMessageMenuData] = useState({})

    const messageInput = event => {
        setNewMessage(prevNewMsg => ({
            ...prevNewMsg,
            text: event.target.value,
            recipientId: secondChatUser.id
        }))
    }

    const addMessage = event => {
        event.preventDefault()

        if (newMessage.text !== '') {
            console.log('newMessage', newMessage)
            sendMessage()
        }

        setNewMessage(prevNewMsg => ({
            ...prevNewMsg,
            text: ''
        }))
        messageAreaRef.current.focus()
        messageAreaRef.current.value = ''
        // console.log("Messages.js current user", currentUser)
    }

    const sendMessage = () => {
        console.log('newMessage', newMessage)

        const JWT_header = getToken()
        const cancelToken = axios.CancelToken
        const source = cancelToken.source()
        if (JWT_header !== null) {
            axios.post(
                `${SECURED_API_PATH}/messages`,
                {
                    text: newMessage.text,
                    recipientId: newMessage.recipientId
                },
                {
                    headers: {authorization: JWT_header},
                    cancelToken: source.token
                })
                .then(response => {
                    console.log(response)
                    if (response.status === 200) {
                        messages.unshift(response.data)
                        //every time a response from server is received, messageIsSent changes time
                        //which makes chat component rerender and display new message preview
                        setMessageIsSent(prevSent => ({
                            ...prevSent,
                            time: response.data.sentAt,
                            isSent: true
                        }))
                    }
                })
                .catch(error => {
                    console.log(error)
                    setMessageIsSent(prevSent => ({
                        ...prevSent,
                        time: Date.now(),
                        isSent: false
                    }))
                })
        }
    }

    const sendByEnter = event => {
        //fires onKeyDown event for message area
        //sends message if pressed key is enter
        //if enter key is pressed while holding shift - add new line
        if ((event.shiftKey === false && event.code === "Enter")
            || (event.shiftKey === false && event.code === "NumpadEnter")) {
            addMessage(event)
        }
    };

    const scrollToBottom = () => {
        if (selectedRef.current !== 0) {
            messagesRef.current.scrollTo({left: 0, top: (messagesRef.current.scrollHeight), behavior: "smooth"})
            console.log('messagesMap', messagesMap)
            messageAreaRef.current.focus()
        }
    }
    // console.log("Messages.js current user", currentUser)
    // console.log("Messages.js secondChatUser", secondChatUser)
    // console.log('Messages.js selectedChat', selectedChat)

    //even the selectedRef and selectedChat
    useEffect(() => {
        console.log(`selectedChat: ${selectedChat},
         selectedRef: ${selectedRef.current},
         currentUser:`, currentUser,
            'secondUser:', secondChatUser)

        if (selectedChat !== selectedRef.current) {
            selectedRef.current = selectedChat
        }
    }, [selectedRef.current, selectedChat])

    //scroll to the bottom message when opening chat
    useEffect(() => {
        // console.log(`selectedChat: ${selectedChat},
        //  selectedRef: ${selectedRef.current},
        //  currentUser:`, currentUser,
        //     'secondUser:', secondChatUser)

        scrollToBottom()
    }, [selectedRef.current])

    //scroll to the bottom message after new message was sent
    useEffect(() => {
        scrollToBottom()
    }, [messageIsSent])


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
            messageId={message.id}
            messageText={message.text}
            fromMe={message.fromMe}
            dateChange={message.dateChange}
            recipientName={message.recipientName}
            senderName={message.senderName}
            sentAt={message.sentAt}
            showMessageMenu={showMessageMenu}
            setShowMessageMenu={setShowMessageMenu}
            setMessageMenuData={setMessageMenuData}
            selectedMessage={selectedMessage}
            setSelectedMessage={setSelectedMessage}
        />
    }).reverse();

    return (
        <div className={style.messageSection}>
            <div className={style.chatProfileBarWrap}>
                <ChatProfileBar secondChatUser={secondChatUser}
                                profilePictureColors={profilePictureColors}
                                selectedChat={selectedChat}/>
            </div>

            <div className={style.messages} ref={messagesRef}>
                {messagesMap}
            </div>


            {/*messageId={messageId} messageText={messageText} fromMe={fromMe}*/}
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
                        ref={messageAreaRef}
                        onChange={messageInput}
                        onKeyDown={sendByEnter}
                    >
                    </textarea>
                    <button type='submit' className={style.sendBtn}>Send</button>
                </form>
            </div>

            {showMessageMenu &&
            <MessageMenu
                messageMenuData={messageMenuData}
                setShowMessageMenu={setShowMessageMenu}
                setSelectedMessage={setSelectedMessage}
                secondChatUser={secondChatUser}
                setMessageChanged={setMessageChanged}/>
            }

        </div>
    )
}

export default Messages;