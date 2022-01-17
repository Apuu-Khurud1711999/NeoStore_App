import React from 'react'
import {Carousel} from 'react-bootstrap';

const Home = () => {
  return (
    <>
<Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://images-na.ssl-images-amazon.com/images/G/31/img19/Fashion/WA19/DressStore_Sobe/updates/Double-hero-pink._CB437954636_.jpg"
      alt="First slide"
    />
    {/* <Carousel.Caption>
      <h3>Welcome to Neo<span className="text-danger">STORE</span>!!</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption> */}
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhpbmclMjBzdG9yZXxlbnwwfHwwfHw%3D&w=1000&q=80"
      alt="Second slide"
    />

  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://retailminded.com/wp-content/uploads/2018/10/IMG_0162-1-760x500.jpg"
      alt="Third slide"
    />
    
  </Carousel.Item>
</Carousel>

<section class="row text-center text-white headerset">
<div class="bg-primary hw col-lg-4 col-md-4 col-sm-4 col-10 d-block m-auto">
<i class="fa fa-plane" aria-hidden="true"></i>
  <h6>FREE SHIPPING WORLDWIDE</h6>

</div>
<div class="bg-danger hw col-lg-4 col-md-4 col-sm-4 col-10 d-block m-auto">
<i class="material-icons">&#xe627;</i>
  <h6>100% MONEY BACK - 48 HOURS</h6>

</div>
<div class="bg-warning hw col-lg-4 col-md-4 col-sm-4 col-10 d-block m-auto">
<i class="fa fa-clock-o" aria-hidden="true"></i>
   <h6>24/7 ONLINE CUSTOMER SUPPORT</h6>
</div>

</section>
      
    </>
  )
}

export default Home
