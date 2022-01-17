import React, { useEffect, useState } from "react";
import { Card, Button, Row, Container } from "react-bootstrap";
import "./button.css";

const Dashboard = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [products, setproducts] = useState([]);

    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

    useEffect(() => {
        fetch(`http://localhost:5000/api/fetchproduct/?page=${pageNumber}`)
          .then((response) => response.json())
          .then(({ totalPages, products }) => {
            setproducts(products);
            setNumberOfPages(totalPages);
          });
      }, [pageNumber]);
    
      const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
      };
    
      const gotoNext = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
      };

    return (
        <>
            <h3>Page No. {pageNumber + 1}</h3>
            <Container 
                style={{
                    backgroundColor: "lightgray",
                    border: "1px solid black",
                }}
            >
                <br />
                <Row
                    style={{ justifyContent: "center" }}
                    className="text-center"
                >
                    {products.map((value, index) => {
                        return (
                            <Card style={{ width: "20rem" }} key={value._id}>
                                <Card.Img
                                    variant="Ladies Clothing"
                                    src={value.product_image}
                                    height="400px"
                                />
                                <Card.Body>
                                    <Card.Title>{value.product_name}</Card.Title>
                                    <Card.Text>&#8377;{value.product_cost}</Card.Text>
                                    <Button variant="dark">Add to cart</Button>
                                </Card.Body>
                            </Card>
                        );
                    })
                }
                </Row>
                <br />
            </Container>
        <button onClick={gotoPrevious}>Previous</button>
         {pages.map((pageIndex) => (
        <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
          {pageIndex + 1}
        </button>
      ))}
      <button onClick={gotoNext}>Next</button>
        </>
    )
}

export default Dashboard




