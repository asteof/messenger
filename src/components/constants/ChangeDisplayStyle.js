const displayBlock = (setState) => {
    setState(prevDisplay => ({
        ...prevDisplay, display: 'block'
    }))
}
const displayNone = (setState) => {
    setState(prevDisplay => ({
        ...prevDisplay, display: 'none'
    }))
}


const toggleBoolean = (setBooleanState) => {
    setBooleanState(prevState => !prevState)
}

const setTrueBoolean = (setBooleanState) => {
    setBooleanState(true)
}

const setFalseBoolean = (setBooleanState) => {
    setBooleanState(false)
}

export {displayBlock, displayNone, toggleBoolean, setTrueBoolean, setFalseBoolean}