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
    } catch (error) {
        dispatch({type:"ORDER_CREATE_FAIL",payload:error})        
    }

    try {
      const response = await axios.get("/api/inventory/getAllStock");
        //will continue after the above request is successfully served at the pizzaRouter.js
        console.log("stock from order action")
        console.log(response.data)
        dispatch({type:"GET_STOCK_SUCCESS", payload:response.data})
        const {stock} = getState().getAllStockReducer
        console.log(stock);


        //calculating LOW stock
        var s="** STOCK ALERT ** The following stock is low : \n";

        for(var i=0;i<stock.length;i++)
        {
          var type=stock[i].name;
          s+=type+" : ";
          console.log("type : "+type)
          
          var obj = stock[i].varqty[0];


          for(var j=0;j<Object.keys(obj).length;j++)
          {
            var name = Object.keys(obj)[j];
              
            var value = obj[Object.keys(obj)[j]];
            console.log("name : "+name+" value : "+value)
            
            if(value<=10 && value!=null)
            {
              console.log("low");
              s+=name+"("+value+") ";
            }
          }
          s+="    \n";
        }

        console.log("Stock Report......" , s)



        //now sending mail for updated stock

        
        var mailobj = {
          to : "ekamjit105@gmail.com",
          subject : "!! STOCK ALERT REPORT !!",
          text:s,
        }

        response =  await axios.post('/api/mail/sendmail',mailobj);
        dispatch({ type: "SEND_MAIL_SUCCESS" });  
        //empty the cart
        
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
  