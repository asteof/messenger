// import logo from './logo.svg';
// import {MessageProvider} from "./components/context/messageContext";
import Header from "./components/Header/Header";
import './App.css';
import React from 'react';
import RegistrationForm from "./components/Authorization/RegistrationForm/RegistrationForm.js"
import ChatWindow from "./components/ChatWindow/ChatWindow";
import LoginForm from "./components/Authorization/LoginForm/LoginForm";
import Test from "./components/huinya/test"
import RegF from "./components/Authorization/RegistrationForm/RegFTest";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";


function App(props) {

    // let messagesData = [
    //     {id: 1, text: 'Hui', fromMe: false},
    //     {id: 2, text: 'Pizda', fromMe: true},
    //     {id: 3, text: 'Skovoroda'},
    //     {id: 4, text: 'Ponimayu', fromMe: true},
    //     {id: 5, text: 'Ne ponimayu'},
    //     {id: 6, text: 'Spravedliva', fromMe: true},
    //     {id: 7, text: 'Ne spravedliva'},
    //     {id: 8, text: 'Sliva'},
    //     {id: 9, text: 'Sliva'},
    //     {id: 10, text: 'Sliva'},
    //     {id: 11, text: 'Sliva', fromMe: true},
    //     {id: 12, text: 'Sliva'},
    //     {id: 13, text: 'Sliva'}
    // ]
    //messagesData={messagesData}

    return (
        <Router>
            <div className="App">
                <Header/>
                <div className="content">
                    <Switch>
                        {/*<Route exact path="/">*/}
                            {/*{loggedIn ? <Redirect to="/chat"/> : <LoginForm/>}*/}
                        {/*</Route>*/}
                        <Route exact path='/' render={() => <LoginForm/>}/>
                        <Route path='/login' render={() => <LoginForm/>}/>
                        <Route path='/test' render={() => <Test/>}/>
                        <Route path='/signup' render={() => <RegistrationForm/>}/>
                        {/*<MessageProvider value={messagesData}>*/}
                        <Route path='/chat'
                               render={() => <ChatWindow/>}/>
                        {/*</MessageProvider>*/}
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
