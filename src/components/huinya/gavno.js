import React, {useState, useEffect} from 'react';
import style from './test.module.css'
import Timer from "./timer";


const Gavno = () => {
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
    let d = new Date();

    // useEffect(() => {
    //     setTime({
    //         // hours: d.getHours(),
    //         // minutes: d.getMinutes(),
    //         // seconds: d.getSeconds(),
    //         // milliseconds: d.getMilliseconds()
    //         unix: d.getTime()
    //     })
    // })

    return (
        <div className={style.wrap}>
            <div className={style.hui2}>
                <div className={style.cont}>
                    <p>X {x}</p>
                    <p>Y {y}</p>
                </div>

                {/*<div className={style.cont}>{time.hours}:{time.minutes}:{time.seconds}</div>*/}
                <p>{time.unix}</p>
                <p>timer</p>
                <div className={style.cont}>
                    <Timer/>
                </div>
                <p>test</p>
                <button onClick={() => setHui(prevCount => prevCount + 2)}>Count {count}</button>
            </div>
        </div>
    )
}

export default Gavno