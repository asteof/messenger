import React, {useState} from 'react';
import style from './RegistrationForm.module.css';
import generalStyle from '../generalAuth.module.css';
import {NavLink, useHistory} from "react-router-dom";
import {API_PATH} from "../../constants/API_PATH_DEFAULT";
import axios from "axios";

// import Sockjs f

function RegistrationForm(props) {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        passwordConfirm: ''
    })

    const [registrationResponse, setRegistrationResponse] = useState({
        successMessage: '',
        errorMessage: '',
        serverResponse: ''
    })

    const [validatingError, setValidatingError] = useState(false)

    const handleChange = e => {
        setFormData(prevFormData => ({
            ...prevFormData, [e.target.id]: e.target.value
        }))
    }

    let history = useHistory()

    const handleSubmit = e => {
        e.preventDefault();
        if (formData.password === formData.passwordConfirm) {
            sendDataToServer()
        } else {
            alert('pizda')
            setValidatingError(true)
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
        // alert(JSON.stringify(registrationData))

        axios.post(`${API_PATH}/sign-up`, registrationData)
            .then(response => {
                alert(JSON.stringify(response))
                console.log(`${response.data} ${response.status} ${response.data}`)
                setRegistrationResponse(prevRegResp =>({
                    ...prevRegResp,
                    successMessage: `Successfully registered! You will be now redirected to login!`,
                }))
                // history.push('/login')
            })
            .catch(error => {
                alert(error)
                console.log(error)
                if (error.response.status === 400) {
                    setRegistrationResponse(prevRegResp =>({
                        ...prevRegResp,
                        errorMessage: `User with this username or email already exists`
                    }))
                }
            })

    }

    return (
        <div className={style.formWrap}>

            <form onSubmit={handleSubmit}  className={generalStyle.authForm}>
                {/*firstname lastname*/}
                <div className={style.twoFieldsWrap}>

                    <div className={generalStyle.fieldLabelWrapper}>
                        <label className={generalStyle.fieldLabel} htmlFor="firstName">First name<span>*</span></label>
                        <input type="text"
                               id="firstname"
                               placeholder="Adolf"
                               value={formData.firstname}
                               onChange={handleChange}
                               maxLength={20}
                               className={generalStyle.inputField}
                        />
                    </div>

                    <div className={generalStyle.fieldLabelWrapper}>
                        <label className={generalStyle.fieldLabel} htmlFor="lastName">Last name</label>
                        <input type="text"
                               id="lastname"
                               placeholder="Obama"
                               value={formData.lastname}
                               onChange={handleChange}
                               maxLength={20}
                               className={generalStyle.inputField}
                        />
                    </div>

                </div>
                {/*//firstname lastname*/}
                <div className={generalStyle.fieldLabelWrapper}>
                    <label className={generalStyle.fieldLabel} htmlFor="username">Username</label>
                    <input type="text"
                           id="username"
                           placeholder="boobaLover69"
                           value={formData.username}
                           onChange={handleChange}
                           maxLength={28}
                           className={generalStyle.inputField}
                    />
                    <p className={generalStyle.hint}>This will be the display name. Other people will be able to find you with
                        this name.</p>
                </div>

                <div className={generalStyle.fieldLabelWrapper}>
                    <label className={generalStyle.fieldLabel} htmlFor="email">Email address</label>
                    <input type="email"
                           id="email"
                           placeholder="adolf-obama48@gmail.com"
                           value={formData.email}
                           onChange={handleChange}
                           maxLength={50}
                           className={generalStyle.inputField}
                    />
                    <p id="emailHelp" className={generalStyle.hint}>No one can see your email.</p>
                </div>


                <div className={generalStyle.fieldLabelWrapper}>
                    <label className={generalStyle.fieldLabel} htmlFor="phoneNumber">Phone number</label>
                    <input type="text"
                           id="phoneNumber"
                           placeholder="380 000 000 000"
                           value={formData.phoneNumber}
                           onChange={handleChange}
                           maxLength={12}
                           className={generalStyle.inputField}
                    />
                    <p id="phoneHelp" className={generalStyle.hint}>The phone won't be visible to anyone
                        unless you allow it to be visible.</p>
                </div>

                {/*password confirm*/}
                <div className={style.twoFieldsWrap}>
                    <div className={generalStyle.fieldLabelWrapper}>
                        <label className={generalStyle.fieldLabel} htmlFor="password">Password</label>
                        <input type="password"
                               id="password"
                               placeholder="Password"
                               value={formData.password}
                               onChange={handleChange}
                               maxLength={30}
                               className={generalStyle.inputField}
                        />
                    </div>

                    <div className={generalStyle.fieldLabelWrapper}>
                        <label className={generalStyle.fieldLabel} htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password"
                               id="passwordConfirm"
                               placeholder="Confirm Password"
                               value={formData.passwordConfirm}
                               onChange={handleChange}
                               maxLength={30}
                               className={generalStyle.inputField}
                        />
                    </div>
                </div>
                {/*//password confirm*/}
                <div className={generalStyle.submitBtnWrap}>
                    <button type="submit" className={generalStyle.submitBtn}>Sign Up</button>
                </div>

                <p className={generalStyle.loginHint}>Already have an account? <NavLink to='/login' className={generalStyle.loginLink}>Log
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