import { connect } from "react-redux";
import React, { useState,useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {GoCreditCard} from "react-icons/go";
import Alert from 'react-bootstrap/Alert';
import { addOrders } from "../../config/MyService";
import { useNavigate } from "react-router-dom";

const Cart = (props) => {
  const cart = useSelector((state) => state.cartItems);
  console.log(cart);
  //const dispatch = useDispatch();
  const newState = JSON.stringify(cart);
  console.log(newState)
  localStorage.setItem("LState", newState);
  const LState = localStorage.getItem("LState");
  console.log(LState);
  const [card, setCard] = useState('');
  const [flag, setFlag] = useState(1);
  const [uid,setUid]=useState('');
  
  const navigate = useNavigate();

  const handler = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    setCard(e.target.value)
  }

  const addorder = (e) => {

    if(localStorage.getItem("_token")){
      e.preventDefault();
    console.log("http://localhost:5000/api/addorder");
    axios.post("http://localhost:5000/api/addorder",{
      cart: cart,
      card: card,
      user: localStorage.getItem("email")
    })
      .then(res => {
        console.log(cart)
      })
      alert("Order Successfully");
      props.remove();

      setFlag(0);
    }
    else{
      alert("Login in first to order");
      navigate("/");
    }
    
  }
  let total=0;
  for (var i = 0; i < cart.length; i++)
   {
    total+=cart[i].price;
   }
    
  console.log(cart[0])
  return (
    <div className="container-fluid"><br/><br/>
      <h1 className="text-center text-white">Your Cart Items</h1>
      <form method="post" >
        <div className="container-fluid  row ">
          {cart == "" ? <h4 className="text-white">NO ITEMS FOUND !</h4> : cart.map((val, index) =>
            <div className="col-lg-4">
              <div className="cardL" >
                <img src={val.image} className="card-img-top" alt="..." height="380px" />
                <div className="card-body">
                  <h5 className="card-title" name="name">{val.name}</h5>
                  <h5 className="card-text" name="price"> Rs.{val.price}</h5>
                </div>
              </div>
            </div>)}
          <hr />
          <div className="container text-center">
          <a href="#" className="btn btn-dark text-center" style={{width:"200px",height:"40px"}} onClick={() => props.remove()}>CLEAR CART</a><br/>
          </div><br/><br/>
          {flag ? 
          <div className="container cardL">
          <h2>Grand Total- Rs.{total}</h2>
          <GoCreditCard/><input className="form-control" type="text" placeholder="Enter Credit card details" onChange={handler} aria-label="default input example" style={{ width: "400px" }} /><br/>
          <button type="submit" class="btn btn-dark" style={{ width: "90px" }} onClick={addorder}>Checkout</button>
          </div>
          :
          <div className="text-center">                                                
            <Alert variant="success"><h2>Your Order is placed Successfully!!</h2></Alert>
          </div>
          }
        </div>
      </form>

    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    mycounter: state.count,
  };
};

const mapDispatchTopProps = (dispatch) => {
  return {
    remove: function () {
      dispatch({
        type: "REMOVE",
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchTopProps)(Cart);
