import {api} from "variables/links";
import {useMutation, useQueryClient} from "react-query";
import {fetchAuto} from "../utils";

export function hasLoggedIn() {
    return fetchAuto(
        "/auth",
        {
            method: "HEAD",
        }
    ).then(res =>
        res.ok
    )
}

export function login(code) {
    return fetchAuto("/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            code
        }),
    })
}

export async function logout() {

}

export function useLogout() {
    const client = useQueryClient()

    return useMutation(
        () => logout(),
        {
            onSuccess() {
                return client.invalidateQueries("logged_in")
            }
        }
    )
}