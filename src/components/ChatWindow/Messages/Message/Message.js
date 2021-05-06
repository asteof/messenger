import React, {useEffect, useRef, useState} from 'react';
import style from './message.module.css'
import getFormattedTime from "../../../constants/getFormattedTime";
import {setFalseBoolean, setTrueBoolean, toggleBoolean} from "../../../constants/ChangeDisplayStyle";

const Message = (props) => {
    const {fromMe, messageText, dateChange, recipientName, senderName, sentAt} = props
    const [messageSentAt, messageExactSentAt, messageSentDate] = getFormattedTime(sentAt)

    //if fromMe === true message class is changed to display message in the right
    let messageWrapClass

    fromMe ? messageWrapClass = `${style.messageWrap} ${style.fromMe}`
        : messageWrapClass = style.messageWrap

    return (
        <>
            {dateChange &&
            <div className={style.dateChangeWrap}>
                <div className={style.dateChange}>{messageSentDate}</div>
            </div>
            }

            <div className={messageWrapClass}>

                <div className={style.message}>
                    <div>
                        {messageText}
                    </div>
                    <div className={style.messageSentAtWrap}>
                        <div className={style.messageSentAt}>
                            <span>{messageSentAt}</span>
                        </div>
                        <div className={style.messageExactSentAt}>{messageExactSentAt}</div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Message