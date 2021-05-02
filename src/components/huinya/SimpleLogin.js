import React, {useState} from 'react';
import axios from "axios";
import style from './test.module.css'
import {API_PATH} from "../constants/API_PATH_DEFAULT";

const SimpleLogin = (props) => {

    const [login, setLogin] = useState('')
    const setNewJWT = props.setNewJWT
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()


    const getNewJWT = (e) => {
        e.preventDefault()

        let formData = new FormData()
        formData.append('username', login)
        formData.append('password', '123')
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        axios.post(`${API_PATH}/login`, formData, {cancelToken: source.token})
            .then(response => {
                if (response.status === 200) {
                    console.log(response)
                    setNewJWT(response.data.access_token)
                }
            })
            .catch(err => {
                console.log(err)
                source.cancel('canceled after error')
            })
    }

    return (
        <div className={style.wrap}>
            <p className={style.hint}>Input login.
                Click "Get token" button to send post req and get temporary JWT</p>
            <h2>Simple login</h2>
            <form method='post' onSubmit={getNewJWT} className={style.testForm + ' ' + style.padding}>
                <div>
                    <label htmlFor="login">Login</label>
                    <div>
                        <input type="text"
                               id='login'
                               value={login}
                               className={style.inputField}
                               onChange={event => setLogin(event.target.value)}/>
                    </div>
                </div>

                <div>
                    <button type="submit" className={style.submitBtn}>Get token</button>
                </div>
            </form>
        </div>
    )
}

export default SimpleLogin