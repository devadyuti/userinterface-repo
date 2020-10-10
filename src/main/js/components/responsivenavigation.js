'use strict';

import React, { useState } from 'react';
import {Link, NavLink} from "react-router-dom";
import { slide as Menu } from 'react-burger-menu';
import 'scss/components/responsivenavigation.scss';

function ResponsiveNavigation(props) {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleStateChange = (state) => {
        setMenuOpen(state.isOpen);
    }

    const closeMenu = (clickEvent) => {
        setMenuOpen(false);
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }


    let hamburgermenus = props.menus.map((item) => {
        return (
            <label key={item.id} className="itemwrapper" onClick={closeMenu}>
                <HamnburgerMenuItem menu={item} onClick={closeMenu}/>
            </label>
        )
    });

    return (
        <div className="mobilemenuwrapper" id="outer-container">
            <div className="right">
                <Menu right={true}
                      outerContainerId="outer-container"
                      width="280px"
                      burgerButtonClassName="burger-button"
                      burgerBarClassName="burger-bars"
                      crossButtonClassName="cross-button"
                      crossClassName="cross"
                      menuClassName="menu"
                      morphShapeClassName="morph-shape"
                      itemListClassName="item-list"
                      overlayClassName="overlay"
                      isOpen={menuOpen}
                      onStateChange={(state) => handleStateChange(state)}>
                    {hamburgermenus}
                </Menu>
            </div>
        </div>
    )

}

function HamnburgerMenuItem(props) {
    //var isActive = this.props.location.pathname === this.props.menu.link;
    var activeClassName;
    if(props.menu.link === '#') {
        activeClassName = '';
    } else {
        activeClassName = 'activeitem'
    }
    let exact = [];
    if(props.menu.link === '/') {
        exact = {"exact": true};
    }

    return (
        <>
            {props.menu.external ? (
                <a href={props.menu.link} className="item">
                    <img src={'images/' + props.menu.icon} className="navigationpiccontrol" />
                    &nbsp;&nbsp;&nbsp;
                    <span>{props.menu.name}</span>
                </a>
            ) : (
                <NavLink to={props.menu.link} aria-current="page" {...exact} activeClassName={activeClassName} className="item">
                    <img src={'images/' + props.menu.icon} className="navigationpiccontrol" />
                    &nbsp;&nbsp;&nbsp;
                    <span>{props.menu.name}</span>
                </NavLink>
            )}
        </>
    )

}

export default ResponsiveNavigation;