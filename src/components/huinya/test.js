import React from 'react';

import style from './test.module.css'

import Fetch from "./fetch";
import Post from "./post";
import LocalStorog from "./localStorog";
import Gavno from "./gavno";
import CreateDefaultUsers from "./createDefaultUsers";
import ChatFetch from "./ChatFetch";
import SimpleGetUser from "./simpleGetUser";

const Test = () => {

    return (
        <div className={style.content}>
            <Gavno/>
            <Fetch/>
            <Post/>
            <LocalStorog/>
            <CreateDefaultUsers/>
            <ChatFetch/>
            <SimpleGetUser/>
        </div>
    )
}

export default Test