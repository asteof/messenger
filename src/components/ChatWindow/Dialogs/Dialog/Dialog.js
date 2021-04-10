import React from 'react';
import s from './dialog.module.css'
import {NavLink} from "react-router-dom";

const Dialog = (props) => {
    let dialogURL = '/chat/' + props.id;

    const dialogClassDefault = s.dialog;
    // const dialogClassActive = s.dialog + ' ' + s.active;
    let dialogClass = dialogClassDefault;
    //
    // if (props.isActive === 1) {
    //     dialogClass = dialogClassActive;
    // }

    return (
        <NavLink to={dialogURL} className={s.dialogLink} activeClassName={s.active}>
            <div className={dialogClass}>
                {props.name}
            </div>
        </NavLink>
    )
}

export default Dialog