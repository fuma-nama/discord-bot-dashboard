import {api} from "variables/links";

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));
export function fetchAuto(url, {toJson = false, ...options} = {}) {
    let request = fetch(`${api}${url}`, {
        credentials: "include",
        ...options
    })
    if (toJson) {
        request = request.then(res => res.json())
    }

    return request
}