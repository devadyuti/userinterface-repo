'use strict';

import React  from 'react';
import 'scss/components/title.scss'
import countries from "../common/countries";

function Title(props) {
    let message;
    if(props.icon) {
        message =
            <>
                {props.message} <img src={"/images/" + props.icon} />
            </>
    } else {
        message =
            <>
                {props.message}
            </>
    }

    return (
        <p key={props.index} className="titleholder">
            <label className="title">{message}</label>
        </p>
    )
}

export default Title;