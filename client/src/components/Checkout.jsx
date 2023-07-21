import React from 'react'
import useRazorpay from "react-razorpay";
import { useSelector, useDispatch } from 'react-redux';
import {createOrder} from '../actions/orderAction'

const Checkout = ({subTotal}) => {
    

    const loginState=useSelector((state)=>state.loginReducer)
    const {currentUser} = loginState
    console.log(currentUser)
    //currentUser?window.location.href="/login":console.log()
    

    const dispatch = useDispatch()
    const cartState=useSelector((state)=>state.cartReducer)
    const {cartItems} = cartState
    //
    //const stock = useSelector((state)=>state.getAllStockReducer);
    //console.log(" Recieved stock state on reaching checkout page..",stock)    


    const orderHandler=(razorpay_payment_id,cartItems,subTotal)=>{
      dispatch(createOrder(razorpay_payment_id,cartItems,subTotal))
    }


    const Razorpay = useRazorpay();
    const handlePayment = () => {
        //const order = await createOrder(params);
        
        
        if(currentUser==null)
        {
          window.location.href="/login"
        }


      const options= {
      
        key: "rzp_test_bYZoWApMjNP1Ln",
        amount: subTotal*100,
        currency: "INR",
        name: "Pizza Shop",
        description: "Test Transaction",
        image: "../../images/logo.png",
        //order_id: "12345",
        handler: (res) => {
          orderHandler(res.razorpay_payment_id,cartItems,subTotal);
         },
        prefill: {
          name: currentUser.name,
          email: currentUser.email,
          contact: "",
        },
        notes: {
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const rzpay = new Razorpay(options);
      rzpay.open();
    }

    return (
      <div className="App">
        <button onClick={handlePayment}>Click</button>
      </div>
    );
  
}

export default Checkout