import React from "react";
import { Cookies } from "react-cookie-consent";

export const setSessionCookie = (name, value) => {
    Cookies.remove(name);
    if(name === 'geolocation') {
        Cookies.set(name, value, {sameSite: 'strict'});
    } else {
        Cookies.set(name, value, {expires: 7, sameSite: 'lax'});
    }
};

export const getSessionCookie = (name) => {
    const sessionCookie = Cookies.get(name);
    if (name === undefined || sessionCookie === undefined) {
        return {};
    } else {
        return JSON.parse(sessionCookie);
    }
};

export const setSessionStorage = (name, value) => {
    sessionStorage.removeItem(name);
    sessionStorage.setItem(name, JSON.stringify(value));
}

export const getSessionStorage = (name, value) => {
    const sessionStore = sessionStorage.getItem(name);
    if (name === undefined || sessionStore === undefined || sessionStore === null) {
        return {};
    } else {
        return JSON.parse(sessionStore);
    }
}

export const SessionContext = React.createContext(getSessionCookie());