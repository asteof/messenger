import React, {useState} from 'react';
import s from './registrationForm.module.css';
import g from '../generalAuth.module.css';
import {NavLink} from "react-router-dom";
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

    const handleChange = e => {
        setFormData(prevFormData => ({
            ...prevFormData, [e.target.id]: e.target.value
        }))
    }
    const handleSubmit = e => {
        e.preventDefault();
        if (formData.password === formData.passwordConfirm) {
            alert(`hui`)
            sendDataToServer()
        } else {
            alert('pizda')
        }
    }

    const sendDataToServer = () => {
        const registrationData = {
            firstname: formData.firstname,
            lastname: formData.lastname,
            username: formData.username,
            email: formData.email,
            password: formData.password
        }
        alert(JSON.stringify(registrationData))

        axios.post('http://localhost:8080/sign-up', registrationData)
            .then(response => {
                alert(response)
                console.log(`${response.data} ${response.status} ${response.data}`)
            })
            .catch(error => {
                alert(error)
                console.log(error)
            })

    }

    // const sendDetailsToServer = () => {
    //     if(formData.email.length && formData.password.length) {
    //         props.showError(null);
    //         const payload={
    //             "email":formData.email,
    //             "password":formData.password,
    //         }
    //         axios.post(API_BASE_URL+'/user/register', payload)
    //             .then(function (response) {
    //                 if(response.status === 200){
    //                     setFormData(prevState => ({
    //                         ...prevState,
    //                         'successMessage' : 'Registration successful. Redirecting to home page..'
    //                     }))
    //                     localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
    //                     redirectToHome();
    //                     props.showError(null)
    //                 } else{
    //                     props.showError("Some error occurred");
    //                 }
    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //             });
    //     } else {
    //         props.showError('Please enter valid username and password')
    //     }
    //
    // }
    // const redirectToHome = () => {
    //     props.updateTitle('Home')
    //     props.history.push('/home');
    // }
    // const redirectToLogin = () => {
    //     props.updateTitle('Login')
    //     props.history.push('/login');
    // }
    // const handleSubmitClick = (e) => {
    //     e.preventDefault();
    //     if(formData.password === formData.confirmPassword) {
    //         // sendDetailsToServer();
    //         alert("hui")
    //     } else {
    //         props.showError('Passwords do not match');
    //     }
    // }

    return (
        <div className={s.formWrap}>

            <form onSubmit={handleSubmit}>
                {/*firstname lastname*/}
                <h3>Personal information</h3>
                <div className={s.twoFieldsWrap}>

                    <div className={g.fieldLabelWrapper}>
                        <input type="text"
                               id="firstname"
                               placeholder="First name*"
                               value={formData.firstname}
                               onChange={handleChange}
                               maxLength={20}
                        />
                    </div>

                    <div className={g.fieldLabelWrapper}>
                        <input type="text"
                               id="lastname"
                               placeholder="Last name*"
                               value={formData.lastname}
                               onChange={handleChange}
                               maxLength={20}
                        />
                    </div>

                </div>
                {/*//firstname lastname*/}


                <div className={g.fieldLabelWrapper}>
                    <input type="text"
                           id="username"
                           placeholder="Username*"
                           value={formData.username}
                           onChange={handleChange}
                           maxLength={28}
                    />
                    <p className={g.hint}>This will be the display name. Other people will be able to find you with
                        this name.</p>
                </div>

                <div className={g.fieldLabelWrapper}>
                    <input type="email"
                           id="email"
                           placeholder="Email Address*"
                           value={formData.email}
                           onChange={handleChange}
                           maxLength={50}
                    />
                    <p id="emailHelp" className={g.hint}>No one can see your email.</p>
                </div>


                <div className={g.fieldLabelWrapper}>
                    <label className={g.labelWrap} htmlFor="phoneNumber">Phone number*</label>
                    <input type="text"
                           id="phoneNumber"
                           placeholder="+380 000 000 000"
                           value={formData.phoneNumber}
                           onChange={handleChange}
                           maxLength={13}
                    />
                    <p id="phoneHelp" className={g.hint}>The phone won't be visible to anyone
                        unless you set it to be visible.</p>
                </div>

                {/*password confirm*/}
                <div className={s.twoFieldsWrap}>
                    <div className={g.fieldLabelWrapper}>
                        <input type="password"
                               id="password"
                               placeholder="Password*"
                               value={formData.password}
                               onChange={handleChange}
                               maxLength={30}
                        />
                    </div>

                    <div className={g.fieldLabelWrapper}>
                        <input type="password"
                               id="passwordConfirm"
                               placeholder="Repeat Password*"
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