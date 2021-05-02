import React, {useState, useEffect} from 'react';
import style from './test.module.css'
import Timer from "./timer";
import RandomColor from "../ChatWindow/ProfileBar/RandomColor";


const Other = () => {
    const [count, setHui] = useState(10)

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

    const [time, setTime] = useState({
        hours: 0, minutes: 0, seconds: 0, milliseconds: 0, unix: 0
    })
    // let d = new Date();
    const [colour, setColour] = useState({})

    const click = () => {
        setHui(prevCount => prevCount + 2)
        setColour(RandomColor())
    }
    // useEffect(()=>{
    //     // console.log('state colour', colour)
    // }, [colour])

    return (
        <div className={style.wrap}>
            <div className={style.hi2}>
                <div className={style.cont} style={colour}>
                    <p className={style.hueDivide}>X {x}</p>
                    <p className={style.hueDivide}>Y {y}</p>
                </div>

                {/*<div className={style.cont}>{time.hours}:{time.minutes}:{time.seconds}</div>*/}
                <p>{time.unix}</p>
                <p>timer</p>
                <div className={style.cont}>
                    <Timer/>
                </div>
                <p>test</p>
                <p><code>{JSON.stringify(colour)}</code></p>
                <button onClick={click}
                        style={colour}>Count {count}</button>
            </div>
        </div>
    )
}

export default Other