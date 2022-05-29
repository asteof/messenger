import React, {useEffect} from 'react';
import axios from "axios";
import style from './test.module.css'
import {SECURED_API_PATH} from "../../constants/API_PATH_DEFAULT";

const SimpleGetUser = (props) => {
    const {testCurrentUser, setTestCurrentUser, newJWT} = props

    const getUser = () => {
        let JWT_header
        if (newJWT !== "") {
            JWT_header = `Bearer ${newJWT}`
            console.log(`getUser.js ${JWT_header}`)
        }

        axios.get(`${SECURED_API_PATH}/user`,
            {headers: {authorization: JWT_header}})
            .then(response => {
                console.log(response)
                console.log(response.data)
                setTestCurrentUser(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        console.log('test.js SimpleGetUser.js uf called')
    }, [testCurrentUser])

    return (
        <div className={style.wrap}>
            <p className={style.hint}>Click "Get user" to get user from temporary JWT</p>
            <code>{JSON.stringify(testCurrentUser)}</code>
            <div>
                <button type='button'
                        className={style.submitBtn}
                        onClick={getUser}>Get user
                </button>
            </div>
            <div className={style.extraSmall}>{JSON.stringify(newJWT)}</div>
        </div>
    )
}
export default SimpleGetUser;
