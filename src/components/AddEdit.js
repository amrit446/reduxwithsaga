import React, { useState, useEffect } from "react";
import firebaseDb from "../firebase";
import { useParams, useHistory } from "react-router-dom";
import { isEmpty } from "lodash";
import {useSelector, useDispatch} from "react-redux"
import {addContactsStart, editContactsStart} from "../redux/actions"
// import {  toast } from 'react-toastify';



const initialState = {
  name: "",
  mobile: "",
  email: "",
  address: "",
};

const AddEdit = () => {
 
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const { name, mobile, email, address } = formValue;
  const dispatch = useDispatch();
  const {id} = useParams();
  // const [data, setData] = useState({});

  const {users}=useSelector(state=>state.data)

  //   console.log("currentId", currentId);

  

  

  const currentId = useParams();
  const history = useHistory();


  console.log("currentId", currentId);

  // useEffect(() => {
  //   firebaseDb.child("contacts").on("value", (snapshot) => {
  //     if (snapshot.val() !== null) {
  //       setData({
  //         ...snapshot.val(),
  //       });
  //     } else {
  //       setData({});
  //     }
  //   });
  // }, [id]);



  useEffect(() => {
   if(id){
    setEditMode(true)
    const singleUser=users.find((item)=>item.id===Number(id));
    setFormValue({...singleUser});
   }else{
    setEditMode(false);
    setFormValue({...initialState})
   }
  },[id]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(name && email && mobile && address){
    if(!editMode){
     
        dispatch(addContactsStart(formValue));
        // toast.success("user Added")
        setTimeout(()=>{
          history.push("/");
        },500)
      }
      else{
        dispatch(editContactsStart({id, formValue}))
        setEditMode(false)
        setTimeout(()=>{
          history.push("/");
        },500)
      }
      
    }
   
  };

  return (
    <div className="container mt-5">
      <h2>{!editMode?"Add user":"Update User"}</h2>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="bmd-label-floating">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label className="bmd-label-floating">Mobile</label>
              <input
                type="number"
                className="form-control"
                name="mobile"
                value={mobile || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label className="bmd-label-floating">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={email || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label className="bmd-label-floating">Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={address || ""}
                onChange={handleInputChange}
              />
            </div>
            <button className="btn btn-default">Cancel</button>
            <button type="submit" className="btn btn-success btn-raised">
            {!editMode?"Add":"Update"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEdit;
