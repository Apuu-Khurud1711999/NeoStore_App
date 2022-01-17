import React, { useEffect, useState } from "react";
import { getsingleproduct } from "../../config/MyService";
import { useLocation } from "react-router";
import ReactImageMagnify from "react-image-magnify";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import "react-multiple-select-dropdown-lite/dist/index.css";
import ReactStars from "react-rating-stars-component";

//import { connect } from "react-redux";
//import axios from "axios";
// import jwt_decode from 'jwt-decode';

function ProductDetails(props) {
  const [postdata, setPostdata] = useState([]);
  const [images, setimages] = useState([]);
  const [mainimage, setmainimage] = useState();
  const [rating, setrating] = useState();
  const [uid, setUid] = useState("");
  // let location = useLocation();
  const { state } = useLocation();
  const ratingChanged = (rating) => {
    console.log(rating);
  };

  useEffect(() => {
    console.log(state.id);
    getsingleproduct(state.id)
      .then((res) => {
        console.log(res.data);
        setrating(res.data.product.product_rating);
        setPostdata(res.data.product);
        setmainimage(res.data.product.product_image);
        setimages(res.data.product_image);

      });
  }, []);
  console.log(postdata);
console.log(postdata.product_name)
  return (
    <>
    
      <div>
        <br />
        <div className="container-fluid">
          <br />
          <br />
          <div className="row">
            <div className="container col-10">
              <div className=" row">
                <div className=" col-md-6">
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "Wristwatch by Ted Baker London",
                        isFluidWidth: true,
                        src: mainimage,
                      },
                      largeImage: {
                        src: mainimage,
                        width: 1200,
                        height: 1200,
                      },
                    }}
                  />
                {/*  <img src={mainimage} className="img-fluid" alt="..." height="500px" width="500px" /> */}
                </div>
                <div className="col-md-6">
                  <div className="card1">
                    <h1 className="">{postdata.product_name}</h1>
                  <div className="text-center">
                      <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                        className="card1"
                      />
                    </div>
                  {/*  <p>{postdata.product_rating}</p><hr /> */}
                    <hr />
                    <br />
                    <h5>
                      Price
                      <h2>
                        <span className="text-danger">
                          {" "}
                          ₹ {postdata.product_cost}
                        </span>
                      </h2>
                      <p>(Inclusive of all taxes)</p>
                    </h5>
                    <h5>About this item:</h5>
                    <p>{postdata.product_descrip}</p>
                    <br />
                    <div className="row">
                      <div className="col-md-12">
                        {" "}
                        <a
                          className="btn btn-danger"
                          // onClick={() => addtoCart()}
                        >
                          Add to cart
                        </a>
                      </div>
                      <br />
                      <br />
                      <div className="col-md-12">
                        {" "}
                        <a className="btn btn-secondary ">
                          Rate product
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container">
                 <div className="row">
                   {/*  <div className="col-md-6">
                      {images.map((item) => (
                        <button
                          className="btn img-fluid"
                          width="100px"
                          height="400px"
                          onClick={() => setmainimage(item)}
                        >
                          {" "}
                          <img
                            src={item}
                            width="100px"
                            height="60px"
                            className="img-fluid"
                          />
                        </button>
                      ))}
                    </div>  */}
                    <div className="col-md-6">
                      <div className="row">
                        <h4>Share</h4>
                        <div className="col-md-4">
                          <FacebookShareButton
                            url="https://www.amazon.in/"
                            title={"Checkout " + postdata.product_name}
                            hashtag="#react"
                          >
                            <FacebookIcon
                              logofillColor="white"
                              round={true}
                            ></FacebookIcon>
                          </FacebookShareButton>
                        </div>
                        <div className="col-md-4">
                          <WhatsappShareButton
                            url="https://www.amazon.in/"
                            title={"Checkout " + postdata.product_name}
                            hashtag="#react"
                          >
                            <WhatsappIcon
                              logofillColor="white"
                              round={true}
                            ></WhatsappIcon>
                          </WhatsappShareButton>
                        </div>
                        <div className="col-md-4">
                          <TwitterShareButton
                            url="https://www.amazon.in/"
                            title={"Checkout " + postdata.product_name}
                            hashtag="#react"
                          >
                            <TwitterIcon
                              logofillColor="white"
                              round={true}
                            ></TwitterIcon>
                          </TwitterShareButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <br />
              </div>
            </div>
            <hr />
          </div>
        </div>
        <br />
        <br />
      </div>
    </>
  );
}

export default ProductDetails; 