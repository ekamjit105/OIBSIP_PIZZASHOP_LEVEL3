import axios from "axios"
export const getAllStock = ()=>async(dispatch)=>{
    dispatch({type:"GET_STOCK_REQUEST"})
    try {
        console.log("stock request")
        const response = await axios.get("/api/inventory/getAllStock");
        //will continue after the above request is successfully served at the pizzaRouter.js
        console.log("stock from action")
        console.log(response.data)
        dispatch({type:"GET_STOCK_SUCCESS", payload:response.data})
        
    
    } catch (error) {
        dispatch({type:"GET_STOCK_FAIL",payload:error})
    }
}
