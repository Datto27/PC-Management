import React from 'react'
import {useNavigate} from "react-router-dom"
import {AiOutlineLeft} from "react-icons/ai"

const NavigateBtn = () => {
  const navigate = useNavigate()

  return (
    <button className='navigate-btn'
      onClick={() => navigate(-1)}
    >
      <AiOutlineLeft />
    </button>
  )
}

export default NavigateBtn