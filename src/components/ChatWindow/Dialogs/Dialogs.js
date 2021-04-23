import React, {useState} from 'react';
import style from './Dialogs.module.css'
import Dialog from "./Dialog/Dialog";


function Dialogs(props) {

    /* selectedDialog takes the id of the dialog and passes it to dialog components as props
    clicking on any chosen dialog sets the selectedDialog prop to dialog id
    if the selectedDialog matches with dialog id it displays active CSS class
    otherwise it displays usual dialog class */
    const [selectedDialog, setSelectedDialog] = useState(0)

    let dialogs = props.dialogsData.map((dialog) => (
            <Dialog
                key={dialog.id}
                name={dialog.name}
                id={dialog.id}
                selectedDialog={selectedDialog}
                setSelectedDialog={setSelectedDialog}
            />
        )
    )

    return (
        <div className={style.dialogs}>
            {dialogs}

        </div>
    )
}

export default Dialogs;


// {/*<Dialog name={'Voko'} id={1} isActive={1}/>*/}
//             {/*<Dialog name={'kirpich from the dungeon'} id={2}/>*/}
//             {/*<Dialog name={'Maria Larikova'} id={3}/>*/}
//             {/*<Dialog name={'Danylo Mykhailov'} id={4}/>*/}
//             {/*hui hui hui*/}