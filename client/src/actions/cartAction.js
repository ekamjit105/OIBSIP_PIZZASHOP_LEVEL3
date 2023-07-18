export const addToCart = (pizza,quantity,variant)=>async(dispatch,getState)=>{
    var cartItem = {
      name:pizza.name,
      _id:pizza._id,
      image:pizza.image,
      variant:variant,
      quantity:Number(quantity),
      prices:pizza.prices,
      price: pizza.prices[0][variant]*quantity,  
    };

    if(quantity<1)
    {
      dispatch({type:"DELETE_FROM_CART",payload:cartItem})
    }

    else if(quantity>10)
    {alert('Maximum quantity 10 per pizzas')
    }

    else{
    dispatch({type:"ADD_TO_CART",payload:cartItem})
    }
    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cartReducer.cartItems)
      );
    // STORING THE CART ITEMS in browsers local storage
    //syntax : localStorage.setItem(key, value);
    //value must be a JSON String
}

export const deleteFromCart = (pizza) =>async(dispatch,getState)=>{
  dispatch({type:"DELETE_FROM_CART",payload:pizza})
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems)
  );
}