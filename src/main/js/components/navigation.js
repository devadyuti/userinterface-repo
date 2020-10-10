'use strict';

import React from 'react';
import {Link, NavLink} from "react-router-dom";
import 'scss/components/navigation.scss'

function Navigation(props) {
    let menus = props.menus.map((item) => {
        if(item.type === 'All') {
            return (
                <MenuItem key={item.id} menu={item} />
            )
        }
    });

    return (
        <div className="menubar">
            <div className="container">
                <div className="tabwrapper">
                    <nav id="page-nav">
                        <ul>
                            {menus}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

function MenuItem(props) {
    var activeClassName;
    if(props.menu.link === '#') {
        activeClassName = '';
    } else {
        activeClassName = 'activetab'
    }

    return (
        <li>
            {props.menu.external ? (
                <a target="blank" href={props.menu.link}>
                    {props.menu.name}
                </a>
            ) : (
                <NavLink to={props.menu.link} activeClassName={activeClassName} >
                    {props.menu.name}
                </NavLink>
            )}

        </li>
    )
}

export default Navigation;