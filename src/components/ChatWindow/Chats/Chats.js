import React, {useState} from 'react';
import style from './Chats.module.css'
import Chat from "./Chat/Chat";

function Chats(props) {

    /* selectedChat takes the id of the dialog and passes it to dialog components as props
   clicking on any chosen dialog sets the selectedChat prop to dialog id
   if the selectedChat matches with dialog id it displays active CSS class
   otherwise it displays usual dialog class */
    const [selectedChat, setSelectedChat] = useState(0)

    const {chatsData, currentUser, setIsLoggedIn, setMessagesDat, setChatIsSelected} = props
    // console.log(currentUser)

    let chats = chatsData.map(chat => {
        //get second user of chat
        //id of that user != id of current user
        const secondUser = chat.chatUsers.find(user => user.id !== currentUser.id);
        // const a = currentUser.usename.charAt(0)
        // console.log(a)
        // console.log('Chats.js secondUser',secondUser)

            return (
                <Chat
                    key={chat.chatId}
                    secondUser={secondUser}
                    chatId={chat.chatId}
                    selectedChat={selectedChat}
                    setSelectedChat={setSelectedChat}
                    setChatIsSelected={setChatIsSelected}
                    setIsLoggedIn={setIsLoggedIn}
                    setMessagesDat={setMessagesDat}
                />
            )
        }
    )

    return (
        <div className={style.chats}>
            {chats}
        </div>
    )
}

export default Chats;