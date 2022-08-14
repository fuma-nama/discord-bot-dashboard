import {api} from "variables/links";

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));
export function fetchAuto(url, {toJson = false, throwError = true, ...options} = {}) {
    const request = fetch(`${api}${url}`, {
        credentials: "include",
        headers: {
            'content-type': 'application/json'
        },
        ...options
    })
    let mapper

    if (toJson) {
        mapper = res => res.json()
    } else {
        mapper = res => res.text().then(() => res)
    }

    return request.then(res => {

        if (res.ok) {

            return mapper? mapper(res) : res
        } else if (throwError) {
            return res.text().then(s => {
                const error = new Error(s);
                throw error
            })
        }
    })
}