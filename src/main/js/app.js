'use strict';

import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import CookieConsent from "react-cookie-consent";
import ReactGA from 'react-ga';
import countries from "./common/countries";
import {SessionContext, getSessionCookie, setSessionCookie, setSessionStorage, getSessionStorage} from "common/session";
import {useApi, useFetch} from "./common/hook";
import ResponsiveNavigation from "./components/responsivenavigation";
import Header from './components/header';
import Navigation from './components/navigation'
import Footer from './components/footer'
import Home from './pages/home';
import Loader from "./components/loader";
import Error from "./pages/error";
import 'scss/app.scss';

ReactGA.initialize('UA-166140741-1');
const history = createBrowserHistory();
history.listen(location => {
    ReactGA.set({ page: location.pathname })
    ReactGA.pageview(location.pathname)
})

function App(props) {
    const [api, index] = useApi(window.location.hostname, window.location.protocol, 'api');
    const [menuList, menuLoading] = useFetch(api + '/core/menuList/' + true, 'menu');
    const [geolocationData, geolocationLoading] = useFetch('https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572/', 'geolocation');
    const [servEaseCountry, setServEaseCountry] = useState({
        country_code : '',
        country_name : ''
    });
    const validCountries = ['GB', 'IN'];
    const [session] = useState(getSessionCookie);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, [])

    useEffect(() => {
        let servEaseCountryDetails = getSessionCookie('servEaseCountry');
        if(Object.keys(servEaseCountryDetails).length === 0 && servEaseCountryDetails.constructor === Object) {
            let countryMatch = false;
            for(let i in validCountries) {
                if(geolocationData.country_code === validCountries[i]) {
                    countryMatch = true;
                }
            }
            if(countryMatch) {
                setServEaseCountry(servEaseCountry => ({...servEaseCountry, country_code: geolocationData.country_code, country_name: geolocationData.country_name}));
                setSessionCookie('servEaseCountry', {country_code: geolocationData.country_code, country_name: geolocationData.country_name});
            } else {
                setServEaseCountry(servEaseCountry => ({...servEaseCountry, country_code: 'GB', country_name: countries['GB']}));
                setSessionCookie('servEaseCountry', {country_code: 'GB', country_name: countries['GB']});
            }
        } else {
            setServEaseCountry(servEaseCountry => ({...servEaseCountry, country_code: servEaseCountryDetails.country_code, country_name: servEaseCountryDetails.country_name}));
        }
    }, [geolocationData]);

    const getServEaseCountry = (servEaseCountryCallBack) => {
        if(servEaseCountryCallBack.country_code !== servEaseCountry.country_code) {
            setServEaseCountry({...servEaseCountry, country_code: servEaseCountryCallBack.country_code, country_name: servEaseCountryCallBack.country_name});

            setSessionCookie('servEaseCountry', servEaseCountryCallBack);
        }
    }

    return (
        <SessionContext.Provider value={session}>
            <Router history={history}>
                <div>
                    <CookieConsent
                        location="bottom"
                        buttonText="Accept"
                        declineButtonText="Decline"
                        cookieName="ServEaseCookie"
                        containerClasses="cookieconsentcontainer"
                        contentClasses="cookieconsentcontent"
                        buttonClasses="cookieconsentbutton"
                        declineButtonClasses="cookiedeclinebutton"
                        expires={30}
                        enableDeclineButton={false}
                        onDecline={() => {
                            console.log("User has declined to cookies");
                        }}>
                        <p>
                            This website stores cookies on your device. These cookies are used to collect information about how you interact with our website and allow us to remember you.
                            We use this information in order to improve and customize your browsing experience and for analytics and metrics about our visitors both on this website and other media. To find out more about the cookies we use, see our Privacy Policy.</p>
                        <p>
                            If you decline, your information won’t be tracked when you visit this website. A single cookie will be used in your browser to remember your preference not to be tracked.
                        </p>
                    </CookieConsent>
                    {menuLoading || geolocationLoading ? (
                        <Loader loading={menuLoading || geolocationLoading} />
                    ) : (
                        <>
                            <ResponsiveNavigation menus={menuList} />
                            <Header country={servEaseCountry} menus={menuList} />
                            <Navigation menus={menuList} />
                            <Switch>
                                <Route
                                    exact path="/"
                                    render={() => <Home servEaseCountryCallBack={getServEaseCountry} geolocationData={geolocationData} api={api} />}
                                />
                                <Route
                                    render={(props) => <Error {...props} api={api} />}
                                />
                            </Switch>
                            <Footer menus={menuList} />
                        </>
                    )}
                </div>
            </Router>
        </SessionContext.Provider>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
