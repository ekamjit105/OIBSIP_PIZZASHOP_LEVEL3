import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { sendMail } from './actions/mailAction';




const Testing = () => {
 
    const dispatch =useDispatch();

    const MailHandler=()=>{

      const mailobj={
        to:'ekamjit105@gmail.com',
        subject:'Admin Stock Alert',
        text:'testing text'}
        console.log("sending mail object .. ",mailobj);
        dispatch(sendMail(mailobj))
    
    }
 
 
 
 return (<>
    <div>Testing</div>
    <Button onClick={MailHandler}>Test mailer</Button>
    </>
  )
}

export default Testing