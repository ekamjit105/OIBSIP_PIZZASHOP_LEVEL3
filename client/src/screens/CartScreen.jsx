import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Row, Col, Container} from 'react-bootstrap'
import { FaPlusCircle, FaMinusCircle,FaTrash} from "react-icons/fa";
import {addToCart, deleteFromCart} from '../actions/cartAction'
import Checkout from '../components/Checkout';

const CartScreen =()=>{
    const dispatch = useDispatch();
    const cartState = useSelector((state)=>state.cartReducer);
    const cartItems = cartState.cartItems
    //const [firstpizza, ...remainig] = cartItems
    const subTotal = cartItems.reduce((x, item) => x + item.price, 0);

    return(
        <>
            
            <Container>
                <Row><Col md={7}>
                <h1> My Cart</h1>
                    <br/>
                    {cartItems.map((item)=>(
                        
                        <Row style={{backgroundColor:'lightgrey', margin:'2%', padding:'2%'}}>
                        <Col md={7}>
                            <h4>{item.name} ({item.variant})</h4>
                            {item.name==="Custom Fresh pizza"?<h6>Description: <br></br>{item.description}</h6>:<h1></h1>}
                            <h5>Quantity : &nbsp;
                            
                            <FaPlusCircle style={{cursor:'pointer'}} onClick={()=>{dispatch(addToCart(item,item.quantity+1,item.variant,true))}}/> 

                            &nbsp;{item.quantity}&nbsp;

                            <FaMinusCircle style={{cursor:'pointer'}} onClick={()=>{dispatch(addToCart(item,item.quantity-1,item.variant,false))}}/></h5>
                            
                            <h5>Price : {item.prices[0][item.variant]}/- X {item.quantity}</h5><h4>Rs {item.price}/-</h4>
                        
                        
                        </Col>
                        <Col md={4}>
                        <img src={item.image} alt="" style={{width:'150px', height:'100px'}}></img>
                        </Col>
                        <Col md={1}>
                        <FaTrash style={{cursor:'pointer'}} onClick={()=>{dispatch(deleteFromCart(item,item.quantity,item.variant))}}/>
                        </Col>
                    </Row>
                        

                    ))}
                    
                </Col>
                
                
                
                
                <Col md={5}>
                <h1> Payment Info</h1> 
                <br/>
                <h3>Subtotal = Rs {subTotal}/-</h3>
                <br/>
                <Checkout subTotal = {subTotal}> Proceed to checkout </Checkout>
                </Col>
                </Row>

            </Container>

       </>
    )
}
export default CartScreen