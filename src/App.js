// import logo from './logo.svg';
// import {MessageProvider} from "./components/context/messageContext";
import Header from "./components/Header/Header";
import './App.css';
import React, {useEffect, useState} from 'react';
import RegistrationForm from "./components/Authorization/RegistrationForm/RegistrationForm.js"
import ChatWindow from "./components/ChatWindow/ChatWindow";
import LoginForm from "./components/Authorization/LoginForm/LoginForm";
import Test from "./components/huinya/test"
// import RegF from "./components/Authorization/RegistrationForm/RegFTest";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {getLocalWithExpiry} from "./components/Authorization/localStorage";
// import axios from "axios";
// import {SECURED_API_PATH} from "./components/constants/API_PATH_DEFAULT";

function App() {


    // const [tokenExpired, setTokenExpired] = useState(false)
    // tokenExpired={tokenExpired}
    // setTokenExpired={setTokenExpired}

    /* this state defines if the user is logged in
    according to value of this state user is redirected to /chat or to /login pages
    */
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const JWT = getLocalWithExpiry('token')

        if (JWT !== null && JWT !== "") {
            setIsLoggedIn(true)
        } else if (JWT === null || JWT === "") {
            setIsLoggedIn(false)
        }
    }, [isLoggedIn])

    // useEffect(() => {
    //     // const JWT = getLocalWithExpiry('token')
    //     if (isLoggedIn) {
    //
    //     }
    // }, [JWT])

    return (
        <Router>
            <div className="App">
                <Header
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}/>
                <div className="content">
                    <Switch>
                        {/*if user tries to access / route he will be redirected regardless of isLoggedIn value
                        if the user is logged in /chat opens
                        if the user is not logged in /login page opens
                        */}
                        <Route exact path="/">
                            {isLoggedIn ? <Redirect to="/chat"/> : <Redirect to="/login"/>}
                        </Route>

                        {/* this route forbids user to go to /login page after he had authorized*/}
                        {/*//comment lines marked by 1 to access /login route after authorizing*/}
                        <Route path='/login'>
                            {isLoggedIn === false ?         //1
                                <LoginForm
                                    setIsLoggedIn={setIsLoggedIn}
                                    // currentUser={currentUser}
                                    // setCurrentUser={setCurrentUser}
                                />
                                : <Redirect to="/chat"/>    //1
                            }
                        </Route>

                        <Route path='/test'>
                            <Test/>
                        </Route>

                        {/* this route forbids user to go to /signup page after he had authorized*/}
                        <Route path='/signup'>
                            {isLoggedIn ? <Redirect to="/chat"/> : <RegistrationForm/>}
                        </Route>

                        <Route path='/chat'>
                            <ChatWindow
                                isLoggedIn={isLoggedIn}
                                setIsLoggedIn={setIsLoggedIn}
                                currentUser={currentUser}
                                setCurrentUser={setCurrentUser}
                            />
                        </Route>

                    </Switch>
                </div>
                {/*  content  */}
            </div>
            {/*  app  */}
        </Router>
    );
}

export default App;
