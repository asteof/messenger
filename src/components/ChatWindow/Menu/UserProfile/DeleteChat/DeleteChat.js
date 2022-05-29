import React, {useEffect, useRef} from 'react';
import style from './DeleteChat.module.css'
import {toggleBoolean} from "../../../../../constants/ChangeDisplayStyle";
import axios from "axios";
import {getBearerToken} from "../../../../../constants/getBearerToken";
import {SECURED_API_PATH} from "../../../../../constants/API_PATH_DEFAULT";


const DeleteChat = (props) => {
    const {user, setShowDelete, chatId, setChatIsDeleted} = props
    const {id, firstname, lastname} = user
    const deleteChatRef = useRef(null)

    useEffect(() => {
        deleteChatRef.current.focus()
    }, [])

    const closeDelete = () => {
        toggleBoolean(setShowDelete)
    }

    const closeOnEscape = (event) => {
        if (event.code === 'Escape') {
            closeDelete()
        }
    }

    const deleteChat = () => {

        const JWT_header = getBearerToken()
        if (JWT_header !== null) {
            axios.delete(`${SECURED_API_PATH}/chat/${chatId}`,
                {headers: {authorization: JWT_header}})
                .then(response => {
                    console.log(response)
                    setChatIsDeleted(id)
                    closeDelete()
                })
                .catch(error => {
                    console.log(error)
                    closeDelete()
                })
        }
    }

    return (
        <div className={style.deleteChatWrap}>

            <div className={style.deleteChat}
                 ref={deleteChatRef}
                 onKeyDown={closeOnEscape} tabIndex='0'>
                <div className={style.warning}>
                    Are you sure you want to delete
                    chat with <span>{firstname} {lastname}</span>?
                    <div className={style.warn}>This action cannot be undone</div>
                </div>
                <div className={style.confirmation}>
                    <div className={style.confirmBtn}
                         onClick={closeDelete}>
                        Cancel
                    </div>
                    <div className={style.confirmBtn}
                         onClick={deleteChat}>
                        <span className={style.warn}>Delete chat</span>
                    </div>
                </div>
            </div>

            <div className={style.background} onClick={closeDelete}/>
        </div>
    )
}

export default DeleteChat
