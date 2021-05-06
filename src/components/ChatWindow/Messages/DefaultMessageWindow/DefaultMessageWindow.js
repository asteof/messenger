import React from 'react';
import style from './DefaultMessageWindow.module.css'

function DefaultMessageWindow() {

    return (
        <div className={style.selectChatWrap}>
            <div className={style.selectChat}>
                Select a chat to start messaging
            </div>
        </div>
    )
}

export default DefaultMessageWindow;