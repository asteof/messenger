import React, {useEffect, useState} from 'react';

const Timer = () => {
    const [count2, setCount2] = useState(0)

    const tick = () => {
        setCount2(prevC => prevC + 1)
    }

    useEffect(() => {
        // console.log('useEffect called')
        const int = setInterval(tick, 1000)

        return () => {
            clearInterval(int)
        }
    }, [])

    return (
        <h1>
            {count2}
        </h1>
    );
}


export default Timer;
