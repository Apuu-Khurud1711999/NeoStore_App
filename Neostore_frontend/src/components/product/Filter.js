import React, { useState, useEffect } from "react";
import { getPosts } from "../../config/MyService";
import { Dropdown, DropdownButton } from "react-bootstrap";
//import ProductDetails from "./ProductDetails";
import { BsSearch, BsSortUpAlt, BsSortDown } from "react-icons/bs";
import { FaSquareFull } from "react-icons/fa";
// import MultiSelect from  'react-multiple-select-dropdown-lite';
import "react-multiple-select-dropdown-lite/dist/index.css";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import ReactStars from "react-rating-stars-component";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import './button.css';

function Filter(props) {
  const [postdata, setPostdata] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [showdata, setshowdata] = useState(1);
  //const [rating, setRating] = useState(1); 

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  //const currentPosts = postdata.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const cart = useSelector((state) => state.cartItems);
  /* console.log(cart); */ 

  //const dispatch = useDispatch();

  const navigate = useNavigate();
  
  const singleitem = (id)=> {
    console.log(id)
;
    navigate("/productdetails", {
      state: { id: id },
    });
  };


  const filterCategory = (catItem) => {
   /*  console.log(data); */
    const result = data.filter((curdata) => {
      return curdata.category_id.category_name === catItem;
    });
    setPostdata(result);
  };

  const filterColor = (catItem) => {
    const result = postdata.filter((curdata) => {
      return curdata.color_id.color_name === catItem;
    });
    setPostdata(result);
  };

  const allproduct = () => {
    getPosts().then((res) => {
     /*  console.log(res.data); */
      setPostdata(res.data);
      setData(res.data);
      console.log(postdata) 
    });
  };
  const increase = () => {
    setshowdata(1);
    setTimeout(() => {
      for (var i = 0; i < postdata.length; i++) {
        for (var j = 0; j < postdata.length - i - 1; j++) {
          if (postdata[j].product_cost < postdata[j + 1].product_cost) {
            var temp = postdata[j];
            postdata[j] = postdata[j + 1];
            postdata[j + 1] = temp;
          }
        }
      }
      setPostdata(postdata);
      setshowdata(0);
    }, 1000);
  };
  const decrease = () => {
    setshowdata(1);
    setTimeout(() => {
      for (var i = 0; i < postdata.length; i++) {
        for (var j = 0; j < postdata.length - i - 1; j++) {
          if (postdata[j].product_cost > postdata[j + 1].product_cost) {
            var temp = postdata[j];
            postdata[j] = postdata[j + 1];
            postdata[j + 1] = temp;
          }
        }
      }
      setPostdata(postdata);
      setshowdata(0);
    }, 1000);
  };

  useEffect(() => {
    allproduct();
  }, []);

  return (
    <div>
      <div>
        <h1></h1>

        <div className="container-fluid">
          <br />

          <br />
          <div className="row">
            <div className="col-md-2">
              <button
                className="btn btn-info"
                onClick={allproduct}
                style={{ width: "150px" }}
              >
                {" "}
                All Products
              </button>
              <br />
              <br />

              <Dropdown>
                <Dropdown.Toggle
                  variant="info"
                  id="dropdown-basic"
                  style={{ width: "150px" }}
                >
                  Category
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#/action-1"
                    onClick={() => filterCategory("western-tops")}
                  >
                    Western-Tops
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-2"
                    onClick={() => filterCategory("Jeans")}
                  >
                    Jeans
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    onClick={() => filterCategory("One Piece")}
                  >
                    One Piece
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-4"
                    onClick={() => filterCategory("traditional")}
                  >
                    Traditional
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-5"
                    onClick={() => filterCategory("sarees")}
                  >
                    Sarees
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <br />
              <Dropdown>
                <Dropdown.Toggle
                  variant="info"
                  id="dropdown-basic"
                  style={{ width: "150px" }}
                >
                  Color
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#/action-1"
                    onClick={() => filterColor("red")}
                  >
                    <FaSquareFull style={{ color: "red" }} /> Red
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    onClick={() => filterColor("yellow")}
                  >
                    <FaSquareFull style={{ color: "yellow" }} /> Yellow
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-2"
                    onClick={() => filterColor("black")}
                  >
                    <FaSquareFull style={{ color: "black" }} /> Black
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    onClick={() => filterColor("blue")}
                  >
                    <FaSquareFull style={{ color: "blue" }} /> Blue
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    onClick={() => filterColor("peach")}
                  >
                    <FaSquareFull style={{ color: "peach" }} /> Peach
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    onClick={() => filterColor("white")}
                  >
                    <FaSquareFull style={{ color: "white" }} /> White
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <br />
            </div>
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-10 text-center">
                  <input
                    type="text"
                    class="form-control form-control1"
                    placeholder="Search..."
                    onChange={(event) => {
                      setSearch(event.target.value);
                    }}
                  />
                </div>

                <div className="col-md-1">
                  <button className="btn btn-outline-dark" onClick={increase}>
                    <BsSortUpAlt size="30px" />
                  </button>
                </div>
                <div className="col-md-1">
                  <button className="btn btn-outline-dark" onClick={decrease}>
                    <BsSortDown size="30px" />
                  </button>
                </div>
              </div>
              <div className=" row">
                {postdata.filter((val) => {
                    if (search == "") {
                      return val;
                    } else if (
                      (val.product_name && val.product_descrip)
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((val, index) => (
                    <div className=" container col-md-4">
                      <div className="card1">
                        <img
                          src={val.product_image}
                          className="card-img-top"
                          alt=" "
                          onClick={() => singleitem(val._id)}
                        />
                        <div className="card-body">
                          <h4
                            className="card-title"
                            style={{ color: "blue" }}
                            onClick={() => singleitem(val._id)}
                          >
                            {val.product_name}
                          </h4>
                          <h5 className="card-text">Rs.{val.product_cost}</h5>
                          <ReactStars
                            count={5}
                            size={25}
                            activeColor="#ffd700"
                            className="center "
                            edit={false}
                            isHalf={true}
                            value={val.product_rating}
                            
                          />
                           <a className="btn btn-warning" style={{"border-radius": "12px"}} onClick={() =>
                              props.cart(
                                val._id,
                                val.product_image,
                                val.product_name,
                                val.product_cost
                              )
                            }><h6>{/* <MdOutlineAddShoppingCart/> &nbsp; */} Add to cart</h6></a>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="container bg-light ">
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={postdata.length}
                  paginate={paginate}
                />
              </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
export default connect(mapStateToProps, mapDispatchTopProps)(Filter);