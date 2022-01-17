import React,{useState} from 'react'
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify';
import {Link,useNavigate} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const ForgetPassword = (props) => {
    const [inputField,setInputField] = useState({
        otpCode:'',
        password: '',
        cpassword: '',
    })
    const navigate = useNavigate();
    const [errField,setErrField] = useState({
        otpCodeErr:'',
        passwordErr:'',
        cpasswordErr:'',
    })
    const validForm = () =>{
        let formIsValid =true;
        setErrField({
            otpCodeErr:'',
            passwordErr:'',
            cpasswordErr:'',
        })
        if(inputField.otpCode === ''){
            formIsValid = false
                setErrField(prevState =>({
                    ...prevState, otpCodeErr: 'Please Enter Email' 
                }))
        }
        if(inputField.password === ''){
            formIsValid = false
                setErrField(prevState =>({
                    ...prevState, passwordErr: 'Please Enter Password' 
                }))
        }
        if(inputField.cpassword === ''){
            formIsValid = false
                setErrField(prevState =>({
                    ...prevState, cpasswordErr: 'Please Enter Confirm Password' 
                }))
        }
        if(inputField.cpassword !== '' && inputField.password !== inputField.cpassword){
            formIsValid = false
                setErrField(prevState =>({
                    ...prevState, cpasswordErr: 'Password does not match' 
                }))
        }
        return formIsValid
    }
    const inputHandler = (e) =>{
       setInputField({...inputField,[e.target.name]: e.target.value})
    }

    const submitButton = async () =>{
        if(validForm()) {
            Object.assign(inputField,props)
            let url = 'http://localhost:5000/api/change-password'
            let options = {
                method: 'POST',
                url: url,
                data: inputField
            }
            try{
                let response = await axios(options)
                console.log(response)
                if(response.data.statusText === 'Success'){
                    toast.success(response.data.message)
                    navigate('/');
                }else{
                    toast.error(response.data.message);
                }
            }catch (e){
                toast.error('Something went wrong!');
            }
        }else{
            toast.error('Form Invalid!');
        }
    }

    return (
        <>
        <form autoComplete='off' action="" method="post">
            <ToastContainer />
            <div className='mb-3'>
                <label className='form-label'>Otp Code</label>
                <input type="email" className='form-control' name="otpCode" maxLength="4" autoComplete="off" value={inputField.otpCode} onChange={inputHandler} />
                {
                    errField.otpCodeErr.length > 0 && <span style={{ color: "red" }} className="error">{errField.otpCodeErr}</span>
                }
            </div>
            <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input type="password" className='form-control' name="password" autoComplete="off" value={inputField.password} onChange={inputHandler} />
                {
                    errField.passwordErr.length > 0 && <span style={{ color: "red" }} className="error">{errField.passwordErr}</span>
                }
            </div>
            <div className='mb-3'>
                <label className='form-label'>Confirm Password</label>
                <input type="password" className='form-control' name="cpassword" autoComplete="off" value={inputField.cpassword} onChange={inputHandler} />
                {
                    errField.cpasswordErr.length > 0 && <span style={{ color: "red" }} className="error">{errField.cpasswordErr}</span>
                }
            </div>
            <div>
                <button type="button" className='btn btn-primary' onClick={submitButton}>Change Password </button> &nbsp;
                <Link to ='/'><button type="button" className="btn btn-success">Back</button></Link><br /> <br />

            </div>

        </form>
            
        </>
    )
}

export default ForgetPassword
