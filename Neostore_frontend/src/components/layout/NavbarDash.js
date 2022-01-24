import React from 'react';
import Home from '../pages/Home';
import OtpForm from '../user_modules/OtpForm';
import Footer from './Footer';
import Cart from '../product/Cart';
import { connect } from "react-redux";
import { NavLink,Link, useNavigate,Routes,Route } from "react-router-dom";
import Login from '../user_modules/Login';
import Register from '../user_modules/Register';
import Filter from '../product/Filter';
import ProfileUser from '../user_account/ProfileUser';
import ProductDetails from '../product/ProductDetails';
import Orders from '../product/Orders';
import Invoice from '../product/Invoice';

function NavbarDash(props) {

  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");

  }
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
        <NavLink className="navbar-brand" to="/"><h2>Neo<span className="text-danger">STORE</span></h2></NavLink>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav ms-l text-uppercase">

              <h6><a class="nav-link active" aria-current="page" ><Link to="/dashboard" class="nav-link">Dashboard</Link></a></h6>     
              <h6><a class="nav-link" ><Link to="/filter" class="nav-link">Products List</Link></a></h6>
              <h6><a class="nav-link"> <Link to="/cart" class="nav-link">Cart <h5 className="bg-dark text-white text-center" style={{"border-radius": "50px"}}>{props.mycounter}</h5></Link></a></h6>    
             
              {localStorage.getItem("_token")? 
              <>
              <h6><a class="nav-link" ><Link to="/orders" class="nav-link">Order History</Link></a></h6>
              <h6><a class="nav-link" ><Link to="/userprofile" class="nav-link">User Profile</Link></a></h6>
              <h6><a class="nav-link  btn btn-outline-danger" style={{ marginTop: "8px" }} onClick={logout}><h5>Logout</h5></a></h6>
              </>
             : 
             <h6><a class="nav-link" ><Link to="/" class="nav-link">Login</Link></a></h6>
              } 
            </div>
          </div>
        </div>
      </nav>

      <Routes>  
                    <Route exact path="/dashboard" element={<Home />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/cart" element={<Cart />} />  
                    <Route path='/reset-password' element={<OtpForm/>} />
                    <Route path='/filter' element={<Filter/>} />
                    <Route path='/productdetails' element={<ProductDetails/>} />
                    <Route path='/userprofile' element={<ProfileUser/>} />
                    <Route path='/orders' element={<Orders/>} />
                    <Route path='/invoice' element={<Invoice/>} />
      </Routes>

      <Footer />
    </div>

   
  )
}
const mapStateToProps = (state) => {
  return {
    mycounter: state.count,
  };
};
export default connect(mapStateToProps)(NavbarDash);





