import React from "react";
// Assets
import SignIn from "./index";
import ErrorModal from "components/modal/ErrorModal";

function AuthProcessing() {

	return <>
		<ErrorModal error={"您可以稍後再嘗試登錄Discord帳戶"} header="未能登錄您的Discord帳戶" />
		<SignIn loading={true} />
	</>
}

export default AuthProcessing;