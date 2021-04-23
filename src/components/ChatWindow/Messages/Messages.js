import React from 'react';
import style from './messages.module.css'
import Message from "./Message/Message";
// import {MessageConsumer} from "../../context/messageContext";


const Messages = (props) => {
    console.log(props)

    let messagesMap = props.messagesData.map(message =>
        <Message key={message.id} messageText={message.text} fromMe={message.fromMe}/>);

    return (
            <div className={style.messagesWindow}>
                <div className={style.messages}>
                    {messagesMap}
                </div>

                <div className={style.messageAreaWrap}>
                    <textarea
                        className={style.messageArea}
                        cols="30"
                        rows="3"
                        wrap='hard'
                        maxLength='800'
                        placeholder='Write a message...'
                        autoFocus
                    >
                    </textarea>
                </div>
            </div>
    )
}

export default Messages;