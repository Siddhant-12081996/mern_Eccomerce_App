import React from 'react'
import { Container } from 'react-bootstrap'
import "../App.css"
import Header from '../components/Header'

const Success = () => {
  return (
    <>
    <Header/>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",backgroundColor:"green",color:"white",fontWeight:"bolder",fontSize:"30px"}}>Payment Successful</div>
    </>
  )
}

export default Success