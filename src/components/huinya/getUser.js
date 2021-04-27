import React, {useState, useEffect} from 'react';
import axios from "axios";
import style from './test.module.css'
import {API_PATH, SECURED_API_PATH} from "../constants/API_PATH_DEFAULT";
import {getLocalWithExpiry} from "../Authorization/localStorage";

const GetUser = (props) => {

    const [currentUser, setCurrentUser] = useState({})
    const newJWT = props.newJWT

    const getUser = () => {
        let JWT_header
        if (newJWT !== "") {
            JWT_header = `Bearer ${newJWT}`
            console.log(`ChatWindow.js ${JWT_header}`)
        }

        axios.get(`${SECURED_API_PATH}/user`, {
            headers: {
                authorization: JWT_header
            }
        })
            .then(response => {
                console.log(response)
                console.log(response.data)
                setCurrentUser(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        console.log('test.js getUser.js uf called')
    }, [currentUser])

    return (
        <div className={style.wrap}>
            <code>{JSON.stringify(currentUser)}</code>
            <div>
                <button type='button'
                        className={style.submitBtn}
                        onClick={getUser}>Get user
                </button>
            </div>
        </div>
    )
}
export default GetUser