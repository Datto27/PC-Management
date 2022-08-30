import React, { useEffect } from 'react'
import {useNavigate} from "react-router-dom"

// წარმატებით დასრულების გვერდი
const SuccessPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    return () => {
      // clear localStorage after left this page
      localStorage.clear()
    }
  }, [])

  return (
    <div className='success_page'>
      <div className="popup">
        <div className='conffeti-container'>
          <img src="/images/conffeti.png" alt="confetti" className='conffeti' />
          <h3 className='success-txt'>ჩანაწერი დამატებულია!</h3>
        </div>
        <div className="btns-container">
          <button className="filled-btn"
            onClick={() => navigate("/recordings")}
          >
            სიაში გადაყვანა
          </button>
          <button className="text-btn"
            onClick={() => navigate("/")}
          >
            მთავარი
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessPage