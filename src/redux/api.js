import axios from 'axios';

export const loadUsersApi=async()=>
   await axios.get("http://localhost:5000/user");


export const createUsersApi=async(user)=>
   await axios.post("http://localhost:5000/user",user);


export const deleteUsersApi=async(id)=>
   await axios.delete(`http://localhost:5000/user/${id}`);


   export const editUsersApi=async(id,userInfo)=>
   await axios.put(`http://localhost:5000/user/${id}`,userInfo);

