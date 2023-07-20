import React,{useState} from 'react'    //react is default exported, useState hook is not default so in {}
import { Card, Button, Row, Col } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';

import {addToCart} from '../actions/cartAction'
import {useDispatch} from 'react-redux'

const Pizza = ({pobj}) => {
  const [variant,setVariant]=useState('small')
  const [quantity,setQuantity]=useState(1)

  //const [state, setState] = useState(initialValue);
  //state: This is the current value of the state variable. You can access it like any other variable.
  //setState: This is a function sed to update the state value. When you call setState(newValue), it will update the state to the new Value you provide.
  
  //similarly creating for modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const dispatch = useDispatch();

  
  const addToCartHandler =()=>{
    console.log("clicked")
    const increment = true;
    dispatch(addToCart(pobj,quantity,variant,increment))
  }
  //this handler function dispatches the addtocart action when the button is clicked

  return (
    <><Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={pobj.image} style={{width:'100%', height:'150px'}} onClick={handleShow}/>
      <Card.Body>
        <Card.Title>{pobj.name}</Card.Title>
        <Card.Text>
          {pobj.description}
        </Card.Text>
        <Card.Text>
          <Row>
            <Col md={6}>
                variants

                <br/>
                <select onChange={e=>setVariant(e.target.value)}>
                    {pobj.variants.map(variant=>(

                        <option value={variant}>{variant}</option>

                    ))}
                </select>
            </Col>
            
            <Col md={6}>
                quantity
                    
                <br/>
                <select onChange={e=>setQuantity(e.target.value)}>
                    { //using curly braces because it is a js code
                      [...Array(10).keys()].map(i=>(
                        //the Array(10).keys() part returns an iterator object 
                        //hence we expand it to a new array using ...
                        <option value={i+1}>{i+1}</option>
                    ))}
                </select>
            </Col>
          </Row>
        </Card.Text>
        <Row>
          <Col md={6}>Price : Rs {pobj.prices[0][variant]*quantity}/-</Col>
          <Col md={6}><Button variant="primary" onClick={addToCartHandler}>Add to cart</Button></Col>
        </Row>
        
      </Card.Body>
    </Card>
    
    { //WE CAN ADD OTHER JS FUNCTIONS HERE IF NEEDED
      //BEFORE THE END OF FRAGMENT </>
    }

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{pobj.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <img src={pobj.image} alt="" style={{height:"250px", width:"100%"} }></img>
          DESCRIPTION: 
        {pobj.description}
        
        </Modal.Body>
        <Modal.Footer>
          
          
        </Modal.Footer>
      </Modal>
    
    
    
    
    
    
    
    
    
    
    </>
  )
}

export default Pizza