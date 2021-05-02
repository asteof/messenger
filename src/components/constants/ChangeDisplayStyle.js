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
    setBooleanState(prevState => !prevState)
}

const setFalseBoolean = (setBooleanState) => {
    setBooleanState(prevState => !prevState)
}

export {displayBlock, displayNone, toggleBoolean, setTrueBoolean, setFalseBoolean}