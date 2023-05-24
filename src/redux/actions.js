import * as types from "./actionTypes";

export const getContactsStart=()=>({
    type:types.GET_CONTACTS_START
})

export const getContactsSuccess=(contacts)=>({
    type:types.GET_CONTACTS_SUCCESS,
    payload:contacts
})

export const getContactsFail=(error)=>({
    type:types.GET_CONTACTS_FAIL,
    payload:error
})


export const deleteContactsStart=(id)=>({
    type:types.DELETE_CONTACT_START,
    payload:id
})

export const deleteContactsSuccess=()=>({
    type:types.DELETE_CONTACT_SUCCESS,
})

export const deleteContactsFail=(error)=>({
    type:types.DELETE_CONTACT_FAIL,
    payload:error
})


export const addContactsStart=(contact)=>({
    type:types.ADD_CONTACT_START,
    payload:contact
})

export const addContactsSuccess=()=>({
    type:types.ADD_CONTACT_SUCCESS,
})

export const addContactsFail=(error)=>({
    type:types.ADD_CONTACT_FAIL,
    payload:error
})


export const editContactsStart=(contactDetail)=>({
    type:types.EDIT_CONTACT_START,
    payload:contactDetail
})

export const editContactsSuccess=()=>({
    type:types.EDIT_CONTACT_SUCCESS,
})

export const editContactsFail=(error)=>({
    type:types.EDIT_CONTACT_FAIL,
    payload:error
})