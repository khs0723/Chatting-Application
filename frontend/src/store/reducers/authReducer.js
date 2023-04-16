import {authActions} from "../actions/authAction";

const initialState = {
    userData: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case authActions.SET_USER_DATA:
            return {
                ...state,
                userData: action.userData
            };
        default:
            return state;
    }
};

export default reducer;
