const RandomColor = () => {
    // const backgroundHex = Math.floor(Math.random()*16777215).toString(16)//.slice(2, 8)
    const backgroundHex = Math.random().toString(16).slice(2, 8)
    // console.log(parseInt(backgroundHex, 16))
    let colorHex
    if (parseInt(backgroundHex, 16) > 0x696969)
        colorHex = `181818`
    else colorHex = `E8E8E8`

    return {
        backgroundColor: `#${backgroundHex}`,
        color: `#${colorHex}`
    }
}
export default RandomColor