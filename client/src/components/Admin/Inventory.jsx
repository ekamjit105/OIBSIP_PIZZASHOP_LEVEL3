import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Table} from 'react-bootstrap'
import { getAllStock } from '../../actions/inventoryAction'

const Inventory = () => {
    const {stock} = useSelector((state) => state.getAllStockReducer);
  
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllStock())//dispatch action
    }, [dispatch]);
  
  
  
    return (
    
    <>
    <h1>Inventory</h1>
    <br></br>

    {stock && stock.map((item) => (
      
    <div>
    <h1>{item.name}</h1>
          
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Variant</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Warning</th>
              </tr>
            </thead>
            <tbody>
            {[...Array(item.variants.length)].map((x,i) =>
            (
                
                 <tr>
                    <td>
                    
                    {item.variants[i]}
                    </td>

                    <td>
                    {item.prices[0][item.variants[i]]}
                    </td>
                    
                    <td>
                    {item.varqty[0][item.variants[i]]}
                     
                    </td>
                    <td>
                    {item.varqty[0][item.variants[i]]<=10?<h4 style={{"color":"red"}}>LOW</h4>:<h5 style={{"color":"green"}}>Sufficient</h5>
                                     
                    }</td>
                    
                  </tr>
               ))}
            </tbody>
          </Table>
      
        </div>

        ))} 
    </>
  )
}

export default Inventory


