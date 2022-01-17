import React,{useState} from 'react';
import { login } from '../../config/MyService';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form, Card,Row,Col } from "react-bootstrap";
import SocialButton from "./SocialButton";
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';

export default function Login() {
    const [state,setState]=useState({email:'',password:'',fname:'',lname:'',uname:'',mobile:'',address:''});

    const handler=(event)=>{
        const {name,value}=event.target;
        setState({...state,[name]:value})
    }
    const navigate = useNavigate();
    
    const handleSocialLogin = (user) => {
        console.log(user._profile);
        navigate("/dashboard");
        const URL = "http://localhost:5000/api/socialuser"
        axios.post(URL, {
            fname: user._profile.firstName,
            lname: user._profile.lastName,
            uname: user._profile.name,
            mobile: user._profile.id,
            email: user._profile.email,
            address: "Sinhagad-Rd,Pune,Maharashtra,India",
            password: "SocialLogin123#",
        })
            .catch(err => { console.log(err) })
      };
    
    const handleSocialLoginFailure = (err) => {
        console.error(err);
      };
    
    const handleOnChange=(value)=>{
        console.log("Captcha value:", value);
      }; 

    const login_user=(event)=>{
        event.preventDefault();
        login(state)
        .then(res=>{
            console.log(res.data.msg)
            if(res.data.err===0){
                localStorage.setItem("_token",res.data.token);
                localStorage.setItem("email",state.email)
                localStorage.setItem("fname",res.data.payload.fname,)
                localStorage.setItem("lname",res.data.payload.lname)
                localStorage.setItem("uname",res.data.payload.uname)
                localStorage.setItem("mobile",res.data.payload.mobile)
                localStorage.setItem("address",res.data.payload.address)
               navigate("/dashboard");
            }
            if(res.data.err===1){
                console.log(res.data)
            }
        })
    }
    return (
        <>
         <div>
            <Container>
            <Row>
           {/* <Button type='submit' color='primary' onClick={submit} variant="contained" style={btnstyle} fullWidth>Submit</Button> */}
            <Col>
            <Card
             style={{
                margin: "auto",
                marginTop: "10rem",
                width: "auto",
                height : "8rem"
            }}
            >
            <SocialButton
            provider="facebook"
            appId="299015965434725"
            onLoginSuccess={handleSocialLogin}
            onLoginFailure={handleSocialLoginFailure}
           
            className="btn btn-primary"
          >
            <h4>Login with Facebook</h4>
          </SocialButton>
          &nbsp;
          <SocialButton
            provider="google"
            appId="150837613508-8til4selbte6qvvr552cmf4asjmc7cjc.apps.googleusercontent.com"
            onLoginSuccess={handleSocialLogin}
            onLoginFailure={handleSocialLoginFailure}
            
            className="btn btn-danger"
          >
            <h4>Login with Gmail</h4>
          </SocialButton> 
          </Card>
          </Col>
          <Col>
                <Card
                    style={{
                        margin: "auto",
                        marginTop: "4rem",
                        width: "auto",
                        height : "38rem"
                    }}
                >
                    <h2 className="text-center"><b>Login to Neo<span className="text-danger">STORE</span></b></h2>
                    <Form
                        style={{
                            width: "400px",
                            margin: "auto",
                        }}
                        onSubmit={(e) => login_user(e)}
                    >
                        <Form.Group>
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="uname"
                                placeholder="Enter UserName"
                                onChange={handler}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                onChange={handler}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handler}
                            />
                        </Form.Group>
                        <br />
                        <ReCAPTCHA
                            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                            onChange={handleOnChange}
                        />,
                        <div className="text-center">
                            <Button variant="dark" type="submit">
                                <h6>Submit</h6>
                            </Button>
                            <br></br>
                            <Button
                                variant="light"
                                type="button"
                                onClick={() => {
                                    navigate("/reset-password");
                                }}
                            >
                                <h6 className='text-danger'>Forget Password</h6>
                            </Button>
                            <Button
                                variant="light"
                                type="button"
                                onClick={() => {
                                    navigate("/register");
                                }}
                            >
                                <h6>Don't have an account? Click Here</h6>
                            </Button>
                        </div>
                    </Form>
                </Card>
                </Col>
                </Row>
            </Container>
        </div>
        </>
        
    )
}

