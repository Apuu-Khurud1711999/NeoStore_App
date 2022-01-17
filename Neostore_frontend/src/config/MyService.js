import axios from 'axios';
import { MAIN_URL } from './Url';
import { PRO_URL } from './Url';

 let token=localStorage.getItem('_token');

 export function getOrders(){
    return axios.get(`${MAIN_URL}fetchorders`,{
        headers:{"Authorization":`Bearer ${token}`}});
}

 export function addOrders(){
    return axios.post(`${MAIN_URL}addorder`);
}

/*
 export function getProducts(){
     return axios.get(`${MAIN_URL}fetchproduct`,{
        headers:{"Authorization":`Bearer ${token}`}});
 } */
 export function getProducts(){
    return axios.get(`${MAIN_URL}fetchproduct`);
}

export function getPosts(){
    return axios.get(`${MAIN_URL}filter`);
}

export function getsingleproduct(data){
    return axios.get(`${MAIN_URL}singleproduct/`+data);
}

export function getsingleorder(data){
    return axios.get(`${MAIN_URL}singleorder/`+data);
}

export function getProfile(email){
    return axios.get(`${MAIN_URL}profile/${email}`,
    {headers:{"Authorization":`Bearer ${token}`}}
    );
}

export function getOrder(email){
    return axios.get(`${MAIN_URL}order/${email}`,
    {headers:{"Authorization":`Bearer ${token}`}}
    );
}

export function register(){
    return axios.post(`${MAIN_URL}register`);
}

export function login(data){
    return axios.post(`${MAIN_URL}login`,data);
}

export function socialUser(data){
    return axios.post(`${MAIN_URL}socialuser`,data);
}

export function emailSend(data){
    return axios.post(`${MAIN_URL}email-send`,data);
}

export function changePassword(data){
    return axios.post(`${MAIN_URL}change-password`,data);
}