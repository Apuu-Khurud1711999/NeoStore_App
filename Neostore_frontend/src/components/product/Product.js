import React, { useEffect, useState } from 'react'
import { getProducts } from '../../config/MyService'
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useSelector, useDispatch } from "react-redux";
import "./button.css";
/* import {MdOutlineAddShoppingCart} from "react-icons/md"; */

function Product(props) {
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [postdata, setPostdata] = useState([])
  const [uid,setUid]=useState('')

  const cart = useSelector((state) => state.cartItems);
  console.log(cart);
  
  const navigate = useNavigate();

  const dispatch = useDispatch();
 
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  useEffect(()=>{
      
   if(true){
        fetch(`http://localhost:5000/api/fetchproduct/?page=${pageNumber}`)
          .then((response) => response.json())
          .then(({ totalPages, products }) => {
            setPostdata(products);
            setNumberOfPages(totalPages);
          });
     } 
    }, [pageNumber])

    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
      };
    
      const gotoNext = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
      };

  console.log(postdata)
  return (
    <div className="container-fluid">
         <h3>Page No. {pageNumber + 1}</h3>
    <div className="container" ><br/>
      {/* {postdata[0].name} */}
     <h2 className="text-white">Hey, {uid} !</h2>
      <div className=" row" >
        {postdata.map((val, index) =>
          <div className=" container col-md-4">
            <div className="card1" >
              <img src={val.product_image} className="card-img-top" alt="..." height="400px" />
              <div className="card-body">
                <h5 className="card-title">{val.product_name}</h5>
                <h6><p className="card-text">Rs.{val.product_cost}</p></h6>
                <a className="btn btn-warning" style={{"border-radius": "12px"}} onClick={() =>
                  props.cart(
                    val._id,
                    val.product_image,
                    val.product_name,
                    val.product_cost
                  )
                }><h6>{/* <MdOutlineAddShoppingCart/> &nbsp; */} Add to cart</h6></a>

                <a className='btn btn-primary' style={{"border-radius":"12px"}} onClick={()=>navigate('/productdetails')}><h6>View Product</h6></a>
              </div>
            </div>
          </div>)}

      </div>
      </div>
      <button onClick={gotoPrevious}>Previous</button>
         {pages.map((pageIndex) => (
        <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
          {pageIndex + 1}
        </button>
      ))}
      <button onClick={gotoNext}>Next</button>
      <br /><br />
    </div>
    
  
  )
}
const mapStateToProps = (state) => {
  return {
    mycounter: state.count,
  };
};

const mapDispatchTopProps = (dispatch) => {
  return {
    cart: function (_id, product_image, product_name, product_cost) {
      dispatch({
        type: "CART",
        payload: {
          id: _id,
          image: product_image,
          name: product_name,
          price: product_cost
        },
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchTopProps)(Product);
