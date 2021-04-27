import React, {useEffect, useState} from 'react';
import style from './loginForm.module.css';
import generalStyle from '../generalAuth.module.css';
import testStyle from '../../huinya/test.module.css'
import {NavLink, useHistory} from "react-router-dom";
import axios from "axios";
import {API_PATH} from "../../constants/API_PATH_DEFAULT";
import {setLocalWithExpiry} from "../localStorage";

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

    const {setIsLoggedIn, tokenExpired, setTokenExpired} = props

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
                    console.log(response)
                    console.log(response.data.access_token)
                    console.log('state\n' + JSON.stringify(JWT_AUTH_TOKEN))
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
            // console.log('state in use effect\n' + JSON.stringify(JWT_AUTH_TOKEN))
            history.push('/chat')
        }
    }, [JWT_AUTH_TOKEN])

    return (
        <div className={style.formWrap}>
            <form onSubmit={handleSubmit}>

                <div className={generalStyle.fieldLabelWrapper}>
                    <label className={generalStyle.labelWrap} htmlFor="username">Username</label>
                    <input type="text"
                           id="username"
                           placeholder="boobaLover69"
                           value={loginData.username}
                           onChange={handleChange}
                    />
                    {/*<p id="phoneHelp" className={g.hint}>Username</p>*/}
                </div>

                <div className={generalStyle.fieldLabelWrapper}>
                    <label className={generalStyle.labelWrap} htmlFor="password">Password</label>
                    <input type="password"
                           id="password"
                           placeholder="Password"
                           value={loginData.password}
                           onChange={handleChange}
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

// <div className={g.fieldLabelWrapper}>
//     <label className={g.labelWrap} htmlFor="email">Email address</label>
// <input type="email"
//        id="email"
//        placeholder="adolf-obama48@gmail.com"
//        value={loginData.email}
//        onChange={handleChange}
// />
// <p id="emailHelp" className={g.hint}>No one can see your email.</p>
// </div>
//
// <div className={g.fieldLabelWrapper}>
// <label className={g.labelWrap} htmlFor="phoneNumber">Phone number</label>
// <input type="text"
//        id="phoneNumber"
//        placeholder="380 000 000 000"
//        value={loginData.phoneNumber}
//        onChange={handleChange}
// />
// <p id="phoneHelp" className={g.hint}>The phone won't be visible to anyone
//     unless you allow it to be visible.</p>
// </div>