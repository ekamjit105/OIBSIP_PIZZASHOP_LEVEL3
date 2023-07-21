import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getMyOrders } from '../actions/orderAction'
import {Container, Row, Col} from 'react-bootstrap' 

const OrdersScreen = () => {
    
    const dispatch = useDispatch();
    
    const orderState = useSelector((state)=>state.myOrdersReducer)
    const {orders} =orderState 
    useEffect(() => {
        dispatch(getMyOrders())
      }, [dispatch]);  

    
return (
    <> <h1 className="text-center ">Your Orders </h1>
    
    {orders &&
      orders.map((order) => (
        <div className="container border p-4 bg-light">
       <Container>
          <Row>
            <Col md={4}>
              <h4>Items :</h4>
              {order.orderItems.map((item) => (
                <h5 key={item.name}>
                 {item.name} ({item.variant}) x {item.quantity} ={" "}
                            
                 
                  Rs {item.price}/-
                  {item.name==="Custom Fresh pizza"?<h6>Description: <br></br>{item.description}</h6>:<h1></h1>}
                 
                </h5>
              ))}
            </Col>
            <Col md={3}>
            </Col>
            <Col md={5}>
              <h4>Order Info :</h4>
              <h6>Order id : {order._id}</h6>
              <h6>Order Amount : Rs {order.orderAmount}/-</h6>
              <h6>Transaction id : {order.transactionId}</h6>
              <h5>Status : {order.isDelivered?<>Delivered</>:<>Not delivered</>}</h5>
            </Col>
          </Row>
          </Container>
        </div>
      ))}
  </>
  )
}

export default OrdersScreen