import React, {useState, useEffect} from 'react';
import style from './test.module.css'
import {setLocalWithExpiry, getLocalWithExpiry} from "../Authorization/localStorage";

const LocalStorog = () => {
    const [createItem, setCreateItem] = useState({
        key: 'key',
        value: '',
        expiry: 15
    })
    const handleChange = (e) => {
        setCreateItem(prevItem => ({...prevItem, [e.target.id]: e.target.value}))
    }

    const setL = () => {
        setLocalWithExpiry(createItem.key, createItem.value, createItem.expiry)
    }


    const [receivedItem, setReceivedItem] = useState({
        value: '',
        TTL: 0
    })
    const getL = () => {
        let localStorageItem = getLocalWithExpiry(createItem.key)

        if (localStorageItem === null) {
            setReceivedItem(() => ({'value': 'No values found for this key', 'TTL': 0}))
        } else {
            let [localStorageItemValue, localStorageItemTTL] = localStorageItem
            setReceivedItem(() => ({'value': localStorageItemValue, 'TTL': localStorageItemTTL}))
        }
    }


    return (
        <div className={style.wrap}>
            <div className={style.hint}>Input key, value.
                Click "Set" button to create LocalStorage item.
                Click "Get" button to create LocalStorage item
            </div>

            <div id='display'>{receivedItem.value} <span>{receivedItem.TTL}</span></div>
            <div id='display'>{JSON.stringify(createItem)}</div>
            <div>
                <input type="text"
                       id='key'
                       placeholder='key'
                       value={createItem.key}
                       onChange={handleChange}/>
                <input type="text"
                       id='value'
                       placeholder='value'
                       value={createItem.value}
                       onChange={handleChange}/>
                <input type="number"
                       id='expiry'
                       placeholder='ttl'
                       value={createItem.expiry}
                       onChange={handleChange}/>
                <div>
                    <button type='button' id='btn-set' onClick={setL} className={style.submitBtn}>Set</button>
                    <button type='button' id='btn-get' onClick={getL} className={style.submitBtn}>Get</button>
                </div>
            </div>
        </div>
    )
}

export default LocalStorog