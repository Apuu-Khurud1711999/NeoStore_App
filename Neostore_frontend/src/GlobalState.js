import React, {createContext, useState, useEffect} from 'react'
import ProductsAPI from './components/product/ProductsAPI';
import CategoriesAPI from './components/product/CategoriesAPI';

//import axios from 'axios'

export const GlobalState = createContext()


export const DataProvider = ({children}) =>{

    const state = {
        productsAPI: ProductsAPI(),
        categoriesAPI: CategoriesAPI()
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}