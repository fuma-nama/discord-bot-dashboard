import {api} from "variables/links";

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

        if (res.ok || !throwError) {

            return mapper? mapper(res) : res
        } else {
            return res.text().then(s => {
                const error = new Error(s);
                throw error
            })
        }
    })
}