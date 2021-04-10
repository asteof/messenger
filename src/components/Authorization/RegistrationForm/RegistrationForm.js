import React, {useState} from 'react';
import s from './registrationForm.module.css';
import g from '../generalAuth.module.css';
import {NavLink} from "react-router-dom";
import axios from "axios";

// import Sockjs f

function RegistrationForm(props) {
    const [registrationData, setRegistrationData] = useState({
        firstname: '',
        lastname: '',
        nickname: '',
        email: '',
        phoneNumber: '',
        password: '',
        passwordConfirm: ''
    })
    // const handleChange = (e) => {
    //     const {id, value} = e.target
    //     setRegistrationData(prevState => ({
    //         ...prevState,
    //         [id]: value
    //     }))
    // }
    const handleChange = e => {
        setRegistrationData(prevRegistrationData => ({
            ...prevRegistrationData, [e.target.id]: e.target.value
        }))
    }
    const handleSubmit = event => {
        event.preventDefault();
        if (registrationData.password === registrationData.passwordConfirm) {
            alert(`hui`)
        } else {
            alert('pizda')
        }
    }
    // const sendDetailsToServer = () => {
    //     if(registrationData.email.length && registrationData.password.length) {
    //         props.showError(null);
    //         const payload={
    //             "email":registrationData.email,
    //             "password":registrationData.password,
    //         }
    //         axios.post(API_BASE_URL+'/user/register', payload)
    //             .then(function (response) {
    //                 if(response.status === 200){
    //                     setRegistrationData(prevState => ({
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
    //     if(registrationData.password === registrationData.confirmPassword) {
    //         // sendDetailsToServer();
    //         alert("hui")
    //     } else {
    //         props.showError('Passwords do not match');
    //     }
    // }

    return (
        <div className={s.formWrap}>
            <div style={{margin: 3 + 'vw'}}>
                <p>First name {registrationData.firstname}</p>
                <p>Last name {registrationData.lastname}</p>
                <p>Nickname {registrationData.nickname}</p>
                <p>Email {registrationData.email}</p>
                <p>Phone number {registrationData.phoneNumber}</p>
                <p>Password {registrationData.password}</p>
                <p>Password confirm {registrationData.passwordConfirm}</p>
            </div>
            <form onSubmit={handleSubmit}>
                {/*firstname lastname*/}
                <div className={s.twoFieldsWrap}>

                    <div className={g.fieldWrapper}>
                        <label className={g.labelWrap} htmlFor="firstName">First name</label>
                        <input type="text"
                               id="firstname"
                               placeholder="Adolf"
                               value={registrationData.firstname}
                               onChange={handleChange}
                        />
                    </div>

                    <div className={g.fieldWrapper}>
                        <label className={g.labelWrap} htmlFor="lastName">Last name</label>
                        <input type="text"
                               id="lastname"
                               placeholder="Obama"
                               value={registrationData.lastname}
                               onChange={handleChange}
                        />
                    </div>

                </div>
                {/*//firstname lastname*/}
                <div className={g.fieldWrapper}>
                    <label className={g.labelWrap} htmlFor="nickname">Nickname</label>
                    <input type="text"
                           id="nickname"
                           placeholder="boobaLover69"
                           value={registrationData.nickname}
                           onChange={handleChange}
                    />
                    <p className={g.hint}>This will be the display name. Other people will be able to find you with
                        this name.</p>
                </div>

                <div className={g.fieldWrapper}>
                    <label className={g.labelWrap} htmlFor="email">Email address</label>
                    <input type="email"
                           id="email"
                           placeholder="adolf-obama48@gmail.com"
                           value={registrationData.email}
                           onChange={handleChange}
                    />
                    <p id="emailHelp" className={g.hint}>No one can see your email.</p>
                </div>


                <div className={g.fieldWrapper}>
                    <label className={g.labelWrap} htmlFor="phoneNumber">Phone number</label>
                    <input type="text"
                           id="phoneNumber"
                           placeholder="380 000 000 000"
                           value={registrationData.phoneNumber}
                           onChange={handleChange}
                    />
                    <p id="phoneHelp" className={g.hint}>The phone won't be visible to anyone
                        unless you allow it to be visible.</p>
                </div>

                {/*password confirm*/}
                <div className={s.twoFieldsWrap}>
                    <div className={g.fieldWrapper}>
                        <label className={g.labelWrap} htmlFor="password">Password</label>
                        <input type="password"
                               id="password"
                               placeholder="Password"
                               value={registrationData.password}
                               onChange={handleChange}
                        />
                    </div>

                    <div className={g.fieldWrapper}>
                        <label className={g.labelWrap} htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password"
                               id="passwordConfirm"
                               placeholder="Confirm Password"
                               value={registrationData.passwordConfirm}
                               onChange={handleChange}
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

            {/*<div className="alert alert-success mt-2" style={{display: registrationData.successMessage ? 'block' : 'none' }} role="alert">*/}
            {/*    {registrationData.successMessage}*/}
            {/*</div>*/}
            {/*<div className="mt-2">*/}
            {/*    <span>Already have an account? </span>*/}
            {/*    <span className="loginText" onClick={() => redirectToLogin()}>Login here</span>*/}
            {/*</div>*/}

        </div>
    )
}

export default RegistrationForm