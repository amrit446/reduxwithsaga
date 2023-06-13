import * as types from "./actionTypes";
import {takeLatest, takeEvery, all, put, call, fork, take} from 'redux-saga/effects'
import axios from 'axios';
import firebaseDb from "../firebase"
import { getContactsFail, getContactsSuccess, deleteContactsSuccess, 
  deleteContactsFail, addContactsSuccess, addContactsFail, editContactsSuccess, 
  editContactsFail} from "./actions";

import {loadUsersApi,createUsersApi, deleteUsersApi, editUsersApi} from "./api"
import { delay } from "lodash";


function* onLoadContactAsync() {
    try {
      const response = yield call(loadUsersApi);
      if (response.data) {
         yield put(getContactsSuccess(response.data))
      } 
    } catch (error) {
      yield put(getContactsFail(error.response.data));
    }
  }


  function* onDeleteContactAsync(id ) {
    
    try {
      const response=yield call(deleteUsersApi, id) 
      // Make a DELETE request to remove the contact from Firebase
      if(response.status==200){
        yield put(deleteContactsSuccess(id));
      console.log('Successfully deleted contact from Firebase');
      }
      
    } catch (error) {
      yield put(deleteContactsFail(error.response.data));
      console.error('Failed to delete contact from Firebase', error);
    }
  }


function* onAddContactAsync({payload}){
    try{
         const response = yield call(createUsersApi, payload);
         yield put(addContactsSuccess(response.data))
        // console.log("payload", payload);
            
    }
    catch(error){
       yield put(addContactsFail(error.response.data));
    }
}



function* onEditContactAsync({ payload:{id,formValue}}){
  try {
   const response=yield call(editUsersApi, id, formValue)
    if(response.status===200){
      yield put(editContactsSuccess());
      console.log('Successfully updated contact in Firebase');
    }
   
  } catch (error) {
    yield put(editContactsFail());
    console.error('Failed to update contact in Firebase', error);
  }
}


export function* OnLoadContacts(){
    yield takeLatest(types.GET_CONTACTS_START, onLoadContactAsync)
}

export function* OnDeleteContact(){
    while(true){
      const {payload:id}=yield take(types.DELETE_CONTACT_START);
      yield call(onDeleteContactAsync,id)
    }
    
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