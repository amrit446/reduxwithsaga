import * as types from "./actionTypes";

export const getContactsStart=()=>({
    type:types.GET_CONTACTS_START
})

export const getContactsSuccess=(users)=>({
    type:types.GET_CONTACTS_SUCCESS,
    payload:users,
    
})

export const getContactsFail=(error)=>({
    type:types.GET_CONTACTS_FAIL,
    payload:error
})


export const deleteContactsStart=(id)=>({
    type:types.DELETE_CONTACT_START,
    payload:id,


})

export const deleteContactsSuccess=(id)=>({
    type:types.DELETE_CONTACT_SUCCESS,
    payload:id

})

export const deleteContactsFail=(error)=>({
    type:types.DELETE_CONTACT_FAIL,
    payload:error
})


export const addContactsStart=(user)=>({
    type:types.ADD_CONTACT_START,
    payload:user
})

export const addContactsSuccess=()=>({
    type:types.ADD_CONTACT_SUCCESS,
})

export const addContactsFail=(error)=>({
    type:types.ADD_CONTACT_FAIL,
    payload:error
})


export const editContactsStart=(userInfo)=>({
    type:types.EDIT_CONTACT_START,
    payload:userInfo
})

export const editContactsSuccess=()=>({
    type:types.EDIT_CONTACT_SUCCESS,
})

export const editContactsFail=(error)=>({
    type:types.EDIT_CONTACT_FAIL,
    payload:error
})