

export const initialState={
user: "abc",
}

const reducer=(state, action)=>{
    console.log(state, action);
    switch(action.type){
    case "set_user" :{
       
        return{
            ...state,
            user: action.user,
            
        }
    }
    default: return state;
    }
}

export default reducer;