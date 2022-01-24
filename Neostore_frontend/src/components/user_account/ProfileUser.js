import React, { useEffect, useState } from 'react';
import { getProfile } from '../../config/MyService';
import { Link,Navigate } from "react-router-dom";
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
    {localStorage.getItem("_token")? 
         <div>
         
         <div title={`${uname}'s Profile`} />
          <div className="profileContainer" >
            <div >
              <h1>My Profile</h1>
              <img src="https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg" height="300px" alt={uname}  />
  
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
          </div>
          : <Navigate to ='/' />
         
          } 
 
    
    </>
    )
}

export default ProfileUser


