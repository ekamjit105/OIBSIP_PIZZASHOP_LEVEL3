import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { Container, Row, Col } from 'react-bootstrap'

//Data imported
//use this for static data import=> import AllPizza from '../pizza-data'//returns array of pizzas that acts as a temporary database

//OR
import{getAllPizzas} from '../actions/pizzaAction' 
import { getAllStock } from '../actions/inventoryAction'
//componenets imported
import Pizza from '../components/Pizza' //pizza card in which data is sent as props


const HomeScreen = () => {

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllPizzas())//dispatch action
    }, [dispatch])

    useEffect(()=>{
        dispatch(getAllStock())//dispatch action
    }, [dispatch])



    const pizzastate = useSelector((state)=>state.getAllPizzasReducer)//getting pizza state using useSelector
    const {pizzas,loading,error}=pizzastate //destructuring state
    
    return (
    <>
        <Container>
            {loading? <h1>loading....</h1>
                        :error? <h1>Error while loading data</h1>
                            :
                        <Row>
                            {pizzas.map(pizza=>(//callback function pizza=>(...)
                                <Col md={4} style={{marginBottom:"2%", marginTop:"2%"}}>
                                    <Pizza pobj = {pizza}/> 
                                </Col>
                                //array.map(x=>(x+1)) example of array .map function for incrementing all elements by 1
                                //iterates over an array
                                //takes a call back function i=>() as argument
                                //here i is each element of the array
                                //(..) part defines operation to be performed for each element i

                                //NOTE: JS in JSX requires <>{}</> but JSX in JS can be written directly using <></>

                                //Here we are passing each pizza JS element in JSX componenet <Pizza>
                                //Therefore <Pizza pobj={pizza}>
                            ))}
                        </Row>
            }
        </Container>
    </>
  )
}

export default HomeScreen