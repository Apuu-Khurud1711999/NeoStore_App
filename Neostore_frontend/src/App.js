import React,{Suspense,lazy} from "react";
import "./App.css";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import NavbarDash from "./components/layout/NavbarDash";
import Footer from "./components/layout/Footer";
//import Dashboard from "./components/pages/Dashboard";

/* const Dashboard = lazy(() => import('./components/pages/Dashboard'));
const Login = lazy(() => import('./components/user_modules/Login'));
const Register = lazy(() => import('./components/user_modules/Register'));
const Product = lazy(() => import('./components/product/Product'));
const Orders = lazy(() => import('./components/user_account/Orders'));
const OtpForm = lazy(() => import('./components/user_modules/OtpForm'));
const Profile = lazy(() => import('./components/user_account/Profile'));
const Cart = lazy(() => import('./components/product/Cart'));
 */
function App() {
  return (
    <div className="App">
           <NavbarDash />
          {/*  <Router>
             <Suspense fallback={<div>Loading...</div>}>
             <Navbas />
                <Routes>
                    <Route exact path="/dashboard" element={<Dashboard />} />   
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/cart" element={<Cart />} />   
                    <Route path="/order" element={<Orders />} />  
                    <Route path="/profile" element={<Profile />} /> 
                    <Route path='/reset-password' element={<OtpForm/>} />
                </Routes>
                </Suspense>
            <Footer /> 
            </Router> */}
    </div>
  );
}

export default App;