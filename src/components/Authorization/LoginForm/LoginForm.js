import React, {useState} from 'react';
import s from './loginForm.module.css';
import g from '../generalAuth.module.css';
import {NavLink} from "react-router-dom";

// import Sockjs f

function RegistrationForm(props) {
    const [loginData, setLoginData] = useState({
        email: '',
        phoneNumber: '',
        password: ''
    })

    const handleChange = e => {
        setLoginData(prevLoginData => ({
            ...prevLoginData, [e.target.id]: e.target.value
        }))
    }
    const handleSubmit = event => {
        event.preventDefault();
            alert(`hui`)
        console.log(loginData)
    }
    // const sendDetailsToServer = () => {
    //     if(loginData.email.length && loginData.password.length) {
    //         props.showError(null);
    //         const payload={
    //             "email":loginData.email,
    //             "password":loginData.password,
    //         }
    //         axios.post(API_BASE_URL+'/user/register', payload)
    //             .then(function (response) {
    //                 if(response.status === 200){
    //                     setLoginData(prevState => ({
    //                         ...prevState,
    //                         'successMessage' : 'Registration successful. Redirecting to home page..'
    //                     }))
    //                     localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
    //                     redirectToHome();
    //                     props.showError(null)
    //                 } else{
    //                     props.showError("Some error ocurred");
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
    //     if(loginData.password === loginData.confirmPassword) {
    //         // sendDetailsToServer();
    //         alert("hui")
    //     } else {
    //         props.showError('Passwords do not match');
    //     }
    // }
    return (
        <div className={s.formWrap}>
            <form onSubmit={handleSubmit}>

                <div className={g.fieldWrapper}>
                    <label className={g.labelWrap} htmlFor="email">Email address</label>
                    <input type="email"
                           id="email"
                           placeholder="adolf-obama48@gmail.com"
                           value={loginData.email}
                           onChange={handleChange}
                    />
                    <p id="emailHelp" className={g.hint}>No one can see your email.</p>
                </div>


                <div className={g.fieldWrapper}>
                    <label className={g.labelWrap} htmlFor="phoneNumber">Phone number</label>
                    <input type="text"
                           id="phoneNumber"
                           placeholder="380 000 000 000"
                           value={loginData.phoneNumber}
                           onChange={handleChange}
                    />
                    <p id="phoneHelp" className={g.hint}>The phone won't be visible to anyone
                        unless you allow it to be visible.</p>
                </div>

                <div className={g.fieldWrapper}>
                    <label className={g.labelWrap} htmlFor="password">Password</label>
                    <input type="password"
                           id="password"
                           placeholder="Password"
                           value={loginData.password}
                           onChange={handleChange}
                    />
                </div>


                <div className={g.submitBtnWrap}>
                    <button type="submit" className={g.submitBtn}>Login</button>
                </div>

                <p className={g.loginHint}> Don't have an account? <NavLink to='/signup' className={g.loginLink}>Sign
                    Up</NavLink></p>
            </form>

            {/*<div className="alert alert-success mt-2" style={{display: loginData.successMessage ? 'block' : 'none' }} role="alert">*/}
            {/*    {loginData.successMessage}*/}
            {/*</div>*/}
            {/*<div className="mt-2">*/}
            {/*    <span>Already have an account? </span>*/}
            {/*    <span className="loginText" onClick={() => redirectToLogin()}>Login here</span>*/}
            {/*</div>*/}

        </div>
    )
}

export default RegistrationForm