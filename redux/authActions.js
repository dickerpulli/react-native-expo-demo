export const setLoginSuccess = (userToken) => {
	return {
		type: 'SET_LOGIN_SUCCESS',
		payload: {
			userToken
		},
	};
};
export const setLogout = () => {
	return {
		type: 'SET_LOGOUT',
	};
};
