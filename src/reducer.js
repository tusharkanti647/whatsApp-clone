
//create initial State of the reduser hook,
// initialy the state has a object, and user is null
export const initialState = {
    user: null,
}

const reducer = (state, action) => {
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