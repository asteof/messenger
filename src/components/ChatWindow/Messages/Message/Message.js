import React, {useEffect, useRef, useState} from 'react';
import style from './message.module.css'
import getFormattedTime from "../../../constants/getFormattedTime";
// import {setFalseBoolean, setTrueBoolean, toggleBoolean} from "../../../constants/ChangeDisplayStyle";

import optionIcon from '../../../../media/icons/options-white.svg'

const Message = (props) => {
    const {
        fromMe,
        messageId, messageText,
        dateChange,
        recipientName, senderName,
        selectedMessage, setSelectedMessage,
        sentAt, setShowMessageMenu, showMessageMenu,
        setMessageMenuData
    } = props
    const [messageSentAt, messageExactSentAt, messageSentDate] = getFormattedTime(sentAt)

    //if fromMe === true messageWrapClass is changed to display message in the right
    let messageWrapClass
    fromMe ? messageWrapClass = `${style.messageWrap} ${style.fromMe}`
        : messageWrapClass = style.messageWrap
    //State is used in the className attribute of message wrapper
    const [messageWrap, setMessageWrap] = useState(messageWrapClass)

    const openContext = () => {
        setShowMessageMenu(true)
        setMessageMenuData({
            fromMe, messageId, messageText,
            recipientName, senderName, sentAt
        })
        //selected message is marked to change it class
        setSelectedMessage(messageId)
    }
    //if current message is selected and message menu is open
    // its class changes to selected
    useEffect(() => {
        if (showMessageMenu === true && selectedMessage === messageId) {
            setMessageWrap(`${messageWrapClass} ${style.selected}`)
        } else {
            setMessageWrap(messageWrapClass)
        }
    }, [showMessageMenu, messageWrap, selectedMessage])

    return (
        <>
            {dateChange &&
            <div className={style.dateChangeWrap}>
                <div className={style.dateChange}>{messageSentDate}</div>
            </div>
            }

            <div className={messageWrap}>

                <div className={style.message}>
                    <div>
                        {messageText}
                    </div>
                    <div className={style.messageSentAtWrap}>
                        <div className={style.optionIconWrap} onClick={openContext}>
                            <img src={optionIcon} className={style.optionIcon} alt="Options"/>
                        </div>
                        <div className={style.messageSentAt}>
                            <span>{messageSentAt}</span>
                        </div>
                        <div className={style.messageExactSentAt}>
                            {messageExactSentAt}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Message