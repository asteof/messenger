import React, {useEffect, useState} from 'react';
import style from './dialog.module.css'
import * as SockJS from 'sockjs-client'
import * as Stomp from '@stomp/stompjs'

const Dialog = (props) => {

    let dialogClass = style.dialog;
    const dialogClassActive = `${style.dialog} ${style.active}`;

    const {id, name, selectedDialog, setSelectedDialog} = props

    const selectDialog = () => {
        // let socket = new WebSocket()
        // let socket = new SockJS()


        console.log(`id ${id}`)
        console.log(`name ${name}`)
        console.log(`selectedOption ${selectedDialog}`)
        console.log(`setSelectedOption ${selectedDialog}`)
        setSelectedDialog(id)
    }

    return (
        //if the selectedDialog matches with dialog id it displays active CSS class
        //otherwise it displays usual dialog class
        <div className={selectedDialog === id ? dialogClassActive : dialogClass}
             onClick={selectDialog}>
            {name}
        </div>
    )
}

export default Dialog