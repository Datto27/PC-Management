import React from 'react'
import {useNavigate} from "react-router-dom"
import NavigateBtn from '../components/NavigateBtn'


// თანამშრომლის ინფო
const StaffInfoPage = () => {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
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
        <div className="form-section">
          <div className="input-container">
            <label htmlFor="">სახელი</label>
            <input type="text" required className='input' 
              placeholder='გრიშა'
            />
            <p className='input-info'>მინიმუმ 2 სიმბოლო, ქართული ასოები</p>
          </div>
          <div className="input-container">
            <label htmlFor="">სახელი</label>
            <input type="text" required className='input' 
              placeholder='ბაგრატიონი'
            />
            <p className='input-info'>მინიმუმ 2 სიმბოლო, ქართული ასოები</p>
          </div>
        </div>
        <select required>
          <option value="0">თიმი</option>
        </select>
        <select required>
        <option value="0">პოზიცია</option>
        </select>
        <div className="input-container">
          <label htmlFor="">მეილი</label>
          <input type="email" required className='input'
            placeholder='grish666@redberry.ge'
            pattern='[a-z0-9+]+@redberry\.ge$'
          />
          <p className='input-info'>უნდა მთავრდებოდეს @redberry.ge-ით</p>
        </div>
        <div className="input-container">
          <label htmlFor="">ტელეფონის ნომერი</label>
          <input type="tel" required className='input'
            placeholder='+995 598 00 07 01'
            pattern='[0-9]{9}'
          />
          <p className='input-info'>უნდა აკმაყოფილებდეს ქარული მობ-ნომრის ფორმატს</p>
        </div>
        <input type="submit" value='შემდეგი' className='filled-btn' />
      </form>
      <img src="/images/LOGO-01.png" alt="logo" className='logo' />
    </div>
  )
}

export default StaffInfoPage