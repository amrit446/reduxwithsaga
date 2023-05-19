import * as types from './actionType'

const initialState={
    users:[],
    user:{},
    loading:false,
}

const userReducers=(state=initialState, action)=>{
    switch(action.type){
    

        default:
            return state;
    }
}

export default userReducers;