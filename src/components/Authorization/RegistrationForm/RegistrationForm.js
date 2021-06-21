import React, {useEffect, useRef, useState} from 'react';
import style from './RegistrationForm.module.css';
import generalStyle from '../generalAuth.module.css';
import {NavLink, useHistory} from "react-router-dom";
import {API_PATH} from "../../constants/API_PATH_DEFAULT";
import axios from "axios";
import {
    usernameValidation, firstnameValidation, lastnameValidation,
    emailValidation, phoneValidation, passwordValidation, confirmPasswordValidation
} from "../../constants/validation";
import eyeIcon from '../../../media/icons/eye-icon.svg'
import noEyeIcon from '../../../media/icons/no-eye-icon.svg'

const initialFormData = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    passwordConfirm: ''
}

function RegistrationForm(props) {
    const {currentUser, setRegistrationSuccess} = props
    const [formData, setFormData] = useState(initialFormData)
        const {password, passwordConfirm} = formData
    const [showPassword, setShowPassword] = useState({
        p: 'password',
        c: 'password',
        pp: eyeIcon,
        cp: eyeIcon
    })
    const [validatingError, setValidatingError] = useState({})
    const [touched, setTouched] = React.useState({});
    const defaultPasswordClass = generalStyle.inputField
    const [passwordClass, setPasswordClass] = useState(defaultPasswordClass)
    let history = useHistory()

    const passwordRef = useRef(null)
    const passwordConfirmRef = useRef(null)

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

    useEffect(() => {
        if (password !== '' && password === passwordConfirm) {
            setPasswordClass(`${defaultPasswordClass} ${generalStyle.match}`)
        } else if (password !== ''
            && passwordConfirm !== ''
            && password !== passwordConfirm) {
            setPasswordClass(`${defaultPasswordClass} ${generalStyle.noMatch}`)
        } else if (password === ''
            && passwordConfirm === '') {
            setPasswordClass(defaultPasswordClass)
        }
    }, [password, passwordConfirm, defaultPasswordClass])

    const handleChange = e => {
        setFormData(prevFormData => ({
            ...prevFormData, [e.target.name]: e.target.value
        }))

        setTouched({
            ...touched,
            [e.target.name]: true,
        });
        console.log(password, passwordConfirm)
        // console.log(touched)
        // console.log(validatingError)
    }

    const handleBlur = evt => {
        const {name, value} = evt.target;
        // remove whatever error was there previously
        const {[name]: removedError, ...rest} = validatingError;
        // check for a new error
        const error = validate[name](value);
        console.log(`${name} ${value}`, error)
        // validate the field if the value has been touched
        setValidatingError({
            ...rest,
            ...(error && {[name]: touched[name] && error}),
        });
    };


    useEffect(() => {
    }, [validatingError])

    const validate = {
        username: usernameValidation,
        firstname: firstnameValidation,
        lastname: lastnameValidation,
        email: emailValidation,
        phoneNumber: phoneValidation,
        password: passwordValidation,
        passwordConfirm: confirmPasswordValidation
    };


    const handleSubmit = e => {
        e.preventDefault();
        let isValidated = false

        //validate the form
        const formValidation = Object.keys(formData).reduce(
            (acc, key) => {
                const newError = validate[key](formData[key]);
                const newTouched = {[key]: true};
                return {
                    errors: {
                        ...acc.errors,
                        ...(newError && {[key]: newError}),
                    },
                    touched: {
                        ...acc.touched,
                        ...newTouched,
                    },
                };
            },
            {
                errors: {...validatingError},
                touched: {...touched},
            },
        );
        setValidatingError(formValidation.errors);
        setTouched(formValidation.touched);

        if (
            !Object.values(formValidation.errors).length && // errors object is empty
            Object.values(formValidation.touched).length ===
            Object.values(formData).length && // all fields were touched
            Object.values(formValidation.touched).every(t => t === true) // every touched field is true
        ) {
            isValidated = true
        }
        if (isValidated) {
            sendDataToServer()
        }
    }


    const sendDataToServer = () => {
        const registrationData = {
            firstname: formData.firstname,
            lastname: formData.lastname,
            username: formData.username,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            password: formData.password
        }
        //
        axios.post(`${API_PATH}/sign-up`, registrationData)
            .then(response => {
                console.log(response.status)
                setRegistrationSuccess(true)
                currentUser.username = registrationData.username
                history.push('/login')
            })
            .catch(error => {
                alert(error)
                console.log(error)
                if (error.response.status === 400) {
                    // setRegistrationResponse(prevRegResp => ({
                    //     ...prevRegResp,
                    //     errorMessage: `User with this username or email already exists`
                    // }))
                }
            })

    }

    return (
        <div className={style.formWrap}>
            <form onSubmit={handleSubmit}
                  className={generalStyle.authForm}
                  autoComplete='off'
                  spellCheck='false'>
                {/*firstname lastname*/}
                <div className={style.twoFieldsWrap}>

                    <div className={generalStyle.fieldLabelWrapper}>
                        {touched.firstname && validatingError.firstname ?
                        <div className={generalStyle.validationError}>{validatingError.firstname}</div>:
                        <label className={generalStyle.fieldLabel} htmlFor="firstName">First name<span>*</span></label>
                        }
                        <input type="text"
                               name="firstname"
                               placeholder="Adolf"
                               value={formData.firstname}
                               onChange={handleChange}
                               onBlur={handleBlur}
                               maxLength={30}
                               className={generalStyle.inputField}
                        />
                    </div>

                    <div className={generalStyle.fieldLabelWrapper}>
                        {touched.lastname && validatingError.lastname ?
                        <div className={generalStyle.validationError}>{validatingError.lastname}</div>:
                        <label className={generalStyle.fieldLabel} htmlFor="lastName">Last name</label>
                        }
                        <input type="text"
                               name="lastname"
                               id="lastname"
                               placeholder="Obama"
                               value={formData.lastname}
                               onChange={handleChange}
                               onBlur={handleBlur}
                               maxLength={30}
                               className={generalStyle.inputField}
                        />
                    </div>

                </div>
                {/*//firstname lastname*/}
                <div className={generalStyle.fieldLabelWrapper}>
                    {touched.username && validatingError.username ?
                    <div className={generalStyle.validationError}>{validatingError.username}</div>:
                    <label className={generalStyle.fieldLabel} htmlFor="username">Username<span>*</span></label>
                    }
                    <input type="text"
                           id='username'
                           name="username"
                           placeholder="doge69"
                           value={formData.username}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           maxLength={25}
                           className={generalStyle.inputField}
                    />
                    <p className={generalStyle.hint}>This will be the display name. Other people will be able to find
                        you with
                        this name.</p>
                </div>

                <div className={generalStyle.fieldLabelWrapper}>
                    {touched.email && validatingError.email ?
                    <div className={generalStyle.validationError}>{validatingError.email}</div>:
                    <label className={generalStyle.fieldLabel} htmlFor="email">
                        Email address<span>*</span></label>
                    }
                    <input type="email"
                           id='email'
                           name="email"
                           autoComplete='email'
                           placeholder="doge4816@gmail.com"
                           value={formData.email}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           maxLength={40}
                           className={generalStyle.inputField}
                    />
                </div>


                <div className={generalStyle.fieldLabelWrapper}>
                    {touched.phoneNumber && validatingError.phoneNumber ?
                        <div className={generalStyle.validationError}>{validatingError.phoneNumber}</div> :
                        <label className={generalStyle.fieldLabel} htmlFor="phoneNumber">Phone number</label>
                    }
                    <input type="text"
                           name="phoneNumber"
                           id="phoneNumber"
                           placeholder="380 000 000 000"
                           value={formData.phoneNumber}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           maxLength={12}
                           className={generalStyle.inputField}
                    />
                </div>

                {/*password confirm*/}
                <div className={style.twoFieldsWrap}>
                    <div className={generalStyle.fieldLabelWrapper}>
                        {touched.password && validatingError.password ?
                            <div className={generalStyle.validationError}>{validatingError.password}</div> :
                            <label className={generalStyle.fieldLabel} htmlFor="password">
                                Password<span>*</span></label>
                        }
                        <div className={generalStyle.passwordWrap}>
                            <input type={showPassword.p}
                                   name="password"
                                   id="password"
                                   ref={passwordRef}
                                   placeholder="Password"
                                   value={formData.password}
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   maxLength={30}
                                   className={passwordClass}
                            />
                            <img src={showPassword.pp}
                                 alt="Show password"
                                 className={generalStyle.passwordIcon}
                                 onClick={togglePassword}/>
                        </div>
                    </div>

                    <div className={generalStyle.fieldLabelWrapper}>
                        {touched.passwordConfirm && validatingError.passwordConfirm ?
                        <div className={generalStyle.validationError}>{validatingError.passwordConfirm}</div>:
                        <label className={generalStyle.fieldLabel} htmlFor="confirmPassword">
                            Confirm Password<span>*</span></label>
                        }
                        <div className={generalStyle.passwordWrap}>
                            <input type={showPassword.c}
                                   name="passwordConfirm"
                                   id="passwordConfirm"
                                   ref={passwordConfirmRef}
                                   placeholder="Confirm Password"
                                   value={formData.passwordConfirm}
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   maxLength={30}
                                   className={passwordClass}
                            />
                            <img src={showPassword.cp}
                                 alt="Show password"
                                 className={generalStyle.passwordIcon}
                                 onClick={toggleConfirmPassword}/>
                        </div>
                    </div>
                </div>
                {/*//password confirm*/}
                <div className={generalStyle.submitBtnWrap}>
                    <button type="submit" className={generalStyle.submitBtn}>Sign Up</button>
                </div>

                <p className={generalStyle.loginHint}>Already have an account? <NavLink to='/login'
                                                                                        className={generalStyle.loginLink}>Log
                    in</NavLink></p>
            </form>

            {/*<div className="alert alert-success mt-2" style={{display: formData.successMessage ? 'block' : 'none' }} role="alert">*/}
            {/*    {formData.successMessage}*/}
            {/*</div>*/}
            {/*<div className="mt-2">*/}
            {/*    <span>Already have an account? </span>*/}
            {/*    <span className="loginText" onClick={() => redirectToLogin()}>Login here</span>*/}
            {/*</div>*/}

        </div>
    )
}

export default RegistrationForm