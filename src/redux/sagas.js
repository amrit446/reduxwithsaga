import * as types from "./actionTypes";
import {takeLatest, all, put, fork} from 'redux-saga/effects'
import axios from 'axios';
import firebaseDb from "../firebase"
import { getContactsFail, getContactsSuccess, deleteContactsSuccess, deleteContactsFail, addContactsSuccess, addContactsFail, editContactsSuccess, editContactsFail} from "./actions";

function* onLoadContactAsync(){
    try{
        const contacts =yield new Promise(resolve=>
         firebaseDb.child("contacts").on("value",resolve) 
            )

        if(contacts.val()!==null){
            
            yield put(getContactsSuccess(contacts.val()))
            
        } else {
           
            yield put(getContactsSuccess({}))
        }
    }
    catch(error){
       yield put(getContactsFail());
    }
}

function* onDeleteContactAsync({payload:id}){
    try{
         yield firebaseDb.child(`contacts/${id}`).remove();
         yield put(deleteContactsSuccess())
        // console.log("payload", payload);
            
    }
    catch(error){
       yield put(deleteContactsFail());
    }
}

function* onAddContactAsync({payload:contact}){
    try{
         yield firebaseDb.child("contacts").push(contact);
         yield put(addContactsSuccess())
        // console.log("payload", payload);
            
    }
    catch(error){
       yield put(addContactsFail());
    }
}


function* onEditContactAsync({payload:{id, initialState:contact}}){
    try{
         yield firebaseDb.child(`contacts/${id}`).set(contact);
         yield put(editContactsSuccess());
        console.log("jjjjj")
            
    }
    catch(error){
       yield put(editContactsFail());
    }
}


export function* OnLoadContacts(){
    yield takeLatest(types.GET_CONTACTS_START, onLoadContactAsync)
}

export function* OnDeleteContact(){
    yield takeLatest(types.DELETE_CONTACT_START, onDeleteContactAsync)
}

export function* OnAddContact(){
    yield takeLatest(types.ADD_CONTACT_START, onAddContactAsync)
}

export function* OnEditContact(){
    yield takeLatest(types.EDIT_CONTACT_START, onEditContactAsync)
}


const contactSagas=[fork(OnLoadContacts),fork(OnDeleteContact),fork(OnAddContact), fork(OnEditContact)];


export default function* rootSaga(){
    yield all([...contactSagas])
}

///