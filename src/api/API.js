// import sha1 from 'sha1';
import axios from 'axios';

const AUTH_API = 'https://auth.bravofy.com';
const BACKEND_API = 'https://backend.bravofy.com';
const ANALYTICS_API = 'https://analytics.bravofy.com';


function authChecker(response) {
    if (response.status === 401) {
        window.location = '/';
        localStorage.removeItem('token');
    } else return response
}

// const Api = {
export const userLogin = (login, password) => {
    let myHeaders = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    });
    return axios({
        method: 'post',
        headers: myHeaders,
        url: `${AUTH_API}/login`,
        mode: 'no-cors',
        data: {"username": login, "password": password}
    })
        .then(res => res)
        .catch(err => err.response);

};
export const userRegister = (login, password) => {
    let myHeaders = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    });

    return axios({
        method: 'post',
        headers: myHeaders,
        url: `${AUTH_API}/user`,
        mode: 'no-cors',
        data: {"username": login, "password": password}
    })
        .then(res => res)
        .catch(err => err.response);

};
export const getAllPortals = (string) => {
    return axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/portal`,
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};
export const getPortal = (string, id) => {
    return axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/portal/${id}`,
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

export const getPortalByUUID = (string, uuid) => {
    return axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/portal/uuid/${uuid}`,
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

export const getAllImages = (string) => {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/image`,
        mode: 'no-cors'
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

export const getDefaultLocale = (token) => {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${token}`
        },
        url: `${BACKEND_API}/locale/default`,
        mode: 'no-cors'
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};
export const getAllLocale = (token) => {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${token}`
        },
        url: `${BACKEND_API}/locale`,
        mode: 'no-cors'
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

export const getHotspots = (string) => {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/hotspot`,
        mode: 'no-cors'
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};
export const createHotspot = (string, name, address, description, portalId) => {
    return axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/hotspot`,
        mode: 'no-cors',
        data: {
            "name": name,
            "address": address,
            "description": description,
            "portalId": portalId
        }
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};
export const updateHotspotById = (string, name, address, description, portalId, hotspotId) => {
    return axios({
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/hotspot/${hotspotId}`,
        mode: 'no-cors',
        data: {
            "name": name,
            "address": address,
            "description": description,
            "portalId": !portalId ? null : portalId
        }
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

export const getHotspotByUUID = (string, uuid) => {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/hotspot/uuid/${uuid}`,
        mode: 'no-cors'
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};


export const createPortal = (string, info) => {
    return axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/portal`,
        mode: 'no-cors',
        data: info
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

export const updatePortal = (string, info, id) => {
    return axios({
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/portal/${id}`,
        mode: 'no-cors',
        data: info
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

export const previewPortal = (string, info) => {
    return axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/portal/preview`,
        mode: 'no-cors',
        data: info
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

export const getHotspotUsers = (string, hotSpotUUID) => {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${ANALYTICS_API}/login/statistic/${hotSpotUUID}`,
        mode: 'no-cors'
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

export const exportHotspotUsersCSV = (string, hotSpotUUID) => {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'text/csv',
            'Accept': 'text/csv',
            'Authorization': `${string}`
        },
        url: `${ANALYTICS_API}/login/statistic/export/${hotSpotUUID}`,
        mode: 'no-cors'
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

export const restorePasswordSendUsername = (string) => {
    return axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        url: `${AUTH_API}/restore`,
        mode: 'no-cors',
        data: {
            "username": string
        }
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

export const restorePasswordSendConfirmedPassword = (string, password) => {
    return axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        url: `${AUTH_API}/restore/change/${string}`,
        mode: 'no-cors',
        data: {
            "password": password
        }
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

// User profile data controller

export const setCompanyProfileInfo = (token, {name, companyCode, vatCode, country, region, city, address, zipCode, locale}) => {
    return axios({
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${token}`
        },
        url: `${BACKEND_API}/profile`,
        mode: 'no-cors',
        data: {
            "name": name,
            "companyCode": companyCode,
            "vatCode": vatCode,
            "country": country,
            "region": region,
            "city": city,
            "address": address,
            "zipCode": zipCode,
            "locale": locale
        }
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

export const getCompanyProfileInfo = (string) => {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/profile`,
        mode: 'no-cors'
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

// Term and condition data controller

export const getTermsAndConditionsParams = (string) => {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/term_and_condition`,
        mode: 'no-cors'
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

export const getSummaryAnalytics = (token, options) => {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        url: `${ANALYTICS_API}/analytics/summary/${options.uuid}?startDate=${options.startDate}&endDate=${options.endDate}`,
        mode: 'no-cors'
    })
        .then(res => res)
        // .catch(err => authChecker(err.response));
        .catch(err => console.log(err));
};

export const getDailyVisitsAnalytics = (token, options) => {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        url: `${ANALYTICS_API}/analytics/visits/${options.uuid}?startDate=${options.startDate}&endDate=${options.endDate}&granularity=DAILY`,
        mode: 'no-cors'
    })
        .then(res => res)
        // .catch(err => authChecker(err.response));
        .catch(err => console.log(err));
};

export const getPopularHoursAnalytics = (token, options) => {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        url: `${ANALYTICS_API}/analytics/popular_hours/${options.uuid}?startDate=${options.startDate}&endDate=${options.endDate}`,
        mode: 'no-cors'
    })
        .then(res => res)
        // .catch(err => authChecker(err.response));
        .catch(err => console.log(err));
};

export const getNewVisitsAnalytics = (token, options) => {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        url: `${ANALYTICS_API}/analytics/new_visits/${options.uuid}?startDate=${options.startDate}&endDate=${options.endDate}&granularity=DAILY`,
        mode: 'no-cors'
    })
        .then(res => res)
        // .catch(err => authChecker(err.response));
        .catch(err => console.log(err));
};

export const getAllPublicTemplates = (string) => {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/template/public`,
        mode: 'no-cors'
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

export const getTemplate = (string, id) => {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/template/${id}`,
        mode: 'no-cors'
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

export const getMailerLite = (string) => {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/profile/mailerlite`,
        mode: 'no-cors'
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

export const updateMailerLite = (string, data) => {
    return axios({
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/profile/mailerlite`,
        mode: 'no-cors',
        data: {
            "enable": data.enable,
            "apiKey": data.apiKey,
            "groupPrefix": data.groupPrefix
        }
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

export const checkMailerLite = (token, data) => {
    return axios({
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        url: `${BACKEND_API}/profile/mailerlite/status`,
        mode: 'no-cors',
        data: data
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

/** 
 * Get Ruckus Smart Zone controller Northbound API params
 *  
 */
export const getRuckusSZ = (string) => {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/profile/ruckus`,
        mode: 'no-cors'
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

/** 
 * Check ruckus credentials status
 */
export const checkRuckusStatus = (token, data) => {
    return axios({
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        url: `${BACKEND_API}/profile/ruckus/status`,
        mode: 'no-cors',
        data: data
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

/**
 * Set Ruckus Smart Zone controller Northbound API params
 * 
 * @param {string} string - access token
 * @param {*} data - params 
 */
export const updateRuckusSZ = (string, data) => {
    return axios({
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/profile/ruckus`,
        mode: 'no-cors',
        data: {
            "controllerAddress": data.controllerAddress,
            "username": data.username,
            "password": data.password
        }
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

export const createNewTemplate = (string, object) => {
    return axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/template`,
        mode: 'no-cors',
        data: {...object}
    })
        .then(res => res)
        // .catch(err => authChecker(err.response));
        .catch(err => err);
};


export const getPublicFonts = (string) => {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/font/public`,
        mode: 'no-cors'
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

export const getFontById = (string, id) => {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/font/${id}`,
        mode: 'no-cors'
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};