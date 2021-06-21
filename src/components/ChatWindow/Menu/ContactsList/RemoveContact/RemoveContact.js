import React, {useEffect, useRef} from 'react';
import style from './RemoveContact.module.css'
import {toggleBoolean} from "../../../../constants/ChangeDisplayStyle";
import axios from "axios";
import {getBearerToken} from "../../../../constants/getBearerToken";
import {SECURED_API_PATH} from "../../../../constants/API_PATH_DEFAULT";


const RemoveContact = (props) => {
    const {contactToRemove, setShowRemove, setContactIsRemoved} = props
    const {id, firstname, lastname} = contactToRemove
    const removeContactRef = useRef(null)

    useEffect(()=>{
        removeContactRef.current.focus()
    }, [])

    const closeRemove = () => {
        toggleBoolean(setShowRemove)
    }

    const closeOnEscape = (event) => {
        if (event.code === 'Escape') {
            closeRemove()
        }
    }

    const removeContact = () => {
        const cancelToken = axios.CancelToken
        const source = cancelToken.source()

        const JWT_header = getBearerToken()
        if (JWT_header !== null) {
            axios.delete(`${SECURED_API_PATH}/contacts/${id}`,
                {headers: {authorization: JWT_header}, cancelToken: source.token})
                .then(response => {
                    console.log(response)
                    setContactIsRemoved(id)
                    closeRemove()
                })
                .catch(error => {
                    console.log(error)
                    closeRemove()
                })
        }
    }

    return (
        <div className={style.removeContactWrap}>

            <div className={style.removeContact}
                 ref={removeContactRef}
                 onKeyDown={closeOnEscape} tabIndex='0'>
                <div className={style.warning}>
                    Are you sure you want to remove <span>{firstname} {lastname}</span> from your contacts list?
                </div>
                <div className={style.confirmation}>
                    <div className={style.confirmBtn}
                         onClick={closeRemove}>
                        Cancel
                    </div>
                    <div className={style.confirmBtn}
                         onClick={removeContact}>
                        Remove
                    </div>
                </div>
            </div>

            <div className={style.background} onClick={closeRemove}/>
        </div>
    )
}

export default RemoveContact