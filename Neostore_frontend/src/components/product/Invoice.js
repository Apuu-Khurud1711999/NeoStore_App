import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row, Table } from "react-bootstrap";
import { getsingleorder } from "../../config/MyService";
import { useLocation } from "react-router";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import './invoice.css';

function Invoice(props) {
  const [postdata, setPostdata] = useState([]);
  let [id, setId] = useState('');
  let [user, setUser] = useState('');
  let [name, setName] = useState('');
  let [card, setCard] = useState('');
  let [price, setPrice] = useState('');
  let [date, setDate] = useState('');
 
  const { state } = useLocation();
  const ref = React.createRef();

  useEffect(() => {
    console.log(state.id);
    getsingleorder(state.id)
      .then((res) => {
        console.log(res.data);
        setPostdata(res.data.order);
        setId(res.data.order._id);
        setUser(res.data.order.user);
        setName(res.data.order.name);
        setCard(res.data.order.card);
        setPrice(res.data.order.price);
        setDate(res.data.order.date)
      });
  }, []);
  console.log(postdata);

  console.log(ref);

  const generatePdf = () => {
    const input = document.getElementById("divToPrint");
    console.log(input);
    html2canvas(input, { useCORS: true }).then((canvas) => {
        const pdf = new jsPDF();
        const img = canvas.toDataURL(
            "https://image.shutterstock.com/image-vector/invoice-typographic-stamp-sign-badge-260nw-1027820257.jpg"
        );
        pdf.addImage(img, "JPEG", 0, 0);
        pdf.save("Invoice.pdf");
    });
};

  return (
    <> 
     <Container>
                <div className="text-center">
                    <Button variant="success" onClick={() => generatePdf()}>
                        Generate PDF
                    </Button>
                </div>
            </Container>
            <br />
            <Container
                className="invoicewidth"
                ref={ref}
                id="divToPrint"
            >
                <div className="backgroundinvoice">
                    <Row>

                        <Col md={4}>
                            <div>
                                <Image
                                    src="https://image.shutterstock.com/image-vector/invoiced-icon-paper-invoice-folder-260nw-1738752572.jpg"
                                    width="100px"
                                    height="100px"
                                />
                            </div>
                        </Col>
                        <Col md={4}>
                            <div><h1>Neo<span className="text-danger">STORE</span></h1></div>
                        </Col>
                        <Col md={4}>
                            <h2>Invoice</h2>
                            <p>Number: {id}</p>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row>
                        <Col md={6}>
                            <p>
                                <span
                                    className="boldtext gray"
                                >
                                    FROM
                                </span>
                                <br />
                                <span className="boldtext">
                                    Neo<span className="text-danger">STORE</span>
                                </span>
                                <br />
                                neostore@neosoftmail.com
                                <br />
                                9876543210
                            </p>
                            <br />
                            <p>
                                <span
                                    className="boldtext gray"
                                >
                                    BILL TO
                                </span>
                                <br />
                               
                                  
                                        <>
                                            <span
                                               className="boldtext"
                                            >
                                                {user}
                                            </span>
                                            {/* <br />
                                            {user} */}
                                            <br />
                                            9876543210
                                            <br />
                                            Maharashtra,India
                                        </>
                                  
                            </p>
                        </Col>
                        <Col md={6}>
                                    <div>
                                        <p>
                                            <span
                                                className="boldtext gray"
                                            >
                                                STATUS
                                            </span>
                                            <br />
                                            <span
                                                className="boldtext red"
                                            >
                                               Paid
                                            </span>
                                            <br />
                                        </p>
                                        <p>
                                            <span
                                                className="boldtext gray"
                                            >
                                                DATE
                                            </span>
                                            <br />
                                            <span
                                                 className="boldtext"
                                            >
                                                {date}
                                            </span>
                                            <br />
                                        </p>
                                        <p>
                                            <span
                                                className="boldtext gray"
                                            >
                                                AMOUNT
                                            </span>
                                            <br />
                                            <span
                                                 className="boldtext"
                                            >
                                                &#8377; {price}
                                            </span>
                                            <br />
                                        </p>
                                    </div>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                               
                                    <tr>
                                        <td>{name}</td>
                                        <td>&#8377; {price}</td>
                                    </tr>
                               
                        </tbody>
                    </Table>
                </div>
                <div>
                    <span  className="boldtext">Payment Terms:</span>
                    <br />
                   Payment should be done within 30 days.
                   Thank You!!
                   Visit Again!
                </div>
                <br />
            </Container>
    </>
  );
}

export default Invoice; 



