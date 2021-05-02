import React from 'react';
import style from './message.module.css'

const Message = (props) => {
    const {key, fromMe, messageText, recipientName, senderName, sentAt} = props

    //if fromMe === true message class is changed to display message in the right
    let messageWrapClass

    fromMe ? messageWrapClass = `${style.messageWrap} ${style.fromMe}`
        : messageWrapClass = style.messageWrap

    return (
        // <MessageConsumer>
        //     {messages => {
        //         const renderMessages = messages =>  {
        //             return messages.map(message =>)
        //         }
        //         return (
        <div className={messageWrapClass}>
            <div className={style.message}>
                {messageText}
                <div className={style.messageTime}>{sentAt}</div>
            </div>

        </div>
        //         )
        //     }}
        // </MessageConsumer>
    )
}
export default Message