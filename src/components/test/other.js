import React, {useEffect, useState} from 'react';
import style from './test.module.css'
import Timer from "./timer";
import RandomColor from "../../constants/RandomColor";
import axios from "axios";


const Other = ({colour, setColour}) => {
    const [count, setCount] = useState(10)

    const [x, setX] = useState(0)
    const [y, setY] = useState(0)


    const logMousePosition = (e) => {
        setX(e.clientX)
        setY(e.clientY)
    }

    useEffect(() => {
        console.log('effect run')
        window.addEventListener('mousemove', logMousePosition)

        return () => {
            window.removeEventListener('mousemove', logMousePosition)
        }
    }, [])

    // const [time, setTime] = useState({
    //     hours: 0, minutes: 0, seconds: 0, milliseconds: 0, unix: 0
    // })
    // let d = new Date();

    const click = () => {
        setCount(prevCount => prevCount + 2)
        setColour(RandomColor())
    }


    const bar = (id) => {
        return axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => {
                console.log(response)
                return response
            })
            .catch(err => {
                console.log(err)
            })
    }

    const foo = async () => {
        // let result = await bar(); // wait until the promise resolves (*)
        // let result = await resolveAfter2Seconds(1); // wait until the promise resolves (*)
        let result = await bar(24)

        console.log(result); // "done!"
    }


    return (
        <div className={style.wrap}>
            <div className={style.flex}>
                <div className={style.cont} style={colour}>
                    <p className={style}>X {x}</p>
                    <p className={style}>Y {y}</p>
                </div>

                {/*<div className={style.cont}>{time.hours}:{time.minutes}:{time.seconds}</div>*/}
                <p>0</p>
                <p>timer</p>
                <div className={style.cont}>
                    <Timer/>
                </div>
                <p>test</p>
                <p className={style.hold}><code>{JSON.stringify(colour)}</code></p>
                <div>
                    <button onClick={click}
                            className={style.submitBtn}
                            style={colour}>Count {count}</button>
                </div>
                <button className={`${style.submitBtn} ${style.nopadding} ${style.hint}`}
                        onClick={foo}>button
                </button>
            </div>
        </div>
    )
}

export default Other
