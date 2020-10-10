'use strict';

import React from 'react';
import {NavLink, Link} from "react-router-dom";
import 'scss/components/header.scss'
import {getSessionCookie, getSessionStorage} from "../common/session";

function Header(props) {
    let count = 0;
    const servEaseCountry = getSessionCookie('servEaseCountry');
    let countryCode;
    if(props.country.country_code !== undefined) {
        countryCode = props.country.country_code;
    } else if(Object.keys(servEaseCountry).length !== 0 || servEaseCountry.constructor !== Object) {
        countryCode = servEaseCountry.country_code;
    } else {
        let geolocationData = getSessionStorage('geolocation');
        countryCode = geolocationData.country_code;
    }
    let menus = props.menus.map((item) => {
        let separator = '   |   ';
        if(item.position === 'Header') {
            count++
            return (
                item.external ?
                    <a target="blank" href={item.link}>
                        {count > 1 ? separator + item.name : item.name}
                    </a>
                :
                    <NavLink key={item.id} to={item.link}>
                        {count > 1 ? separator + item.name : item.name}
                    </NavLink>
            )
        }
    });

    return (
        <div className="headerbar">
            <div className="container">
                <div className="header">
                    <div className="serveaselogo">
                        <NavLink to="/">
                            <img src="/images/servease-banner-new.png" />
                        </NavLink>
                    </div>
                    <Links menus={menus}/>
                </div>
            </div>
        </div>
    )

}

function ServEaseLanguage(props) {
    return (
        <div className="visitorlanguage">
            <label className="headertext">
                <img src="/images/icon-english.png" alt="English" />&nbsp;&nbsp;
            </label>
        </div>
    )
}

function Links(props) {
    return (
        <div className="links">
            <label className="visitorlanguage">
                <img src="/images/icon-english.png" alt="English" />&nbsp;&nbsp;
            </label>
            <label className="headertext">
                {props.menus}
            </label>
        </div>
    )
}

export default Header;