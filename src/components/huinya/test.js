import React from 'react';

import Fetch from "./fetch";
import Post from "./post";
import LocalStorog from "./localStorog";
import Gavno from "./gavno";

const Test = () => {

    return (
        <>
            <Gavno/>
            <Fetch/>
            <Post/>
            <LocalStorog/>
        </>
    )
}

export default Test