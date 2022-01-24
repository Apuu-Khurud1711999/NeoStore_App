import React,{useState} from 'react';
import { login } from '../../config/MyService';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form, Card,Row,Col } from "react-bootstrap";
import SocialButton from "./SocialButton";
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import './Style.css';

const regForUsername = RegExp(/^.{1,35}$/);
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPassword = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])(?!.*\s).{8,25}$/);

export default function Login() {
    const [state,setState]=useState({email:'',password:'',fname:'',lname:'',uname:'',mobile:'',address:''});
    const [data, setData] = useState({
        errors: {
            uname:"",
            email: "",
            password: "",
        },
    });

    const handler=(event)=>{
        const {name,value}=event.target;
        let errors = data.errors;

        switch (name) {
           
            case "uname":
                errors.uname = regForUsername.test(value)
                    ? ""
                    : "Username should be between 7-20 characters and can contain numbers. Can contain _ and . but should not start or end with them and should not appear next to each other and can be used only once";
                break;

            case "email":
                errors.email = regForEmail.test(value)
                    ? ""
                    : "Enter Valid Email";
                break;

            case "password":
                errors.password = regForPassword.test(value)
                    ? ""
                    : "Password must be between 8-25 characters and should contain atleast one lowercase letter, one uppercase letter and one special character";
                break;

            default:
                alert("Fill proper details");
        }
        setData({  errors, [name]: value });
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
            email: user._profile.email
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
        if (state.email == "" || state.password == "" || state.uname == "" ) {
            alert("Please fill all the fields");
        }
        else if(validate(data.errors)) {
        login(state)
        .then(res=>{
            console.log(res.data.msg)
            if(!res.data.err){
                localStorage.setItem("_token",res.data.token);
                localStorage.setItem("email",state.email)
               navigate("/dashboard");
            }
            else if(res.data.err){
                console.log(res.data)
            }
        })
        }
        else {
            alert("Please Enter Valid Details");
        }
    }
    
    const validate = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    };
    return (
        <>
         <div>
            <Container>
            <Row>
            <Col>
            <Card className='login' >
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
                <Card className='loginform'>
                    <h2 className="text-center"><b>Login to Neo<span className="text-danger">STORE</span></b></h2>
                    <Form
                        className='formlogin'
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
                            <Form.Text>
                                {data.errors.uname.length > 0 && (
                                    <span className="color">
                                        {data.errors.uname}
                                    </span>
                                )}
                            </Form.Text>
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
                            <Form.Text>
                                {data.errors.email.length > 0 && (
                                    <span className="color">
                                        {data.errors.email}
                                    </span>
                                )}
                            </Form.Text>
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
                        <Form.Text>
                                {data.errors.password.length > 0 && (
                                    <span className="color">
                                        {data.errors.password}
                                    </span>
                                )}
                            </Form.Text>
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

