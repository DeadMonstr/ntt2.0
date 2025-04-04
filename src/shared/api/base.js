



export const API_URL_DOC =  `http://192.168.1.15:8000/`
export const API_URL = `${API_URL_DOC}api/`


// export const API_URL_DOC = `https://api.xususiytalim.uz/`
// export const API_URL = `${API_URL_DOC}api/`



export const headers = () => {
    const token = sessionStorage.getItem("token")
    return {
        // "Authorization" : "JWT " + token,
        'Content-Type': 'application/json'
    }
}




export const headersView = () => {
    const token = sessionStorage.getItem("token")
    const visitorId = localStorage.getItem("visitorId")
    return {
        // "Authorization" : "JWT " + token,
        'Content-Type': 'application/json',
        'X-Visitor-ID': visitorId
    }
}

export const headersImg = () => {
    const token = sessionStorage.getItem("token")
    return {
        // "Authorization" : "JWT " + token
    }
}


export const branchQuery = () => {
    const branch = localStorage.getItem("selectedBranch")
    return `branch=${branch}`

}

export function ParamUrls(params) {
    return Object.entries(params)
        .filter(([key, value]) => value !== undefined && value !== null && value !== "all")
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}

export const useHttp = () => {
    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        try {
            const response = await fetch(url, {method,mode: 'cors', body, headers});

            // if (!response.ok) {
            //     throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            // }

            return await response?.json();

        } catch(e) {
            throw e;
        }
    }
    return {request}
}



export const ParamUrl = (params) => {
    const paramsList = Object.keys(params)

    let res = ''


    for (let i = 0; i < paramsList.length; i++) {
        if (params[paramsList[i]]) {


            res += `${paramsList[i]}=${params[paramsList[i]]}&`

        }

    }


    return res

}