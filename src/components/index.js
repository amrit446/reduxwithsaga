import React, { useEffect, useState, useContext } from "react";
import firebaseDb from "../firebase";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { getContactsStart, deleteContactsStart} from "../redux/actions";
import CircularProgress from '@mui/material/CircularProgress';

const ListRecord = () => {
  // const [data, setData] = useState({});
  const {users, loading, error}= useSelector((state)=>state.data)
 console.log("jjjj",{users});
  

 let dispatch=useDispatch();

 useEffect(()=>
  error
 ,[error])

 useEffect(()=>{
  dispatch(getContactsStart())
 },[])


   if(loading){
    <CircularProgress sx={{marginTop:"150px"}}>
     < span>Loading</span>
    </CircularProgress>

   }




  const onDelete = (id) => {
    
    if (window.confirm("Are you sure you want to delete this record ?")) {
       console.log("this is id",id)
       dispatch(deleteContactsStart(id));
       dispatch(getContactsStart());
    }
  };

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-lg-12">
            <div class="jumbotron">
              <h1 class="display-2">Contact Management System</h1>
            </div>
            <table className="table table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Mobile</th>
                  <th scope="col">Email</th>
                  <th scope="col">Address</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
              {users && users.map((item, index) => {
  return (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{item.name}</td>
      <td>{item.mobile}</td>
      <td>{item.email}</td>
      <td>{item.address}</td>
      <td>
        <Link to={`/update/${item.id}`}>
          <a className="btn text-primary">
            <i className="fas fa-pencil-alt" />
          </a>
        </Link>
   
        <a
          className="btn text-danger"
          onClick={() => onDelete(item.id)}
        >
          <i className="fas fa-trash-alt" />
        </a>
        <Link to={`/view/${item.id}`}>
          <a className="btn text-info">
            <i className="fas fa-eye" />
          </a>
        </Link>
      </td>
    </tr>
  );
})}

          </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListRecord;
