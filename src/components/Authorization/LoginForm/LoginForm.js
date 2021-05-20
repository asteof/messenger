import React, {useEffect, useRef, useState} from 'react';
import style from './LoginForm.module.css';
import generalStyle from '../generalAuth.module.css';
import {NavLink, useHistory} from "react-router-dom";
import axios from "axios";
import {API_PATH} from "../../constants/API_PATH_DEFAULT";
import {setLocalWithExpiry} from "../../constants/localStorage";
import eyeIcon from '../../../media/icons/eye-icon.svg'
import noEyeIcon from '../../../media/icons/no-eye-icon.svg'
import {toggleBoolean} from "../../constants/ChangeDisplayStyle";
import {loginUsernameValidation} from "../../constants/validation";

function LoginForm(props) {
    const {setIsLoggedIn, currentUser, registrationSuccess} = props
    const username = currentUser.username !== undefined ? currentUser.username : ''
    const [loginData, setLoginData] = useState({
        username,
        password: '',
        usernameError: '',
        passwordError: ''
    })
    let history = useHistory()
    const [showNotify, setShowNotify] = useState(false)
    const [notifyText, setNotifyText] = useState('')
    const [JWT_AUTH_TOKEN, setJWT_AUTH_TOKEN] = useState('')
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)

    const [showPassword, setShowPassword] = useState({
        p: 'password',
        pp: eyeIcon,
    })

    const togglePassword = () => {
        if (showPassword.p === 'password') {
            setShowPassword(prevShow => ({
                ...prevShow,
                p: 'text',
                pp: noEyeIcon
            }))
        } else {
            setShowPassword(prevShow => ({
                ...prevShow,
                p: 'password',
                pp: eyeIcon
            }))
        }
        passwordRef.current.focus()
    }

    const closeNotify = () => {
        toggleBoolean(setShowNotify)
        setNotifyText('')
    }

    const handleChange = e => {
        setLoginData(prevLoginData => ({
            ...prevLoginData, [e.target.id]: e.target.value
        }))
    }

    useEffect(() => {
        if (notifyText !== '')
            toggleBoolean(setShowNotify)
    }, [notifyText])

    const validate = () => {
        const usernameValid = loginUsernameValidation(loginData.username)
        if (typeof usernameValid === 'string') {
            setLoginData(prev => ({
                ...prev,
                usernameError: usernameValid
            }))
            return false
        }
        if (loginData.password === '') {
            setLoginData(prev => ({
                ...prev,
                passwordError: 'Password cannot be empty'
            }))
            return false
        }
        setLoginData(prev => ({
            ...prev,
            usernameError: '',
            passwordError: ''
        }))
        return true
    }

    const handleSubmit = async e => {
        e.preventDefault();

        let formData = new FormData()
        formData.append('username', loginData.username)
        formData.append('password', loginData.password)

        const isValid = validate()
        if (isValid) {

            if (loginData.username !== '' && loginData.password !== '') {

                axios.post(`${API_PATH}/login`, formData)
                    .then(response => {
                        if (response.status === 200) {
                            console.log('loginForm.js response', response)
                            setJWT_AUTH_TOKEN(response.data.access_token);
                        }
                    })
                    .catch(error => {
                            console.log(error)
                            console.log(error.response)
                            if (typeof error.response === 'undefined') {
                                setNotifyText(`Cannot login due to a network error. ${error.toString()}`)
                            } else {
                                if (error.response.status === 401) {
                                    setNotifyText(`Username or password are incorrect`)
                                } else {
                                    setNotifyText(`Cannot login due to an error. ${error.toString()}`)
                                }
                            }
                        }
                    )//.catch block
            }//if fields not empty
        }//if isValid
    }

    useEffect(() => {
        usernameRef.current.focus()
        if (registrationSuccess) {
            setNotifyText('Successfully registered! You can now log in')
            toggleBoolean(setShowNotify)
        }
    }, [])

    useEffect(() => {
        if (JWT_AUTH_TOKEN !== '') {
            setIsLoggedIn(true)
            setLocalWithExpiry('token', JWT_AUTH_TOKEN, 86398);
            history.push('/chat')
        }
    }, [JWT_AUTH_TOKEN])

    return (
        <div className={style.formWrap}>
            <form onSubmit={handleSubmit} className={style.authForm}>

                <div className={generalStyle.fieldLabelWrapper}>
                    {loginData.usernameError ?
                        <div className={generalStyle.validationError}>{loginData.usernameError}</div> :
                        <label className={generalStyle.fieldLabel} htmlFor="username">Username</label>
                    }
                    <input type="text"
                           id="username"
                           name='username'
                           ref={usernameRef}
                           placeholder="doge69"
                           value={loginData.username}
                           onChange={handleChange}
                           maxLength={25}
                           className={generalStyle.inputField}
                    />
                </div>

                <div className={generalStyle.fieldLabelWrapper}>
                    {loginData.passwordError ?
                        <div className={generalStyle.validationError}>{loginData.passwordError}</div> :
                        <label className={generalStyle.fieldLabel} htmlFor="password">Password</label>
                    }
                    <div className={generalStyle.passwordWrap}>
                        <input type={showPassword.p}
                               id="password"
                               placeholder="Password"
                               value={loginData.password}
                               ref={passwordRef}
                               onChange={handleChange}
                               maxLength={30}
                               className={generalStyle.inputField}
                        />
                        <img src={showPassword.pp}
                             alt="Show password"
                             className={generalStyle.passwordIcon}
                             onClick={togglePassword}/>
                    </div>
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

            {showNotify &&
            <div className='notify'>
                <div className='closeIcon'
                     onClick={closeNotify}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF"
                         strokeWidth="2"
                         strokeLinecap="round" strokeLinejoin="round">
                        <g>
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </g>
                    </svg>
                </div>
                <span>{notifyText}</span>
            </div>
            }
        </div>
    )
}

export default LoginForm
