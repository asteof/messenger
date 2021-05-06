import React, {useState, useEffect} from 'react';
import axios from "axios";
import style from './test.module.css'
import {SECURED_API_PATH} from "../constants/API_PATH_DEFAULT";

const SimpleSendMessage = (props) => {
    const {testCurrentUser, newJWT} = props

    const [message, setMessage] = useState({
        text: '',
        senderId: testCurrentUser.id,
        recipientId: 0
    })
    const [response, setResponse] = useState({})

    const createMsg = event => {
        setMessage(prevMsg => ({
            ...prevMsg,
            [event.target.id]: event.target.value
        }))
    }
    const send = event => {
        event.preventDefault()
        let JWT_header
        if (newJWT !== "") {
            JWT_header = `Bearer ${newJWT}`
            console.log(`SimpleChatFetch.js ${JWT_header}`)
        }

        axios.post(`${SECURED_API_PATH}/messages/`, message, {
            headers: {authorization: JWT_header}
        })
            .then(response => {
                console.log(response.data)
                setResponse(response.data)
            })
            .catch(error => {
                console.log(error, error.response)
                setResponse(error.response)
            })

    }

    // useEffect(() => {
    //     console.log('SimpleGetMessages.js uf called')
    // }, [testMessages])


    return (
        <div className={style.wrap}>
            <div className={style.hint}>Click "Send message" to send a message to a specified user</div>
            <form className={style.testForm}>
                <div className={style.c}>
                    <div className={style.hi3}>
                        <input type="text"
                               id='text'
                               onChange={createMsg}
                               placeholder='Message'
                               className={style.inputField}/>
                    </div>
                    <div className={style.hi3}>
                        <input type="number"
                               id='recipientId'
                               onChange={createMsg}
                               placeholder='recipient id'
                               className={style.inputField}/>
                    </div>
                </div>

                <button type='submit'
                        onClick={send}
                        className={style.submitBtn}>Send message
                </button>

            </form>
            <div className={style.hi2 +' '+ style.break}><code>{JSON.stringify(response)}</code></div>
            <div className={style.extraSmall}>{JSON.stringify(newJWT)}</div>
        </div>
    )
}

export default SimpleSendMessage