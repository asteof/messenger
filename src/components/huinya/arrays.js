import React, {useState} from 'react';
import style from './test.module.css'

const Arrays = () => {

    const hello = {
        hello: 'voko',
        foo: 'const'
    };
    const qaz = {
        hello: 'kirpich',
        foo: 'let'
    }
    let myArray = [];
    myArray.push(hello, qaz);
    const [clicked, setClicked] = useState(false);

    const click = () => {
        console.log(myArray)
        const pos = myArray.map(function(e) { return e.hello; }).indexOf('kirpich');
        const indexOfStevie = myArray.findIndex(i => i.hello === "kirpich");
        const Stevie = myArray.find(f => f.hello === "kirpich");
        setClicked(true)
        console.log('pos', pos)
        console.log('indexOfStevie', indexOfStevie)
        console.log('Stevie', Stevie)
        console.log(clicked)
    }



    return (
        <div className={style.wrap}>
            {clicked? <p>Check console</p>:null}
            <button type='button'
                    onClick={click}
                    className={style.submitBtn}>Click</button>
        </div>
    )
}

export default Arrays