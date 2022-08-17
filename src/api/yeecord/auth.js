import {useMutation, useQueryClient} from "react-query";
import {fetchAuto} from "../utils";

export function hasLoggedIn() {
    return fetchAuto(
        "/auth",
        {
            credentials: "include",
            method: "HEAD",
            throwError: false
        }
    ).then(res =>
        res.ok
    )
}

export async function logout() {
    return fetchAuto("/auth/signout", {
        method: "POST"
    })
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