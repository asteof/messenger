import React from 'react';
import s from './messages.module.css'
import Message from "./Message/Message";
import {MessageConsumer} from "../../context/messageContext";


const Messages = (props) => {
    console.log(props)

    let messagesMap = props.messagesData.map(message =>
        <Message key={message.id} messageText={message.text} fromMe={message.fromMe}/>);

    return (
        <div className={s.messages}>
            {messagesMap}
        </div>
    )
}

export default Messages;