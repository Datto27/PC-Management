import React from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className='page landing_page'>
      <img src='/images/LOGO-02.png' alt='logo' 
        className='logo'
      />
      <img src='/images/FRAME.png' alt='frame'
        className='frame'
      />
      <div className="btns-container">
        <button className='filled-btn'
          onClick={() => navigate("/staff-info")}
        >
          ჩანაწერის დამატება
        </button>
        <button className='filled-btn'
          onClick={() => navigate("/recordings")}
        >
          ჩანაწერების სია
        </button>
      </div>
    </div>
  )
}

export default LandingPage