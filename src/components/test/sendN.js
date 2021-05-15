import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";
import style from './test.module.css'
import {getBearerToken} from "../constants/getBearerToken";
import {SECURED_API_PATH} from "../constants/API_PATH_DEFAULT";

const SendN = () => {

    const [amount, setAmount] = useState(200)
    const [text, setText] = useState('')
    const [user, setUser] = useState()

    const ref = useRef(null)

    const submit = e => {
        e.preventDefault()
        const JWT_header = getBearerToken('test')
        if (JWT_header !== null) {
            ref.current.innerHTML = JWT_header

            for (let i = 0; i < amount; i++) {
                sendMsg(JWT_header, i)
            }
        } else {
            ref.current.innerHTML = 'You must login first'
        }
    }

    const sendMsg = (JWT_header, i)=>{
        setTimeout(() => {
            axios.post(
                `${SECURED_API_PATH}/messages/`,
                {text: `${user}: ${text} ${Date.now()}`, recipientId: user},
                {headers: {authorization: JWT_header}})
                .then(response => {
                    console.log('sendN.js', response.data)
                })
                .catch(error => console.log('sendN.js', error, error.response))
        }, 1000 * i)
    }

    return (
        <div className={style.wrap}>

            <form onSubmit={submit}>
                <div className={style.flex}>
                    <div>
                        <p className={style.hint}>Amount of messages</p>
                        <input type="number"
                               className={style.inputField}
                               value={amount}
                               onChange={event => setAmount(()=>event.target.value)}
                               placeholder='amount'/>
                    </div>
                    <div>
                        <p className={style.hint}>User to send</p>
                        <input type="number"
                               className={style.inputField}
                               value={user}
                               onChange={event => setUser(()=>event.target.value)}
                               placeholder='user'/>
                    </div>

                    <div>
                        <p className={style.hint}>Custom text</p>
                        <input type="text"
                               className={style.inputField}
                               value={text}
                               onChange={event => setText(()=>event.target.value)}
                               placeholder='text'/>
                    </div>
                    <div>
                        <button className={style.submitBtn}>Send {amount} to {user}</button>
                    </div>
                </div>
            </form>
            <span className={style.hint} ref={ref}/>
        </div>
    )
}

export default SendN