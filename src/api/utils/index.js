import {api} from "variables/links";

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));
export function fetchAuto(url, {toJson = false, autoRead = true, ...options} = {}) {
    let request = fetch(`${api}${url}`, {
        credentials: "include",
        headers: {
            'content-type': 'application/json'
        },
        ...options
    })

    if (toJson) {
        request = request.then(res => res.json())
    } else if (autoRead) {
        request = request.then(res =>
            res.text().then(() => res)
        )
    }

    return request
}