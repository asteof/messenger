import React from 'react';
import style from './Chats.module.css'
import Chat from "./Chat/Chat";

function Chats(props) {

    /* selectedChat takes the id of the dialog and passes it to dialog components as props
   clicking on any chosen dialog sets the selectedChat prop to dialog id
   if the selectedChat matches with dialog id it displays active CSS class
   otherwise it displays usual dialog class */

    const {
        chatsData,
        currentUser,
        receivedMessage,
        setSecondChatUser,
        setIsLoggedIn,
        setMessages, lastMessages,
        selectedChat, setSelectedChat,
        profilePictureColors, setProfilePictureColors
    } = props
    // console.log('Chats.js current user', currentUser)

    const closeChat = event => {
        if (event.code ==='Escape'){
            setSelectedChat(0)
        }
    }


    let chats = chatsData
        .sort((a, b) => {
            const timeA = a.modifyDate;
            const timeB = b.modifyDate;
            return timeB - timeA
        })
        .map(chat => {
                //get second user of chat to display his name
                //id of that user != id of current user
                const secondUser = chat.chatUsers.find(user => user.id !== currentUser.id);

                const lastMessage = lastMessages.find(message => message.chatId === chat.chatId);

                // console.log(lastMessage)
                return (
                    <Chat key={chat.chatId}

                          secondUser={secondUser}
                          currentUser={currentUser}
                          setSecondChatUser={setSecondChatUser}
                          chatId={chat.chatId}
                          selectedChat={selectedChat}
                          setSelectedChat={setSelectedChat}
                          setIsLoggedIn={setIsLoggedIn}
                          setMessages={setMessages}
                          receivedMessage={receivedMessage}
                          lastMessage={lastMessage}
                          profilePictureColors={profilePictureColors}
                          setProfilePictureColors={setProfilePictureColors}
                    />
                )
            }
        )
    // console.log(chats)

    return (
        <div className={style.chats} tabIndex='0' onKeyDown={closeChat}>
            {chats}
        </div>
    )
}

export default Chats;