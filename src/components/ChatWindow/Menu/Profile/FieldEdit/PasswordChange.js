import React, {useEffect, useRef, useState} from 'react';
import style from './FieldEdit.module.css'
import {toggleBoolean} from "../../../../constants/ChangeDisplayStyle";
import axios from "axios";
import {SECURED_API_PATH} from "../../../../constants/API_PATH_DEFAULT";
import {getLocalWithExpiry} from "../../../../constants/localStorage";
import {passwordValidation, confirmPasswordValidation} from "../../../../constants/validation";

import eyeIcon from '../../../../../media/icons/eye-icon.svg'
import noEyeIcon from '../../../../../media/icons/no-eye-icon.svg'

const NameEdit = (props) => {
    const {setShowPasswordChange} = props
    const [passwords, setPasswords] = useState({
        password: '',
        confirmPassword: '',
    })
    const {password, confirmPassword} = passwords
    const [showPassword, setShowPassword] = useState({
        p: 'password',
        c: 'password',
        pp: eyeIcon,
        cp: eyeIcon
    })

    // const [errors, setErrors] = useState({
    //     password: '',
    //     confirmPassword: '',
    // })

    const passwordRef = useRef(null)
    const passwordConfirmRef = useRef(null)
    const defaultFieldClass = style.passInputField
    const [fieldClass, setFieldClass] = useState(defaultFieldClass)

    const inputHandle = event => {
        setPasswords(prevName => ({
            ...prevName,
            [event.target.id]: event.target.value
        }))
    }

    const closeEdit = () => {
        toggleBoolean(setShowPasswordChange)
    }

    // const validation = {
    //     password: passwordValidation(),
    //     confirmPassword: confirmPasswordValidation(),
    // }

    const edit = event => {
        event.preventDefault()
        if (password !== ''
            && confirmPassword !== ''
            && password === confirmPassword) {

            const JWT = getLocalWithExpiry('token')
            if (JWT !== null && JWT !== '') {
                let JWT_header = `Bearer ${JWT}`
                const cancelToken = axios.CancelToken
                const source = cancelToken.source()

                changePassword(JWT_header, source)
                closeEdit()
            }
        }
    }

    //sets type for input field to make password visible
    const toggleVisibility = (field, pic) => {
        if (showPassword[field] === 'password') {
            setShowPassword(prevShow => ({
                ...prevShow,
                [field]: 'text',
                [pic]: noEyeIcon
            }))
        } else {
            setShowPassword(prevShow => ({
                ...prevShow,
                [field]: 'password',
                [pic]: eyeIcon
            }))
        }
    }

    const togglePassword = () => {
        toggleVisibility('p', 'pp')
        passwordRef.current.focus()
    }

    const toggleConfirmPassword = () => {
        toggleVisibility('c', 'cp')
        passwordConfirmRef.current.focus()
    }

    const changePassword = (JWT_header, source) => {
        //first request is PUT, to change user data
        axios.put(
            `${SECURED_API_PATH}/user/password`,
            {password},
            {headers: {authorization: JWT_header}, cancelToken: source.token}
        )
            .then(response => {
                // const updateUserResponse = response.status
                console.log('202 = OK', response)
            })
            .catch(error => {
                console.log('update password', error)
            })
    }

    // console.log('NameEdit.js current user', currentUser)
    // console.log('names',currentUser.firstname,currentUser.lastname, typeof currentUser.firstname)
    // console.log('name', name)

    useEffect(() => {
        if (password !== '' && password === confirmPassword) {
            setFieldClass(`${defaultFieldClass} ${style.match}`)
        } else if (password !== ''
            && confirmPassword !== ''
            && password !== confirmPassword) {
            setFieldClass(`${defaultFieldClass} ${style.noMatch}`)
        } else if (password === ''
            && confirmPassword === '') {
            setFieldClass(defaultFieldClass)
        }
    }, [password, confirmPassword, defaultFieldClass])

    return (
        <div className={style.editWrap}>
            <div className={style.passwordEditBlock}>
                <p>Password change</p>
                <form spellCheck="false" autoComplete='new-password' onSubmit={edit}>
                    <div className={style.formInput}>
                        <label htmlFor="password" className={style.fieldLabel}>New password</label>
                        <div className={style.passwordFieldWrap}>
                            <input type={showPassword.p}
                                   ref={passwordRef}
                                   id="password"
                                   value={password}
                                   className={fieldClass}
                                   autoFocus
                                   onChange={inputHandle}
                            />
                            <img src={showPassword.pp}
                                 alt="Show password"
                                 className={style.passwordIcon}
                                 onClick={togglePassword}/>
                        </div>
                    </div>
                    <div className={style.formInput}>
                        <label htmlFor="confirmPassword" className={style.fieldLabel}>Confirm new password</label>
                        <div className={style.passwordFieldWrap}>
                            <input type={showPassword.c}
                                   ref={passwordConfirmRef}
                                   id='confirmPassword'
                                   value={confirmPassword}
                                   className={fieldClass}
                                   onChange={inputHandle}
                            />
                            <img src={showPassword.cp}
                                 alt="Show password"
                                 className={style.passwordIcon}
                                 onClick={toggleConfirmPassword}/>
                        </div>
                    </div>
                    <div className={style.confirmationPassword}>
                        <button type="button"
                                className={style.editButton}
                                onClick={closeEdit}
                        >Cancel
                        </button>
                        <input type="submit" value='Change password' className={style.editButton}/>
                    </div>
                </form>
            </div>
            <div className={style.background} onClick={closeEdit}/>
        </div>
    )
}
//test
export default NameEdit