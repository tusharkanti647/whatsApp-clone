

export const initialState = {
    user: null,
}

const reducer = (state, action) => {
    //console.log(state, action);
    switch (action.type) {
        case "set_user": {

            return {
                ...state,
                user: action.user,
            }
        }
        default: return state;
    }
}

export default reducer;

/*

export const initialState = {
    user: null
};

    //export const actionTypes = {
        //SET_USER: "SET_USER",
    //};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };

        default:
            return state;
    }
};

export default reducer;

*/
