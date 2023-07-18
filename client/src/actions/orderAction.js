import axios from 'axios'

export const createOrder = (razorpay_payment_id,cartItems, subTotal) =>async(dispatch,getState)=>{
    dispatch({type:"ORDER_CREATE_REQUEST"})
    const loginState = getState().loginReducer
    const {currentUser} = loginState
    const order ={
        name:currentUser.name,
        email:currentUser.email,
        userId:currentUser._id,
        orderItems:cartItems,
        orderAmount:subTotal,
        isDelivered:false,
        transactionId:razorpay_payment_id
    }
    try {
        const response = await axios.post("/api/orders/placeOrder",order)
        dispatch({type: "ORDER_CREATE_SUCCESS",payload:response.data})
        localStorage.setItem("cartItems",[])
        window.location.href="/"
    } catch (error) {
        dispatch({type:"ORDER_CREATE_FAIL",payload:error})        
    }
}



export const getMyOrders = () =>async(dispatch,getState)=>{
 
    dispatch({type:"GET_ORDER_REQUEST"})
    try {
        const {currentUser} = getState().loginReducer
       
        const userId= currentUser._id
        
        const response = await axios.post("/api/orders/myOrders",{userId})
        
        dispatch({type:"GET_ORDER_SUCCESS",payload:response.data})
    } catch (error) {
        dispatch({type:"GET_ORDER_FAIL",payload:error})
        
    }
}



export const getAllOrders = () => async (dispatch, getState) => {
    // const currentUser = getState().loginUserReducer.currentUser;
    dispatch({
      type: "ALL_ORDER_REQUEST",
    });
    try {
      const response = await axios.get("/api/orders/alluserorder");
      dispatch({ type: "ALL_ORDER_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "ALL_ORDER_FAIL", payload: error });
    }
  };
  
  export const deliverOrder = (orderid) => async (dispatch, getState) => {
    // const currentUser = getState().loginUserReducer.currentUser;
    dispatch({
      type: "GET_ALL_ORDER_REQUEST",
    });
    try {
      await axios.post("/api/orders/deliverorder", { orderid });
      alert("Delivered Success");
      const orders = await axios.get("/api/orders/alluserorder");
      dispatch({ type: "GET_ALL_ORDER_SUCCESS", payload: orders.data });
      window.location.href = "/admin/orderlist";
    } catch (error) {
      dispatch({ type: "GET_ALL_ORDER_FAIL", payload: error });
    }
  };
  