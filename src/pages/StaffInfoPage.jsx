import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import CustomSelect from '../components/CustomSelect'
import NavigateBtn from '../components/NavigateBtn'
import { useGlobalContext } from '../context'
import {API_URL} from "../config"
import TextInput from '../components/TextInput'


// თანამშრომლის ინფო
const StaffInfoPage = () => {
  const navigate = useNavigate()
  // global state (იქ მოწმდება არის თუ არა ეს ინფურმაცია უკვე შენახული და შეიძლება თუ არა laptop-info-ზე გადასვლა SafeRoute-ით)
  const {staffState, setStaffState} = useGlobalContext()
  // local states
  const [avTeams, setAvTeams] = useState([]) // available teams from server
  const [avPositions, setAvPositions] = useState([]) // available positons from server
  const [inputError, setInputError] = useState({field:"", msg:""}) // show error for specific input.

  useEffect(() => {
    // get available teams from server
    axios.get(`${API_URL}/teams`).then((res) => {
      // console.log(res.data)
      setAvTeams(res.data.data)
    })
    .catch((err) => {
      console.log(err)
    })
    // get available positions from server
    axios.get(`${API_URL}/positions`).then((res) => {
      setAvPositions(res.data.data)
    })
    .catch((err) => {
      console.log(err)
    })
    // get saved input values if exists
    const staffInputs = JSON.parse(localStorage.getItem("staffState"))
    // console.log(staffInputs)
    if(staffInputs) {
      setStaffState(staffInputs)
    }
  }, [])

  useEffect(() => {
    // შემოწმდეს არის თუ არა თანამშრომლის ინფო შეყვანილი
    // იმ შემთხვევაში თუ მისი fname ცარიელია რაც იმას ნიშნავს რომ localStorage-ში შენახული არაა ინფორმაცია ან ჯერჯერობით არაა წამოღებული
    // ? მაგალითად თუ localStorageში გვაქვს შესაბამისი ინფო ვერ ესწრება მისი წამოღება გვერდის ჩატვირთვისამდე და მის ნაცვლად იქ იწერება ცარიელი staffState
    if(staffState.name !== "") {
      // იმ შემთხვევაში თუ გვაქვს ინფორმაცია ცვლილებებით მხოლოდ მაშინ შევინახოთ localStorage-ში
      localStorage.setItem("staffState", JSON.stringify(staffState))
    }
  }, [staffState])
  
  const setGlobState = (value, key) => {
    // set changes to global state
    setStaffState(state => {
      // console.log(state[key], e.target.value)
      return {...state, [key]: value}
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const {name, surname, team_id, position_id, email, phone_number} = staffState
    // check name & surname inputs
    const checkName = (input) => /\d/.test(input) || /[a-zA-Z]/.test(input)
    // check each input
    if(name.length<2 || checkName(name)) {
      window.scroll(0, 0)
      return setInputError({field:"name", msg:"გამოიყენე ქართული ასოები, მინიმუმ 2 სიმბოლო!"})
    } else if(surname.length<2 || checkName(surname)) {
      window.scroll(0, 0)
      return setInputError({field:"surname", msg:"გამოიყენე ქართული ასოები, მინიმუმ 2 სიმბოლო!"})
    } else if(!team_id) {
      window.scroll(0, 0)
      return setInputError({field:"team_id", msg:"თიმის მითითება სავალდებულოა!"})
    } else if(!position_id) {
      window.scroll(0, 0)
      return setInputError({field:"position_id", msg:"პოზიციის მითითება სავალდებულოა!"})
    } else if(email.split("@")[1]!=="redberry.ge") {
      window.scroll(0, 0)
      return setInputError({field:"email", msg:"მეილი უნდა მთავრდებოდეს @redberry.ge-ით!"})
    } else if(!/^[0-9]+$/.test(phone_number) || phone_number.length!==9) {
      window.scroll(0, 0)
      return setInputError({field:"phone_number", msg:"გამოიყენეთ ქართული მობილური ნომრის ფორმატი (9 ციფრი)!"})
    } 
    // დანარჩენი ვალიდაციის შემთხვევები გაწერილია input pattern-ებით
    navigate("/laptop-info")
  }

  return (
    <div className='staff-info_page'>
      <NavigateBtn />
      <div className='header'>
        <h4 className='title active'>თანამშრომლის ინფო</h4>
        <h4 className='title'>ლეპტოპის მახასიათებლები</h4>
      </div>
      <form onSubmit={handleSubmit}>
        {/* ---------------- first/last names ---------------- */}
        <div className="form-section">
          <TextInput type="text" fieldName="name"
            label="სახელი" placeholder="გრიშა"
            info="მინიმუმ 2 სიმბოლო, ქართული ასოები"
            state={staffState.name} 
            setState={setGlobState}
            error={inputError.field==="name" && inputError}
          />
          <TextInput type="text" fieldName="surname"
            label="გვარი" placeholder="ონიანი"
            info="მინიმუმ 2 სიმბოლო, ქართული ასოები"
            state={staffState.surname} 
            setState={setGlobState}
            error={inputError.field==="surname" && inputError}
          />
        </div>
        {/* ------------------ team/position selects --------------- */}
        <div className="select-container">
          <select
            value={staffState.team_id}
            onChange={(e) => setGlobState(e.target.value, "team_id")}
          >
            <option value="">თიმი</option>
            {avTeams.map((team, i) => {
              return <option key={i} value={team.id}>
                {team.name}
              </option>
            })}
          </select>
          {inputError.field==="team_id" && <p className='error'>{inputError.msg}</p>}
        </div>
        <div className="select-container">
          <select
            value={staffState.position_id}
            onChange={(e) => setGlobState(e.target.value, "position_id")}
          >
            <option value="">პოზიცია</option>
            {avPositions.map((team, i) => {
              return <option key={i} value={team.id}>
                {team.name}
              </option>
            })}
          </select>
          {inputError.field==="position_id" && <p className='error'>{inputError.msg}</p>}
        </div>
        {/* --------------------- email/phone num inputs ----------- */}
        <TextInput type="email" fieldName="email"
          label="მეილი" placeholder="grish666@redberry.ge"
          info="უნდა მთავრდებოდეს @redberry.ge-ით"
          state={staffState.email} 
          setState={setGlobState}
          error={inputError.field==="email" && inputError}
        />
        <TextInput type="tel" fieldName="phone_number"
          label="ტელეფონის ნომერი" placeholder="+995 598 00 07 01"
          info="უნდა აკმაყოფილებდეს ქარული მობ-ნომრის ფორმატს"
          state={staffState.phone_number} 
          setState={setGlobState}
          error={inputError.field==="phone_number" && inputError}
        />
        <input type="submit" value='შემდეგი' className='filled-btn' />
      </form>
      <img src="/images/LOGO-01.png" alt="logo" className='logo' />
    </div>
  )
}

export default StaffInfoPage