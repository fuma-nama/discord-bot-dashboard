import {api} from "variables/links";
import {useMutation, useQueryClient} from "react-query";

export async function hasLoggedIn() {
    return await fetch(
        `${api}/auth`,
        {
            credentials: "include",
            method: "HEAD",
        }
    ).then(res =>
        res.ok
    )
}

export async function login(code) {
    return await fetch(`${api}/auth`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            code
        }),
        credentials: "include"
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