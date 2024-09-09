import { SET_USER,SET_TOKEN,SET_REQUESTS } from "./actions";

const initialState={
    user:{
        DOB:'',
        Email:'',
        Name:'',
        Password:'',
        PhoneNumber:'',
        Username:'',
        _id:'',
        createdAt:'',
        updatedAt:''
    },
    token:"",
    requests:[]
};

function userReducer(state=initialState,action){
    if(action.type==SET_USER){
        return{...state,user:action.payload};
    }
    else if(action.type=SET_TOKEN){
        return{...state,token:action.payload};
    }
    else if(action.type=SET_REQUESTS){
        return{...state,requests:action.payload};
    }
    else{
        return state;
    }
};

export default userReducer;