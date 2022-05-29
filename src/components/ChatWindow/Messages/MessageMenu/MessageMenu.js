import React, {useEffect, useRef, useState} from 'react';
import style from './MessageMenu.module.css'
import {toggleBoolean} from "../../../../constants/ChangeDisplayStyle";
import DeleteMessage from "./DeleteMessage/DeleteMessage";
import EditMessage from "./EditMessage/EditMessage";

const MessageMenu = (props) => {
    const {
        messageMenuData, setShowMessageMenu, setMessagesPage,
        setSelectedMessage, secondChatUser, setMessageChanged
    } = props

    const {
        fromMe, messageId, messageText,
        recipientName, senderName, sentAt
    } = messageMenuData
    const messageMenuRef = useRef(null)
    const [showDeleteMessage, setShowDeleteMessage] = useState(false)
    const [showEditMessage, setShowEditMessage] = useState(false)

    const closeMessageMenu = () => {
        setShowMessageMenu(false)
        setSelectedMessage()
    }

    const copyText = event => {
        event.preventDefault()
        navigator.clipboard.writeText(messageText)
            .then(() => {
                console.log('suc')
            })
            .catch((error) => {
                console.log('unsuc', error)
            })
        closeMessageMenu()
    }

    const copyData = event => {
        event.preventDefault()
        const messageTime = new Date(sentAt).toUTCString()

        navigator.clipboard.writeText(
            `${senderName}: ${messageText}\nto ${recipientName}\nat ${messageTime}`)
            .then(() => {
                console.log('suc')
            })
            .catch((error) => {
                console.log('unsuc', error)
            })
        closeMessageMenu()
    }

    const openDeleteForm = () => {
        toggleBoolean(setShowDeleteMessage)
        messageMenuRef.current.remove()
    }

    const openEditForm = () => {
        toggleBoolean(setShowEditMessage)
        messageMenuRef.current.remove()
    }

    const closeOnEscape = (event) => {
        if (event.code === 'Escape') {
            closeMessageMenu()
        }
    }

    useEffect(() => {
        messageMenuRef.current.focus()
        setMessagesPage(1)
    }, [])

    return (
        <div className={style.messageMenuWrap}>
            <div className={style.messageMenuSection}>

                <div className={style.messageMenu}
                     tabIndex='0' onKeyDown={closeOnEscape}
                     ref={messageMenuRef}>

                    <div className={style.menuElement}
                         onClick={copyText}>
                        Copy text
                    </div>

                    <div className={style.menuElement}
                         onClick={copyData}>
                        Copy message data
                    </div>
                    {fromMe &&
                    <>
                        <div className={style.menuElement}
                             onClick={openEditForm}>
                            Edit message
                        </div>

                        <div className={style.menuElement}
                             onClick={openDeleteForm}>
                            Delete message
                        </div>
                    </>
                    }

                </div>
                {/*  messageMenu  */}

                {showDeleteMessage &&
                <DeleteMessage messageId={messageId}
                               setShowMessageMenu={setShowMessageMenu}
                               secondChatUser={secondChatUser}
                               setMessageChanged={setMessageChanged}/>}

                {showEditMessage &&
                <EditMessage messageMenuData={messageMenuData}
                             setShowMessageMenu={setShowMessageMenu}
                             setMessageChanged={setMessageChanged}/>}

            </div>
            {/*  messageMenuSection  */}
            <div className={style.back} onClick={closeMessageMenu}/>
        </div>//messageMenuWrap
    )
}
export default MessageMenu
