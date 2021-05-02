import React from 'react';
import axios from "axios";
import style from './test.module.css'
import {API_PATH} from "../constants/API_PATH_DEFAULT";

const CreateDefaultUsers = () => {

    const create = () => {
        users('Kostya', 'V', 'voko',
            'voko@gmail.com', '180169696969', '123')

        setTimeout(() => users('kirpich', '', 'kirpich',
            'kirpich@gmail.com', '280269696969', '123'), 1500)

        setTimeout(() => users('Maria', 'Larikova', 'masha_lar',
            'masha@gmail.com', '380369696969', '123'), 2000)

        setTimeout(() => users('Danylo', 'from Rivne', 'danylo',
            'danylo@gmail.com', '480469696969', '123'), 2500)
    }

    const users = (firstname, lastname, username, email, phoneNumber, password) => {
        const userData = {
            firstname,
            lastname,
            username,
            email,
            phoneNumber,
            password
        }
        console.log(userData)
        // debugger
        axios.post(`${API_PATH}/sign-up`, userData)
            .then(response => {
                console.log(response)
                console.log(`${response.data} ${response.status} ${response.data}`)
            })
            .catch(error => {
                if (error.response.status === 400) {
                    alert(`User ${username} already exists`)
                } else {
                    alert(`User ${username} creation failed:\n${error}`)
                }
                console.log(error)
            })
    }

    return (
        <div className={style.btnCreateWrap}>
            <button className={style.submitBtn} onClick={create}>Boom!</button>
        </div>
    )
}

export default CreateDefaultUsers