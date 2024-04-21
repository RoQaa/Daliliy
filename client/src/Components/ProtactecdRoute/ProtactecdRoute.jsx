import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtactecdRoute(props) {
  
  if(localStorage.getItem('userToken') == null){
    return <Navigate to={'/Login'}/>
  }else{
    return props.children
  }
}
