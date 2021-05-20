import * as seedrandom from 'seedrandom'

const RandomColor = () => {
    // const backgroundHex = Math.floor(Math.random()*16777215).toString(16)//.slice(2, 8)
    const backgroundHex = seedrandom()().toString(16).slice(2, 8)

    // console.log(backgroundHex)

    let colorHex
    if (parseInt(backgroundHex, 16) > 0x696969)
        colorHex = `181818`
    else colorHex = `E8E8E8`

    return {
        backgroundColor: `#${backgroundHex}`,
        color: `#${colorHex}`
    }
}
export default RandomColor;


/**
 #302b36 profile, contacts, menu, search and other solid forms color
 #3c3546 solid forms element hover
 rgba(24, 24, 24, 0.6) background for solid forms

 #443c4c chats, profile bar, chat section

 #75637b messages, chat hover, edit menu scrollbar color
 #786280 messages, contacts scrollbar thumb

 #322834 chat profile bar, message area, active chat,
 #27232a messages & contacts scrollbar track

 #3a3340 messages bg, default messages bg
 input fields gradients:
 border-image: linear-gradient(to right, #24202b 25%, #24202b 40%, #302b36 100%) 1; default
 border-image: linear-gradient(to right, rgba(246, 140, 27, 0.88), #302b36 98%) 1; focus
 border-image: linear-gradient(to right, rgba(49, 246, 27, 0.88), #302b36 98%) 1; success
 border-image: linear-gradient(to right, rgba(246, 27, 27, 0.88), #302b36 98%) 1; fail

 #241d2a color for half transparent menus (message menu, edit message, delete message)
 rgba(36, 29, 42, 0.6) color for transparent menu buttons on hover
* */