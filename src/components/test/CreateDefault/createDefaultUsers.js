import React, {useState} from 'react';
import axios from "axios";
import style from '../test.module.css'
import {API_PATH, SECURED_API_PATH} from "../../constants/API_PATH_DEFAULT";
import create from "./createUsers";

const CreateDefaultUsers = () => {

    const [JWT, setJWT] = useState({
        voko: '',
        kirpich: '',
        masha_lar: '',
        danylo: ''
    })

    const [user, setUser] = useState({
        voko: {},
        kirpich: {},
        masha_lar: {},
        danylo: {}
    })
    const {voko, kirpich, masha_lar, danylo} = user

    const boom = () => {
        create()
        setTimeout(()=>login4(), 3000)
        setTimeout(()=>get4(), 5000)

        sendMessages(6000)
    }


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
                        [username]: response.data.access_token
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
                    [username]: response.data
                }))
            })
            .catch(error => console.log('getUser.js', error))
    }

    const get4 = () => {
        get(JWT.voko, 'voko')
        get(JWT.kirpich, 'kirpich')
        get(JWT.masha_lar, 'masha_lar')
        get(JWT.danylo, 'danylo')
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
        message(JWT1, voko, kirpich);
        message(JWT1, voko, masha_lar)
        message(JWT1, voko, danylo)
    }

    const sendMessagesKirpich = (JWT2, voko, kirpich, masha_lar, danylo) => {
        message(JWT2, kirpich, voko)
        message(JWT2, kirpich, masha_lar)
        message(JWT2, kirpich, danylo)
    }

    const sendMessagesMasha = (JWT3, voko, kirpich, masha_lar, danylo) => {
        message(JWT3, masha_lar, kirpich)
        message(JWT3, masha_lar, voko)
        message(JWT3, masha_lar, danylo)
    }

    const sendMessagesDanylo = (JWT4, voko, kirpich, masha_lar, danylo) => {
        message(JWT4, danylo, voko)
        message(JWT4, danylo, masha_lar)
        message(JWT4, danylo, kirpich)
    }

    const sendMessages = (time) => {
        const latency = time + 300
        setTimeout(() => sendMessagesVoko(JWT.voko, voko, kirpich, masha_lar, danylo), latency)
        setTimeout(() => sendMessagesKirpich(JWT.kirpich, voko, kirpich, masha_lar, danylo), latency)
        setTimeout(() => sendMessagesMasha(JWT.masha_lar, voko, kirpich, masha_lar, danylo), latency)
        setTimeout(() => sendMessagesDanylo(JWT.danylo, voko, kirpich, masha_lar, danylo), latency)
    }

    return (
        <div className={style.wrap}>
            <div className={style.btnCreateWrap}>
                <button className={style.submitBtn} onClick={boom}>Boom!</button>
            </div>
        </div>
    )
}

export default CreateDefaultUsers