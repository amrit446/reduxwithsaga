import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import firebaseDb from "../firebase";
import {useSelector} from 'react-redux'

const View = () => {
  const {id}= useParams();
  const {users} = useSelector(state=>state.data);
  const [data, setData] = useState({});
  const history = useHistory();
  const singleUser=users.find((item)=>item.id===Number(id));
 

  useEffect(() => {
    firebaseDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({
          ...snapshot.val(),
        });
      } else {
        setData({});
      }
    });
  }, [id]);
  return (
    <div className="container mt-5">
     
     
         
            <div class="card">
              <div class="card-header lead">User Detail</div>
              <div class="card-body">
                <p class="card-text">Name: {singleUser.name}</p>
                <p class="card-text">Mobile: {singleUser.mobile}</p>
                <p class="card-text">Email: {singleUser.email}</p>
                <p class="card-text">Address: {singleUser.address}</p>
                <Link to="/">
                  <a className="btn btn-info">Go Back</a>
                </Link>
              </div>
            </div>
          
       
    </div>
  );
};

export default View;
