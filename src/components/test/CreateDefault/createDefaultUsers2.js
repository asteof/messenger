import React, {useEffect, useState} from 'react';
import axios from "axios";
import style from '../test.module.css'
import {API_PATH, SECURED_API_PATH} from "../../constants/API_PATH_DEFAULT";
import create from "./createUsers";

const CreateDefaultUsers = () => {

    const [JWT, setJWT] = useState({
        voko: '',
        kirpich: '',
        masha_lar: '',
        danylo: '',
        isvokoJ: '',
        iskirpichJ: '',
        ismasha_larJ: '',
        isdanyloJ: ''
    })
    const {isvokoJ, iskirpichJ, ismasha_larJ, isdanyloJ} = JWT

    const [user, setUser] = useState({
        voko: {},
        kirpich: {},
        masha_lar: {},
        danylo: {},
        isvokoU: '',
        iskirpichU: '',
        ismasha_larU: '',
        isdanyloU: ''
    })
    const {voko, kirpich, masha_lar, danylo, isvokoU, iskirpichU, ismasha_larU, isdanyloU} = user

    const [sent, setSent] = useState({
        isvokoS: '',
        iskirpichS: '',
        ismasha_larS: '',
        isdanyloS: ''
    })
    const {isvokoS, iskirpichS, ismasha_larS, isdanyloS} = sent

    const login = (username) => {
        const cancelToken = axios.CancelToken
        const source = cancelToken.source()

        let formData = new FormData()
        formData.append('username', username)
        formData.append('password', '123')

        axios.post(`${API_PATH}/login`, formData, {cancelToken: source.token})
            .then(response => {
                if (response.status === 200) {
                    console.log('Token successfully acquired (loginUser.js)', response)
                    setJWT(prevJWT => ({
                        ...prevJWT,
                        [username]: response.data.access_token,
                        [`is${username}J`]: '+'
                    }))

                }
            })
            .catch(err => {
                console.log('loginUser.js', err)
                source.cancel('canceled after error')
            })

    }

    const login4 = () => {
        login('voko');
        login('kirpich');
        login('masha_lar');
        login('danylo');
        return Promise.resolve('login successful')
    }

    const get = (newJWT, username) => {
        let JWT_header
        if (newJWT !== "") {
            JWT_header = `Bearer ${newJWT}`
        }
        axios.get(`${SECURED_API_PATH}/user`, {headers: {authorization: JWT_header}})
            .then(response => {
                console.log('getUser.js response:', response)
                setUser(prevUser => ({
                    ...prevUser,
                    [username]: response.data,
                    [`is${username}U`]: '+'
                }))
            })
            .catch(error => console.log('getUser.js', error))
    }

    const get4 = () => {
        get(JWT.voko, 'voko')
        get(JWT.kirpich, 'kirpich')
        get(JWT.masha_lar, 'masha_lar')
        get(JWT.danylo, 'danylo')
        return Promise.resolve('login successful')
    }

    const message = (newJWT, currentUser, secondUser) => {
        let JWT_header, message = ''
        if (newJWT !== "") {
            JWT_header = `Bearer ${newJWT}`
            if (typeof currentUser !== "undefined") {
                message = {
                    text: `${currentUser.username} to ${secondUser.username}`,
                    senderId: currentUser.id,
                    recipientId: secondUser.id
                }
            }
        }
        axios.post(`${SECURED_API_PATH}/messages/`, message, {
            headers: {authorization: JWT_header}
        })
            .then(response => {
                console.log('sendMessage.js', response.data)
                // return response.data
            })
            .catch(error => console.log('sendMessage.js', error, error.response))
    }

    const sendMessagesVoko = (JWT1, voko, kirpich, masha_lar, danylo) => {
        message(JWT1, voko, kirpich)
        message(JWT1, voko, masha_lar)
        message(JWT1, voko, danylo)
        // return Promise.resolve('sent')
        setSent(pS =>({
            ...pS,
            isvokoS: '+'
        }))
    }

    const sendMessagesKirpich = (JWT2, voko, kirpich, masha_lar, danylo) => {
        message(JWT2, kirpich, voko)
        message(JWT2, kirpich, masha_lar)
        message(JWT2, kirpich, danylo)
        // return Promise.resolve('sent')
        setSent(pS =>({
            ...pS,
            iskirpichS: '+'
        }))
    }

    const sendMessagesMasha = (JWT3, voko, kirpich, masha_lar, danylo) => {
        message(JWT3, masha_lar, kirpich)
        message(JWT3, masha_lar, voko)
        message(JWT3, masha_lar, danylo)
        // return Promise.resolve('sent')
        setSent(pS =>({
            ...pS,
            ismasha_larS: '+'
        }))
    }

    const sendMessagesDanylo = (JWT4, voko, kirpich, masha_lar, danylo) => {
        message(JWT4, danylo, voko)
        message(JWT4, danylo, masha_lar)
        message(JWT4, danylo, kirpich)
        // return Promise.resolve('sent')
        setSent(pS =>({
            ...pS,
            isdanyloS: '+'
        }))
    }

    const sendMessages = () => {
        const time = 10
        setTimeout(() => {
            sendMessagesVoko(JWT.voko, voko, kirpich, masha_lar, danylo)
        }, time)
        setTimeout(() => {
            sendMessagesKirpich(JWT.kirpich, voko, kirpich, masha_lar, danylo)
        }, time + 1500)
        setTimeout(() => {
            sendMessagesMasha(JWT.masha_lar, voko, kirpich, masha_lar, danylo)
        }, time + 3000)
        setTimeout(() => {
            sendMessagesDanylo(JWT.danylo, voko, kirpich, masha_lar, danylo)
        }, time + 4500)
    }


    return (
        <div className={style.wrap}>
            <div className={style.flex2}>
                <div>
                    <div>
                        ++++
                    </div>
                    <span className={style.hint}>Create</span>
                    <button className={style.submitBtn} onClick={create}>Boom!</button>
                </div>
                <div>
                    <div>
                        {isvokoJ}{iskirpichJ}{ismasha_larJ}{isdanyloJ}
                    </div>
                    <button className={style.submitBtn} onClick={login4}>Login</button>
                </div>
                <div>
                    <div>
                        {isvokoU}{iskirpichU}{ismasha_larU}{isdanyloU}
                    </div>
                    <button className={style.submitBtn} onClick={get4}>Get user</button>
                </div>
                <div>
                    <div>
                        {isvokoS}{iskirpichS}{ismasha_larS}{isdanyloS}
                    </div>
                    <button className={style.submitBtn} onClick={sendMessages}>Send messages</button>
                </div>
            </div>
        </div>
    )
}

export default CreateDefaultUsers