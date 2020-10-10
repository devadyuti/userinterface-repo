import { useState, useEffect } from "react";
import {SessionContext, getSessionCookie, setSessionCookie, getSessionStorage, setSessionStorage} from "./session";

function useApi(hostname, protocol, key) {
    let url;
    let index = true;
    let obj = getSessionStorage(key);
    if(Object.keys(obj).length === 0 && obj.constructor === Object) {
        if(hostname === 'servease.io' || hostname === 'account.servease.io') {
            url = protocol + '//'  + 'api.servease.io';
        } else {
            url = protocol + '//'  + hostname;
            index = false;
        }
        if(key) {
            setSessionStorage(key, {api: url});
        }
    } else {
        if(hostname === 'localhost' || hostname === 'dev.servease.io' || hostname === 'uat.servease.io') {
            index = false;
        }
        url = obj.api;
    }

    return [url, index];
}

function useFetch(url, key) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUrl();
    }, []);

    async function fetchUrl() {
        let json;
        let obj;
        if(key === 'geolocation') {
            obj = getSessionCookie(key)
        } else {
            obj = getSessionStorage(key);
        }
        if(Object.keys(obj).length === 0 && obj.constructor === Object) {
            const response = await fetch(url);
            json = await response.json();
            if(key) {
                if(key === 'geolocation') {
                    setSessionCookie(key, json)
                } else {
                    setSessionStorage(key, json);
                }
            }
        } else {
            json = obj;
        }
        console.log(json);
        setData(json);
        setLoading(false);
    }

    return [data, loading];
}

function useSubscription(url, subscription) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        postConnection();
    }, []);

    async function postConnection() {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: subscription.email,
                subscribed: subscription.subscribed,
                servEaseEnquiryList: subscription.servEaseEnquiryList
            })
        });
        const json = await response.json();
        console.log(json);
        setData(json);
        setLoading(false);
    }

    return [data, loading];
}

function useRequest(url, request) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        postRequest();
    }, []);

    async function postRequest() {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: request.type,
                requestor: request.requestor,
                email: request.email,
                phone: request.phone,
                enquiry: request.enquiry,
                responseList: request.responseList,
                servEaseEnquiryList: request.servEaseEnquiryList,
                isTermsAndConditions: request.isTermsAndConditions
            })
        });
        const json = await response.json();
        console.log(json);
        setData(json);
        setLoading(false);
    }

    return [data, loading];
}

function useInformation(url, userResponse) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        postUserResponse();
    }, []);

    async function postUserResponse() {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                isoCode: userResponse.isoCode,
                userIdentifier: userResponse.userIdentifier,
                responseList: userResponse.responseList
            })
        });
        const json = await response.json();
        console.log(json);
        setData(json);
        setLoading(false);
    }

    return [data, loading];
}

function useMediaQuery(query) {
    const mediaMatch = window.matchMedia(query);
    const [matches, setMatches] = useState(mediaMatch.matches);

    useEffect(() => {
        const handler = (e) => setMatches(e.matches);
        mediaMatch.addEventListener('change', handler);
        return () => mediaMatch.removeEventListener('change', handler);
    });

    return matches;
};

export { useApi, useFetch, useSubscription, useRequest, useInformation, useMediaQuery };