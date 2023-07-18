import React,{useState} from 'react'
import {Form, Container, Button} from 'react-bootstrap'
import { loginUser } from '../actions/userAction'
import { useSelector,useDispatch } from 'react-redux'


const LoginScreen = () => {

  const {success,error}=useSelector((state)=>state.loginReducer)

  const dispatch = useDispatch("")
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")

  const loginHandler=()=>{
    const user = {email,password}
    dispatch(loginUser(user))
    success?alert('user successfully logged in'):error?alert("error in logging in",error):console.log()
  }

  return (
    <><br></br><br></br>
    <Container style={{width:"30%"}}>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
     
      <Button variant="primary" onClick={loginHandler}>
        Submit
      </Button>
    </Form>
    </Container>
    </>
  );
}


export default LoginScreen