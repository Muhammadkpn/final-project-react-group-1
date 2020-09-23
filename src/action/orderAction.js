
import {URL, GET_ORDER_ALL, GET_ORDER_ID, UPLOAD_PAYMENT_ERROR, GET_ORDER_USER  } from "./helper"
import Axios from "axios"

export const getAllOrder = () =>{
    return async(dispatch)=>{
        try {
            const res = await Axios.get(URL + `/orders/get`)
            console.log(res.data)
            dispatch({type: GET_ORDER_ALL, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}
export const getUserOrder = () =>{
    return async(dispatch)=>{
        try {
            let id = localStorage.getItem('id')
            const res = await Axios.get(URL + `/orders/getByUserID/${id}`)
            console.log(res.data)
            dispatch({type: GET_ORDER_USER, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}
// UNTUK USER !!
export const getUserOrderByStatus = (body) =>{
    return async(dispatch)=>{
        try {
            let id = localStorage.getItem('id')
            const res = await Axios.get(URL + `/orders/getByOrderUserIDStatus/${id}`, body)
            console.log(res.data)
            dispatch({type: GET_ORDER_USER, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}

export const getOrderByNumber = (order_number) =>{
    return async(dispatch)=>{
        try {
            const res = await Axios.get(URL + "/orders/getByOrderNumber/" + order_number)
            console.log(res.data)
            dispatch({type: GET_ORDER_ID, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}

export const checkoutAction = (order_number) =>{
    return async(dispatch)=>{
        try {
            const checkout = await Axios.patch(URL + "/transaction/checkout/" + order_number)
            let id = localStorage.getItem('id')
            const res = await Axios.get(URL + `/orders/getByUserID/${id}`)
            console.log(res.data)
            dispatch({type: GET_ORDER_ID, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}

export const uploadPayment = (order_number,data) => {
    return async (dispatch) => {
        const option = {
            header: {
                'Content-type': 'multipart/form-data'
            }
        }
        try {
            const upload = await Axios.post(URL + `/transaction/payment/upload/${order_number}`, data, option)
        } catch (error) {
            console.log(error.response ? error.response.data : error)
            dispatch({ type: UPLOAD_PAYMENT_ERROR, payload: error.response.data })
        }
    }
}