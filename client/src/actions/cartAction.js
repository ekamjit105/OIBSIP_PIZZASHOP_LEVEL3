import axios from "axios"

export const addToCart = (pizza,quantity,variant,increment)=>async(dispatch,getState)=>{
    var cartItem = {
      name:pizza.name,
      _id:pizza._id,
      image:pizza.image,
      variant:variant,
      quantity:Number(quantity),
      prices:pizza.prices,
      price: pizza.prices[0][variant]*quantity,
      description:pizza.description?pizza.description:"",  
      ingredients:pizza.ingredients?pizza.ingredients:{},  
    };
    var stockobject;
    if(pizza.ingredients)//custom pizza
    {stockobject = {
      base:pizza.ingredients["base"], 
      sauce:pizza.ingredients["sauce"], 
      cheese:pizza.ingredients["cheese"], 
      veggies:pizza.ingredients["veggies"], 
      qty:increment?-1*(quantity/quantity):(quantity/quantity)}
    }
console.log("stockobject created")
console.log(stockobject)

    if(quantity<1)
    {
      dispatch({type:"DELETE_FROM_CART",payload:cartItem})
    
      if(pizza.ingredients)//custom pizza
      {try {
        console.log("sending stock object..",stockobject)
         
        const response = stockobject?await axios.post("/api/inventory/updatestock",stockobject):{};
        
        dispatch({type:"ADD_TO_CART",payload:cartItem})
      } catch (error) {
              console.log("error while updating stock.."+error)  
      }}
    
    }

    else if(quantity>10)
    {alert('Maximum quantity 10 per pizzas')
    }

    else{
    //dispatch({type:"ADD_TO_CART",payload:cartItem})
    

        try {
          console.log("sending stock object..",stockobject)
           
          const response = stockobject?await axios.post("/api/inventory/updatestock",stockobject):{};
          
          dispatch({type:"ADD_TO_CART",payload:cartItem})
        } catch (error) {
                console.log("error while updating stock.."+error)  
        }
    }


    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cartReducer.cartItems)
      );
    // STORING THE CART ITEMS in browsers local storage
    //syntax : localStorage.setItem(key, value);
    //value must be a JSON String
}

export const deleteFromCart = (pizza,quantity,variant) =>async(dispatch,getState)=>{
  dispatch({type:"DELETE_FROM_CART",payload:pizza})
  
  if(pizza.ingredients)//custom pizza
      {
        
        var stockobject = {
          base:pizza.ingredients["base"], 
          sauce:pizza.ingredients["sauce"], 
          cheese:pizza.ingredients["cheese"], 
          veggies:pizza.ingredients["veggies"], 
          qty:quantity}
        
        
        
        try {
        console.log("sending stock object..",stockobject)
         
        const response = stockobject?await axios.post("/api/inventory/updatestock",stockobject):{};
        
      } catch (error) {
              console.log("error while updating stock.."+error)  
      }}




  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems)
  );
}