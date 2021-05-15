import React, {useState} from 'react';

import style from './test.module.css'

import Fetch from "./fetch";
import Post from "./post";
import LocalStorog from "./localStorog";
import Other from "./other";
import CreateDefaultUsers from "./CreateDefault/createDefaultUsers2";
import ChatFetch from "./ChatFetch";
import Simpler from "./Simpler";
import Arrays from "./arrays";
import RandomColor from "../constants/RandomColor";
import Socket from "./socket";
import SendN from "./sendN";

const Test = () => {
    const [colour, setColour] = useState(RandomColor())
    const color = {
        backgroundColor: colour.backgroundColor,
        border: `4px  solid ${colour.color}`
    }

    return (
        <div className={style.content} style={color}>
            <Other setColour={setColour} colour={colour}/>
            <CreateDefaultUsers/>
            <SendN/>
            <Fetch/>
            <Post/>
            <LocalStorog/>
            <ChatFetch/>
            <Simpler/>
            <Arrays/>
            <Socket/>
        </div>
    )
}

export default Test