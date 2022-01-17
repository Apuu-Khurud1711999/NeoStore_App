import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrder } from '../../config/MyService';
import { Card } from 'react-bootstrap';

const Orders = () => {
    
let [orders,setOrders] = useState([]);
const navigate = useNavigate();

useEffect(()=>{
    getOrder(localStorage.getItem("email"))
    .then(res => {
        if(res.data.user){
            console.log(res.data.user);
            let data = res.data.user;
            setOrders(data);          
        }
    })
},[])

const singleorder = (id)=> {
  console.log(id)
;
  navigate("/invoice", {
    state: { id: id },
  });
};

    return (
    <>
      <div className='container'>
      <div className=" container col-md-4">
      {orders.map((val, index) =>
      <Card border="secondary" style={{ width: '18rem'}}>
    <Card.Header>{val.user}</Card.Header>
    <Card.Body>
      <Card.Title>User_id: {val._id}</Card.Title>
      <Card.Text>     
         {/*  <h6 className="card-text">Items ordered: {val.name} </h6> */}
          <h6 className="card-text">Card No: {val.card}</h6>
          <h6 className="card-text">Rs.{val.price}</h6>
          <a className='btn btn-primary' style={{"border-radius":"12px"}}  onClick={() => singleorder(val._id)}><h6>Generate Invoice</h6></a>
      </Card.Text>
      <Card.Footer>
      <small className="text-muted">{val.date}</small>
    </Card.Footer>
    </Card.Body>
  </Card>)}
  <br />
  </div>
  </div>
     
    </>
    )
}

export default Orders
