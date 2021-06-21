import React, {useEffect, useState} from 'react';
import style from './message.module.css'
import getFormattedTime from "../../../constants/getFormattedTime";
// import {setFalseBoolean, setTrueBoolean, toggleBoolean} from "../../../constants/ChangeDisplayStyle";

import optionIcon from '../../../../media/icons/options-white.svg'
import editIcon from '../../../../media/icons/edit.svg'

const Message = (props) => {
    const {
        fromMe,
        messageId, messageText,
        dateChange, changedAt,
        recipientName, senderName,
        selectedMessage, setSelectedMessage,
        sentAt, setShowMessageMenu, showMessageMenu,
        setMessageMenuData
    } = props
    const [messageSentAt, messageExactSentAt, messageSentDate] = getFormattedTime(sentAt)
    const [, messageExactChangedAt] = getFormattedTime(changedAt)

    //if fromMe === true messageWrapClass is changed to display message in the right
    let messageWrapClass
    fromMe ? messageWrapClass = `${style.messageWrap} ${style.fromMe}`
        : messageWrapClass = style.messageWrap
    //State is used in the className attribute of message wrapper
    const [messageWrap, setMessageWrap] = useState(messageWrapClass)

    const isEdited = sentAt !== changedAt


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
                        <div className={style.iconWrap} onClick={openContext}>
                            <img src={optionIcon} className={style.optionIcon} alt="Options"/>
                        </div>
                        {isEdited &&
                        <div className={style.iconWrap}>
                            <span>edited</span>
                            <img src={editIcon} className={style.editIcon} alt="Options"/>
                        </div>
                        }
                        <div className={style.messageSentAt}>
                            <span>{messageSentAt}</span>
                        </div>
                        <div className={style.messageExactSentAt}>
                            {messageExactSentAt}
                            {isEdited &&
                            <div>Edited: {messageExactChangedAt}</div>}
                        </div>
                    </div>
                </div>
                {/*//messagee*/}

            </div>
        </>
    )
}
export default Message