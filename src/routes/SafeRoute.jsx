import React from 'react'
import { Navigate } from 'react-router-dom'

// ეს როუტ კომპონენტი განკუთვნილია ლეპტოპის ინფოს ფეიჯისათვის, (LaptopInfoPage) 
// რათა იუზერმა შეძლოს იქ გადასვლა მხოლოდ თანამშრომლის ფორმის ვალიდაციის შემთხვევაში
const SafeRoute = ({component}) => {
  const staffValidate = localStorage.getItem("staffValidated") // seted inside StaffInfoPage after validate
  
  if(staffValidate) {
    return component
  } else {
    return <Navigate to={"/staff-info"} />
  }
}

export default SafeRoute