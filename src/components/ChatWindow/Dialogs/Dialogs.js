import React from 'react';
import s from './Dialogs.module.css'
import Dialog from "./Dialog/Dialog";



function Dialogs(props) {

    let dialogs = props.dialogsData.map((dialog) =>
        <Dialog key={dialog.id} name={dialog.name} id={dialog.id}/> );

    return (
        <div className={s.dialogs}>
            {dialogs}
            {/*<Dialog name={'Voko'} id={1} isActive={1}/>*/}
            {/*<Dialog name={'kirpich from the dungeon'} id={2}/>*/}
            {/*<Dialog name={'Maria Larikova'} id={3}/>*/}
            {/*<Dialog name={'Danylo Mykhailov'} id={4}/>*/}
            {/*hui hui hui*/}
        </div>
    )
}

export default Dialogs;