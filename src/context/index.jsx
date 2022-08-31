import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import App from "../App";
import { API_URL } from "../config";

const AppContext = createContext()


export const AppProvider = ({children}) => {
  const [teams, setTeams] = useState([])
  const [positions, setPositions] = useState([])
  const [brands, setBrands] = useState([])
  const [cpus, setCpus] = useState([])
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
    image_name: "", // uploaded image's name, for use it after convert this file's data:image to file
    image_type: "",
    laptop_brand_id: "",
    laptop_cpu: "",
    laptop_cpu_cores: "",
    laptop_cpu_threads: "",
    laptop_ram: "",
    laptop_hard_drive_type: "",
    laptop_state: "",
    laptop_purchase_date: "",
    laptop_price: "",
  })

  useEffect(() => {
    // get teams
    axios.get(`${API_URL}/teams`).then((res) => {
      // console.log(res.data)
      setTeams(res.data.data)
    }).catch((err) => console.log(err))
    // get positions
    axios.get(`${API_URL}/positions`).then((res) => {
      // console.log(res.data)
      setPositions(res.data.data)
    }).catch((err) => console.log(err))
    // get brands
    axios.get(`${API_URL}/brands`).then((res) => {
      // console.log(res.data)
      setBrands(res.data.data)
    }).catch((err) => console.log(err))
    // get cpus
    axios.get(`${API_URL}/cpus`).then((res) => {
      // console.log(res.data)
      setCpus(res.data.data)
    }).catch((err) => console.log(err))
  }, [])

  return (
    <AppContext.Provider value={{
      staffState, setStaffState,
      laptopState, setLaptopState,
      brands, cpus, teams, positions
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
