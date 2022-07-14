import React, {useEffect} from "react";
import {useMutation, useQueryClient} from "react-query";
// Assets
import SignIn from "./index";
import ErrorModal from "components/modal/ErrorModal";
import {login} from "api/yeecord";
import { useNavigate } from "react-router-dom";

function validate() {
	const url = new URL(window.location.href)
	const code = url.searchParams.get("code")

	if(url.searchParams.get("state") !== window.localStorage.getItem("_ls") || !code) {
		window.localStorage.removeItem("_ls")
		return window.location.href = "/signin"
	}

	url.hash = ""
	url.search = ""

	window.history.replaceState(null, "", url)

	return login(code)
}

function AuthProcessing() {
	const client = useQueryClient()
	const navigate = useNavigate()
	const mutation = useMutation(
		() => validate(),
		{
			onSuccess(result) {
				if (result.ok) {
					client.invalidateQueries("logged_in").then(() => {
						navigate("/admin", {replace: true})
					})
				}
			}
		}
	)

	useEffect(mutation.mutate, [])

	return <>
		<ErrorModal error={mutation.error && "您可以稍後再嘗試登錄Discord帳戶"} onClose={mutation.reset} header="未能登錄您的Discord帳戶" />
		<SignIn loading={mutation.isLoading} />
	</>
}

export default AuthProcessing;