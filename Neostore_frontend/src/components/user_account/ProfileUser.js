import React, { useEffect, useState } from 'react';
import { getProfile } from '../../config/MyService';
import { Link } from "react-router-dom";
import './Profile.css'; 
import './ProfileUser.css';

const ProfileUser = () => {
    
let [user,setUser] = useState('');
const [showInvoice, setShowInvoice] = useState(false)
let [password,setPassword] = useState('');
let [fname, setFname] = useState('');
let [lname, setLname] = useState('');
let [uname, setUname] = useState('');
let [mobile, setMobile] = useState('');
let [address, setAddress] = useState('');
let [email, setEmail] = useState('');


useEffect(()=>{
    getProfile(localStorage.getItem("email"))
    .then(res => {
        if(res.data.email){
            console.log(res.data.email);
            let data = res.data.email;
            setUser(data);          
            setFname(data.fname);
            setLname(data.lname);
            setUname(data.uname);
            setMobile(data.mobile);
            setEmail(data.email);
            setAddress(data.address);
        }
    })
},[])


    return (
    <>
   {/*  <div className="container-fluid">
    <div className="container">
    
    <h2 className="text-white">Hey, {uname} !</h2> 
    <div className=" row" >
          <div className=" container col-md-4">
            <div className="card1" >
              <img src="https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg" className="card-img-top" alt="..." height="300px" />  
              <div className="card-body">
                <h5 className="card-title">User-Id : {uname}</h5>
                <h5 className="card-text">First Name : {fname}</h5>
                <h5 className="card-text">Last Name : {lname}</h5>
                <h5 className="card-text">Mobile No : {mobile}</h5> 
                <h5 className="card-text">Email-Id : {email}</h5>
                <h5 className="card-text">Address : {address}</h5>
              </div>
            </div>
      </div> 
      </div>
    </div>
    </div>  */}
      
     
          <div title={`${uname}'s Profile`} />
          <div className="profileContainer" >
            <div >
              <h1>My Profile</h1>
              <img src="https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg" height="300px" alt={uname}  />
            {/*   <Link to="/me/update">Edit Profile</Link> */}
            </div>
            <div>
              <div>
                <h4>First Name</h4>
                <p>{fname}</p>
              </div>
              <div>
                <h4>Last Name</h4>
                <p>{lname}</p>
              </div>
              <div>
                <h4>Mobile</h4>
                <p>{mobile}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{email}</p>
              </div>
              <div>
                <h4>Address</h4>
                <p>{address}</p>
              </div>
             

              <div>
                <Link to="/orders">My Orders</Link>
               {/*  <Link to="/password/update">Change Password</Link> */}
              </div>
            </div>
          </div>
       
    
    </>
    )
}

export default ProfileUser


/* import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer" >
            <div >
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;

//style={{border:"solid 2px red",marginTop:"60px"}}=>1st container */