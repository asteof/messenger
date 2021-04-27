export const setLocalWithExpiry = (key, value, ttl) => {
    const creationDate = new Date()
    /* `item` is an object which contains the original value
    as well as the time when it's supposed to expire*/
    const item = {
        value: value,
        expiry: creationDate.getTime() + (ttl * 1000),
    }
    localStorage.setItem(key, JSON.stringify(item))
}

//production
export const getLocalWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) {
        return null
    }
    const item = JSON.parse(itemStr)
    const currentTimestamp = new Date()
    // compare the expiry time of the item with the current time
    if (currentTimestamp.getTime() > item.expiry) {
        /* If the item is expired, delete the item from storage and return null*/
        localStorage.removeItem(key)
        return null
    }//returns value of item
    return item.value
}

//for testing and debugging purposes
export const getLocalWithExpiryTest = (key) => {
    const itemStr = localStorage.getItem(key)
    // if the item doesn't exist, return null
    if (!itemStr) {
        return null
    }
    const item = JSON.parse(itemStr)
    const currentTimestamp = new Date()
    // compare the expiry time of the item with the current time
    if (currentTimestamp.getTime() > item.expiry) {
        /* If the item is expired, delete the item from storage
        and return null*/
        localStorage.removeItem(key)
        return null
    }
    let newTTL = Math.abs(currentTimestamp.getTime() - item.expiry)
    //returns array
    return [item.value, newTTL]
}
