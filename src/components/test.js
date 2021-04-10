import React, {useState} from 'react';
import axios from "axios";
// document.getElementById("linkInput").defaultValue = "posts";
let fetchData = () => {

    let link = document.getElementById('linkInput').value;
    let number = document.getElementById('numInput').value;

    let URL = `https://jsonplaceholder.typicode.com/${link}/${number}`;
    fetch(URL)
        .then(response => response.json())
        .then(json => console.log(json))
    // .then(json=> document.getElementById('result').innerHTML(json))
}


const Test = () => {

    const [count, setHui] = useState(10)

    return (
        <div>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <label htmlFor="">number</label>
            <input type="number" id={'numInput'}/>
            <label htmlFor="">link</label>
            <select name="" id="linkInput">
                <option value="posts">posts</option>
                <option value="todos">todos</option>
            </select>
            <button onClick={fetchData}>go</button>
            <p id='result'>result</p>

            <br/>
            <br/>
            <br/>

            <button onClick={() =>setHui(prevCount => prevCount + 2)}>Count {count}</button>
        </div>
    )
}





export default Test