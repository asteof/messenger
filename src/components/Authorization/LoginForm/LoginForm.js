import React, {useEffect, useState} from 'react';
import style from './LoginForm.module.css';
import generalStyle from '../generalAuth.module.css';
// import testStyle from '../../test/test.module.css'
import {NavLink, useHistory} from "react-router-dom";
import axios from "axios";
import {API_PATH} from "../../constants/API_PATH_DEFAULT";
import {getLocalWithExpiry, setLocalWithExpiry} from "../localStorage";

function LoginForm(props) {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })
    const [JWT_AUTH_TOKEN, setJWT_AUTH_TOKEN] = useState('')

    const [loginResponse, setLoginResponse] = useState({
        successMessage: '',
        errorMessage: '',
        serverResponse: ''
    })

    const {setIsLoggedIn} = props

    let history = useHistory()

    const handleChange = e => {
        setLoginData(prevLoginData => ({
            ...prevLoginData, [e.target.id]: e.target.value
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault();

        let formData = new FormData()
        formData.append('username', loginData.username)
        formData.append('password', loginData.password)

        axios.post(`${API_PATH}/login`, formData)
            .then(response => {
                if (response.status === 200) {
                    console.log('loginForm.js response',response)
                    setJWT_AUTH_TOKEN(response.data.access_token);
                }
            })
            .catch(error => {
                    console.log(error)
                    console.log(error.response)
                    console.log(error.request)

                    if (typeof error.response === 'undefined') {
                        setLoginResponse(prevLoginResponse => ({
                            ...prevLoginResponse,
                            errorMessage: `Cannot log in due to a network error.`,
                            serverResponse: error.toString()
                        }))
                        console.log(loginResponse)
                    } else {
                        if (error.response.status === 401) {
                            setLoginResponse(prevLoginResponse => ({
                                ...prevLoginResponse,
                                errorMessage: `Username or password are incorrect`
                                // serverResponse: error.toString()
                            }))
                            console.log(loginResponse)
                        } else {
                            setLoginResponse(prevLoginResponse => ({
                                ...prevLoginResponse,
                                errorMessage: `Cannot log in due to an error.`,
                                serverResponse: error.toString()
                            }))
                            console.log(loginResponse)
                        }
                    }
                }
            )
    }

    useEffect(() => {
        console.log('LoginForm.js use effect called')

        if (JWT_AUTH_TOKEN !== '') {
            setLoginResponse(prevLoginResponse => ({
                ...prevLoginResponse,
                successMessage: 'Logged in successfully'
            }))
            setIsLoggedIn(true)

            setLocalWithExpiry('token', JWT_AUTH_TOKEN, 86398);
            // const JWT_header =

            history.push('/chat')
        }


    }, [JWT_AUTH_TOKEN])

    // useEffect(()=>{
    //     setUser()
    // })
    // const setUser = () => {
    //     let JWT = getLocalWithExpiry('token')
    //     if (JWT !== null || JWT !== "") {
    //         const JWT_header = `Bearer ${getLocalWithExpiry('token')}`
    //         console.log(`LoginForm.js ${JWT}`)
    //
    //
    //     }
    // }

    return (
        <div className={style.formWrap}>
            <form onSubmit={handleSubmit} className={generalStyle.authForm}>

                <div className={generalStyle.fieldLabelWrapper}>
                    <label className={generalStyle.fieldLabel} htmlFor="username">Username</label>
                    <input type="text"
                           id="username"
                           placeholder="boobaLover69"
                           value={loginData.username}
                           onChange={handleChange}
                           className={generalStyle.inputField}
                    />
                    {/*<p id="phoneHelp" className={g.hint}>Username</p>*/}
                </div>

                <div className={generalStyle.fieldLabelWrapper}>
                    <label className={generalStyle.fieldLabel} htmlFor="password">Password</label>
                    <input type="password"
                           id="password"
                           placeholder="Password"
                           value={loginData.password}
                           onChange={handleChange}
                           className={generalStyle.inputField}
                    />
                </div>

                <div className={generalStyle.submitBtnWrap}>
                    <button type="submit" className={generalStyle.submitBtn}>Login</button>
                </div>

                <p className={generalStyle.loginHint}>
                    Don't have an account? <NavLink
                    to='/signup'
                    className={generalStyle.loginLink}>Sign Up</NavLink>
                </p>
            </form>
            {/*<div className="alert alert-success mt-2" style={{display: loginData.successMessage ? 'block' : 'none' }} role="alert">*/}
            {/*    {loginData.successMessage}*/}
            {/*</div>*/}

            {/*<div>*/}
            {/*<div className={testStyle.tokenHolder}>{JSON.stringify(JWT_AUTH_TOKEN)}</div>*/}
            {/*    <div className={generalStyle.response}>{loginResponse.successMessage}</div>*/}
            {/*    <div className={generalStyle.response}>{loginResponse.errorMessage}</div>*/}
            {/*    <div className={generalStyle.response}><code>{loginResponse.serverResponse}</code></div>*/}
            {/*</div>*/}
        </div>
    )
}

export default LoginForm
