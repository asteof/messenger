import React from 'react';
import s from './ChatWindow.module.css'
import Messages from "./Messages/Messages";
import Dialogs from "./Dialogs/Dialogs";

function ChatWindow  (props)  {

    let dialogsData = [
        {id: 1, name: 'Voko'},
        {id: 2, name: 'kirpich from the dungeon'},
        {id: 3, name: 'Maria Larikova'},
        {id: 4, name: 'Danylo Mykhailov'}
    ]

    let messagesData = [
        {id: 1, text: 'Hui', fromMe: false},
        {id: 2, text: 'Pizda', fromMe: true},
        {id: 3, text: 'Skovoroda'},
        {id: 4, text: 'Ponimayu', fromMe: true},
        {id: 5, text: 'Ne ponimayu'},
        {id: 6, text: 'Spravedliva', fromMe: true},
        {id: 7, text: 'Ne spravedliva'},
        {id: 8, text: 'Sliva'},
        {id: 9, text: 'Sliva'},
        {id: 10, text: 'Sliva'},
        {id: 11, text: 'Sliva', fromMe: true},
        {id: 12, text: 'Sliva'},
        {id: 13, text: 'Sliva'}
    ]
    return (
        <div className={s.chatWindow}>
            <Dialogs dialogsData={dialogsData} />

            <Messages messagesData={messagesData}/>
        </div>
    )

}
// debugger
// messagesData={props.messagesData}

export default ChatWindow;