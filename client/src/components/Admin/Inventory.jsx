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
    <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Item</th>
                <th>Variant</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Warning</th>
              </tr>
            </thead>
            <tbody>

            {stock &&
                stock.map((item) => (
                 <tr>
                    <td>
                      {item.name}
                    </td>

                    <td>
                        
                    </td>
                    
                    <td>
                     
                     
                    </td>
                    <td></td>
                    <td>
                      
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
    </>
  )
}

export default Inventory