let initialState = {
	userToken: null,
};

export default function(state = initialState, action) {
	switch (action.type) {
	case 'SET_LOGIN_SUCCESS':
		return {
			...state,
            userToken: action.payload.userToken,
		};
	case 'SET_LOGOUT':
		return {
			...state,
            userToken: null,
		};
	default:
		return state;
	}
}
