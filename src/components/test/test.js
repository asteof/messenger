import React, {useState} from 'react';
import style from './test.module.css'
import Fetch from "./fetch";
import Post from "./post";
import LocalStorog from "./localStorog";
import Other from "./other";
import CreateDefaultUsers from "./CreateDefault/createDefaultUsers2";
import ChatFetch from "./ChatFetch";
import Simpler from "./Simpler";
import RandomColor from "../../constants/RandomColor";
import Socket from "./socket";
import SendN from "./sendN";
import TestSearch from "./testSearch";
import {NavLink} from "react-router-dom";

const Test = () => {
    const [colour, setColour] = useState(RandomColor())
    const color = {
        backgroundColor: colour.backgroundColor,
        border: `4px  solid ${colour.color}`
    }

    return (
        <div className={style.content} style={color}>
            <nav>
                <NavLink to='/signup' className='link'>Sign Up</NavLink>
                <NavLink to='/login' className='link'>Login</NavLink>
                <NavLink to='/chat' className='link'>Chat</NavLink>
                <NavLink to='/test' className='link'>Test</NavLink>
            </nav>
            <Other setColour={setColour} colour={colour}/>
            <CreateDefaultUsers/>
            <SendN/>
            <TestSearch/>
            <ChatFetch/>
            <Simpler/>
            <Socket/>
            <LocalStorog/>
            <Fetch/>
            <Post/>
        </div>
    )
}

export default Test;
