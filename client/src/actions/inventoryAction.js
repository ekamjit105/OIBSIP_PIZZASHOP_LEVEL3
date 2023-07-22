import axios from "axios"
export const getAllStock = ()=>async(dispatch)=>{
    dispatch({type:"GET_STOCK_REQUEST"})
    try {
        const response = await axios.get("/api/inventory/getAllStock");
        //will continue after the above request is successfully served at the pizzaRouter.js
        dispatch({type:"GET_STOCK_SUCCESS", payload:response.data})
    } catch (error) {
        dispatch({type:"GET_STOCK_FAIL",payload:error})
    }
}
