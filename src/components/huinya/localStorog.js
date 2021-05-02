import React, {useState} from 'react';
import style from './test.module.css'
import {setLocalWithExpiry, getLocalWithExpiryTest} from "../Authorization/localStorage";

const LocalStorog = () => {
    const [createItem, setCreateItem] = useState({
        key: 'key',
        value: 'value',
        expiry: 16
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
        let localStorageItem = getLocalWithExpiryTest(createItem.key)

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
                Click "Get" button to retrieve LocalStorage item
            </div>

            <div id='display'>Get: {receivedItem.value} {receivedItem.TTL}</div>
            <div id='display'>Set: <code>{JSON.stringify(createItem)}</code></div>
            <div>
                <input type="text"
                       id='key'
                       placeholder='key'
                       value={createItem.key}
                       onChange={handleChange}
                       onFocus={e=>{e.target.value = ''}}
                       className={style.inputField}
                />

                <input type="text"
                       id='value'
                       placeholder='value'
                       value={createItem.value}
                       onChange={handleChange}
                       onFocus={e=>{e.target.value = ''}}
                       className={style.inputField}
                />

                <input type="number"
                       id='expiry'
                       placeholder='ttl'
                       value={createItem.expiry}
                       onChange={handleChange}
                       className={style.inputField}
                />
                <div>
                    <button type='button' id='btn-set' onClick={setL} className={style.submitBtn}>Set</button>
                    <button type='button' id='btn-get' onClick={getL} className={style.submitBtn}>Get</button>
                </div>
            </div>
        </div>
    )
}

export default LocalStorog