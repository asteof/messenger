import React, {useState} from 'react';
import style from './Chats.module.css'
import Chat from "./Chat/Chat";

function Chats(props) {

    /* selectedChat takes the id of the dialog and passes it to dialog components as props
    clicking on any chosen dialog sets the selectedChat prop to dialog id
    if the selectedChat matches with dialog id it displays active CSS class
    otherwise it displays usual dialog class */
    const [selectedChat, setSelectedChat] = useState(0)

    const chatsData = props.chatsData

    let chats = chatsData.map((chat) => (
            <Chat
                key={chat.chatId}
                username={chat.chatUsers}
                id={chat.chatId}
                selectedDialog={selectedChat}
                setSelectedDialog={setSelectedChat}
            />
        )
    )

    return (
        <div className={style.chats}>
            {chats}

        </div>
    )
}

export default Chats;


// {/*<Chat name={'Voko'} id={1} isActive={1}/>*/}
//             {/*<Chat name={'kirpich from the dungeon'} id={2}/>*/}
//             {/*<Chat name={'Maria Larikova'} id={3}/>*/}
//             {/*<Chat name={'Danylo Mykhailov'} id={4}/>*/}
//             {/*hui hui hui*/}