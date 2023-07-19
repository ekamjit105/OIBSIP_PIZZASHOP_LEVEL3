import React,{useEffect, useState} from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getAllStock } from '../actions/inventoryAction'
import { addToCart } from '../actions/cartAction'

const CustomScreen = () => {
    
    var loadings = true;

    const dispatch = useDispatch()
    useEffect(()=>{
        console.log("dispatching..")
        dispatch(getAllStock())//dispatch action
    }, [dispatch])
    
    
    const stockstate = useSelector((state)=>state.getAllStockReducer)//getting pizza state using useSelector
    const {stock, loading, error} = stockstate;
    loadings=loading;
    console.log("Recieved Stock...")
    console.log(stock)
    console.log(stock[0])

    const addToCartHandler =()=>{
        console.log("clicked")
/*
        var cartItem = {
            name:pizza.name,
            _id:pizza._id,
            image:pizza.image,
            variant:variant,
            quantity:Number(quantity),
            prices:pizza.prices,
            price: pizza.prices[0][variant]*quantity,  
          };
      */if(stock[0])
        var tprice = stock[0].prices[0][base]+stock[1].prices[0][sauce]+stock[2].prices[0][cheese]+stock[3].prices[0][veggies];
        var pobj = {
            name:"Custom Fresh pizza",
            _id:Math.random(),
            image:"/images/custom.jpg",
            prices:[{"medium":tprice}]
        }
        var variant="medium";
        dispatch(addToCart(pobj,1,variant))
      }

    const [variant,setVariant]=useState('small')
    const [quantity,setQuantity]=useState(1)
    

    const [base,setBase]=useState('classic')
    const [sauce,setSauce]=useState('classic')
    const [cheese,setCheese]=useState('mozzerella')
    const [veggies,setVeggies]=useState('corn')
    
    
  
    return (
    <>
    
    <br></br>
        <Container>
        {loadings? <h1>loading....</h1>
                        :error? <h1>Error while loading data</h1>
                            :
            
            
            <Container>
            <h1>Create your Custom Pizza</h1>
                <Row >

                    <Col md={4} style={{"padding":"2%"}}>
                    
                    <img src = "/images/custom_side_img.jpg" style={{"width":"100%"}}></img>
                    
                    
                    </Col>
                    



                    <Col md={8} style={{"padding":"4%", "border": "2px solid red"}}>
                     
                    Select base &nbsp;&nbsp;
                        <select onChange={e=>setBase(e.target.value)}>
                        {stock[0] && stock[0].variants.map(variant=>(

                        <option value={variant}>{variant}</option>

                            ))}                
                        </select>

                        &nbsp;&nbsp;&nbsp;&nbsp;

                        Select sauce &nbsp;&nbsp;
                        <select onChange={e=>setSauce(e.target.value)}>
                        {stock[1] && stock[1].variants.map(variant=>(

                        <option value={variant}>{variant}</option>

                            ))}                
                        </select>

                        <br></br>
                            <br></br>

                            Select cheese&nbsp;&nbsp;
                        <select onChange={e=>setCheese(e.target.value)}>
                        {stock[2] && stock[2].variants.map(variant=>(

                        <option value={variant}>{variant}</option>

                            ))}                
                        </select>

                            
                        &nbsp;&nbsp;&nbsp;&nbsp;


                        Select veggies &nbsp;&nbsp;
                        <select onChange={e=>setVeggies(e.target.value)}>
                        {stock[3] && stock[3].variants.map(variant=>(

                        <option value={variant}>{variant}</option>

                            ))}                
                        </select>

                        <br></br>
                            <br></br>

                        <hr></hr>
                        <br></br>

                        <Row>
                                <Col md={6}>
                            {!stock[0]?(<h1></h1>):(
                                <>
                                <h3>Chosen Ingredients</h3>
                                Base : {base} = Rs {stock[0].prices[0][base]} /- &nbsp; 
                                <br></br> Sauce : {sauce} = Rs {stock[1].prices[0][sauce]} /- &nbsp;
                                <br></br> Cheese : {cheese} = Rs {stock[2].prices[0][cheese]} /- &nbsp; 
                                <br></br>Topping : {veggies} = Rs {stock[3].prices[0][veggies]} /- &nbsp;                        
                            <br></br>
                            <br></br>
                                <h3>Price : {stock[0].prices[0][base]+stock[1].prices[0][sauce]+stock[2].prices[0][cheese]+stock[3].prices[0][veggies]}</h3>  
                            <br></br>
                            </>
                            )}
                                
                                </Col>
                                <Col md={6}>
                                    
                                    <Button onClick={addToCartHandler}>Add to Cart</Button>

                                </Col>
                            </Row>












                    </Col>
                </Row>
        
            </Container>
        }
                    <br></br>        


        </Container>



    </>
    
    
    )
}

export default CustomScreen