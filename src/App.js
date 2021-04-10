import logo from './logo.svg';
import Header from "./components/Header/Header";
import './App.css';
import React, {useState} from 'react';
import RegistrationForm from "./components/Authorization/RegistrationForm/RegistrationForm.js"
import ChatWindow from "./components/ChatWindow/ChatWindow";
import LoginForm from "./components/Authorization/LoginForm/LoginForm";
import Test from "./components/test"
import {BrowserRouter, Route} from "react-router-dom";
import {MessageProvider} from "./components/context/messageContext";



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
        <BrowserRouter>
            <div className="App">
                <Header/>
                <div className="content">
                    <Route path='/login' render={() => <LoginForm/>}/>
                    <Route path='/test' render={() => <Test/>}/>
                    <Route path='/signup' render={() => <RegistrationForm/>}/>
                    {/*<MessageProvider value={messagesData}>*/}
                        <Route path='/chat'
                               render={() => <ChatWindow />}/>
                    {/*</MessageProvider>*/}
                </div>

            </div>
        </BrowserRouter>
    );
}

export default App;
