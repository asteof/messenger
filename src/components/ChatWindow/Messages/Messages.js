import React, {useEffect, useRef, useState} from 'react';
import style from './Messages.module.css'
import Message from "./Message/Message";
import ChatProfileBar from "./ChatProfileBar/ChatProfileBar";
import axios from "axios";
import {SECURED_API_PATH} from "../../constants/API_PATH_DEFAULT";
import MessageMenu from "./MessageMenu/MessageMenu";
import {getBearerToken} from "../../constants/getBearerToken";
import getMessagesFromChat from "../../constants/getMessagesFromChat";
import loadMessage from '../../../media/icons/load-message.svg'

const Messages = (props) => {
    const {
        selectedChat, messages,
        currentUser, secondChatUser,
        messageIsSent, setMessageIsSent,
        messagesPage, setMessagesPage,
        setMessageChanged, receivedMessage,
        profilePictureColors, setChatIsDeleted
    } = props
    const selectedRef = useRef(0)
    const messageAreaRef = useRef(null)
    const messagesRef = useRef(null)
    const [showMessageMenu, setShowMessageMenu] = useState(false)
    const [selectedMessage, setSelectedMessage] = useState()

    const [newMessage, setNewMessage] = useState({
        text: ''
    })
    const [messageMenuData, setMessageMenuData] = useState({})

    const messageInput = event => {
        setNewMessage(prevNewMsg => ({
            ...prevNewMsg,
            text: event.target.value
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

        const JWT_header = getBearerToken()
        const cancelToken = axios.CancelToken
        const source = cancelToken.source()
        if (JWT_header !== null) {
            axios.post(
                `${SECURED_API_PATH}/messages`,
                {
                    text: newMessage.text,
                    recipientId: secondChatUser.id
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
                            id: response.data.id,
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

    const scrollToBottom = (str) => {
        if (selectedChat !== 0) {
            messagesRef.current.scrollTo({left: 0, top: (messagesRef.current.scrollHeight), behavior: 'smooth'})
            console.log(`messagesMap ${str}`, messagesMap)
            messageAreaRef.current.focus()
        }
    }

    const scrollToTop = () => {
        if (selectedRef.current !== 0) {
            messagesRef.current.scrollTo(0, -messagesRef.current.scrollHeight)
            console.log(`messages load more`, messages)
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
    }, [selectedChat])

    //scroll to the bottom message when opening chat
    useEffect(() => {
        // console.log(`selectedChat: ${selectedChat},
        //  selectedRef: ${selectedRef.current},
        //  currentUser:`, currentUser,
        //     'secondUser:', secondChatUser)
        if (selectedChat !== 0)
            scrollToBottom('chat opened')
    }, [selectedChat])

    // scroll to the bottom message after new message was sent
    useEffect(() => {
        if (messageIsSent.id !== 0) {
            scrollToBottom('message sent')
        }
    }, [messageIsSent])

    useEffect(() => {
        if (receivedMessage.id !== 0 && selectedChat === receivedMessage.chatId) {
            messages.unshift(receivedMessage)
            scrollToBottom('message received')
        }
    }, [receivedMessage])

    useEffect(() => {
        scrollToTop()
    }, [messagesPage])

    const loadMore = async () => {
        const JWT_header = getBearerToken()
        if (JWT_header !== null) {
            try {
                const newMessagesPage = await getMessagesFromChat(JWT_header, selectedChat, messagesPage, 'messages')
                if (newMessagesPage !== null) {
                    newMessagesPage.forEach(newMsg => messages.push(newMsg))
                    setMessagesPage(prevPage => prevPage + 1)
                }
                console.log('Chat.js newMessagesPage', newMessagesPage)
                console.log('Chat.js newMessages array', messages)
            } catch (e) {
                console.log(e)
            }
        }
        // if (newMessagesPage !== null) {
        //     messages.push(newMessagesPage)
        // }
    }

    for (let i = 0; i < messages.length - 1; i++) {
        const messageDate_current = new Date(messages[i].sentAt).getDate()
        const messageDate_next = new Date(messages[i + 1].sentAt).getDate()
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
            changedAt={message.changedAt}
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
                <ChatProfileBar secondUser={secondChatUser}
                                chatId={selectedChat}
                                setChatIsDeleted={setChatIsDeleted}
                                profilePictureColors={profilePictureColors}/>
            </div>

            <div className={style.messages} ref={messagesRef}>
                {(messages.length >= 60 && messages.length % 60 === 0) &&
                <div className={style.loadMoreWrap}>
                    <button className={style.loadMoreBtn}
                            onClick={loadMore}>
                        <img src={loadMessage}
                             className={style.loadIcon}
                             alt="Load messages"/>Load more
                    </button>
                </div>}
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
                setMessageChanged={setMessageChanged}
                setMessagesPage={setMessagesPage}/>
            }

        </div>
    )
}

export default Messages;