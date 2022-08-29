import { createContext, useContext, useEffect, useState } from "react";
import App from "../App";

const AppContext = createContext()


export const AppProvider = ({children}) => {
  // თანამშრომლის ფორმისათვის განკუთვნილი ინფუთების სთეითი 
  // გლობალურად ინახება რათა /laptop-info-ზე გადასვლამდე შემოწმდეს არის თუ არა ეს სთეითი შეყვანილი (SafeRoute-შია გაწერილი ფუნქციონალი) 
  const [staffState, setStaffState] = useState({   // used inside StaffInfoPage, SafeRoute
    name: "",
    surname: "",
    team_id: "",
    position_id: "",
    email: "",
    phone_number: ""
  })
  // ლეპტოპის ინფოს გლობალური სთეითი, თუ არ იქნება შევსებული მომხმარებელი ვერ გადავა /success-ზე
  const [laptopState, setLaptopState] = useState({ // used inside LaptopInfo, SuccessRoute
    laptop_name: "",
    laptop_image: null,
    laptop_brand_id: "",
    laptop_cpu: "",
    laptop_cpu_cores: 0,
    laptop_cpu_threads: 0,
    laptop_ram: 0,
    laptop_hard_drive_type: "",
    laptop_state: "",
    laptop_purchase_date: "",
    laptop_price: 0,
  })

  useEffect(() => {
    
  }, [])

  return (
    <AppContext.Provider value={{
      staffState, setStaffState,
      laptopState, setLaptopState
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
