import React from 'react';

import style from './test.module.css'

import Fetch from "./fetch";
import Post from "./post";
import LocalStorog from "./localStorog";
import Other from "./other";
import CreateDefaultUsers from "./createDefaultUsers";
import ChatFetch from "./ChatFetch";
import SimpleGetUser from "./SimpleGetUser";
import Arrays from "./arrays";

const Test = () => {

    return (
        <div className={style.content}>
            <Other/>
            <Fetch/>
            <Post/>
            <LocalStorog/>
            <CreateDefaultUsers/>
            <ChatFetch/>
            <SimpleGetUser/>
            <Arrays/>
        </div>
    )
}

export default Test