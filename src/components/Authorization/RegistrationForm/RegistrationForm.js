import React, {useState} from 'react';
import s from './registrationForm.module.css';
import g from '../generalAuth.module.css';
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
        <div className={s.formWrap}>

            <form onSubmit={handleSubmit}>
                {/*firstname lastname*/}
                <div className={s.twoFieldsWrap}>

                    <div className={g.fieldLabelWrapper}>
                        <label className={g.labelWrap} htmlFor="firstName">First name<span>*</span></label>
                        <input type="text"
                               id="firstname"
                               placeholder="Adolf"
                               value={formData.firstname}
                               onChange={handleChange}
                               maxLength={20}
                        />
                    </div>

                    <div className={g.fieldLabelWrapper}>
                        <label className={g.labelWrap} htmlFor="lastName">Last name</label>
                        <input type="text"
                               id="lastname"
                               placeholder="Obama"
                               value={formData.lastname}
                               onChange={handleChange}
                               maxLength={20}
                        />
                    </div>

                </div>
                {/*//firstname lastname*/}
                <div className={g.fieldLabelWrapper}>
                    <label className={g.labelWrap} htmlFor="username">Username</label>
                    <input type="text"
                           id="username"
                           placeholder="boobaLover69"
                           value={formData.username}
                           onChange={handleChange}
                           maxLength={28}
                    />
                    <p className={g.hint}>This will be the display name. Other people will be able to find you with
                        this name.</p>
                </div>

                <div className={g.fieldLabelWrapper}>
                    <label className={g.labelWrap} htmlFor="email">Email address</label>
                    <input type="email"
                           id="email"
                           placeholder="adolf-obama48@gmail.com"
                           value={formData.email}
                           onChange={handleChange}
                           maxLength={50}
                    />
                    <p id="emailHelp" className={g.hint}>No one can see your email.</p>
                </div>


                <div className={g.fieldLabelWrapper}>
                    <label className={g.labelWrap} htmlFor="phoneNumber">Phone number</label>
                    <input type="text"
                           id="phoneNumber"
                           placeholder="380 000 000 000"
                           value={formData.phoneNumber}
                           onChange={handleChange}
                           maxLength={12}
                    />
                    <p id="phoneHelp" className={g.hint}>The phone won't be visible to anyone
                        unless you allow it to be visible.</p>
                </div>

                {/*password confirm*/}
                <div className={s.twoFieldsWrap}>
                    <div className={g.fieldLabelWrapper}>
                        <label className={g.labelWrap} htmlFor="password">Password</label>
                        <input type="password"
                               id="password"
                               placeholder="Password"
                               value={formData.password}
                               onChange={handleChange}
                               maxLength={30}
                        />
                    </div>

                    <div className={g.fieldLabelWrapper}>
                        <label className={g.labelWrap} htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password"
                               id="passwordConfirm"
                               placeholder="Confirm Password"
                               value={formData.passwordConfirm}
                               onChange={handleChange}
                               maxLength={30}
                        />
                    </div>
                </div>
                {/*//password confirm*/}
                <div className={g.submitBtnWrap}>
                    <button type="submit" className={g.submitBtn}>Sign Up</button>
                </div>

                <p className={g.loginHint}>Already have an account? <NavLink to='/login' className={g.loginLink}>Log
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