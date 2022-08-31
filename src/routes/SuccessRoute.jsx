import React from 'react'
import { Navigate } from 'react-router-dom'

// როუტ კომპონენტი გამოყენებულია SuccessPage-ზე 
// იუზერს არ უნდა შეეძლოს მასზე გადასვლა თუ ინფურმაციას წარმატებით არ გააგზავნის სერვერზე
const SuccessRoute = ({component}) => {
  const isSuccess = localStorage.getItem("isSuccess") // setted inside LaptopInfo

  if(isSuccess) {
    return component
  } else {
    return <Navigate to={"/"} />
  }
}

export default SuccessRoute