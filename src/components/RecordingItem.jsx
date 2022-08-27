import React from 'react'
import {useNavigate} from "react-router-dom"

// შენახული ჩანაწერის აითემი (კომპიუტერის ინფორმაცია)
const RecordingItem = ({computer}) => {
  const navigate = useNavigate()

  return (
    <div className='recording-item'>
      <img src="/logo192.png" alt="computer image" />
      <div className="recording-info">
        <p className='user'>სახელი გვარი</p>
        <p className='cpu'>interl i3</p>
        <p className="link"
          onClick={() => navigate("/recording/1")}
        >
          მეტის ნახვა
        </p>
      </div>
    </div>
  )
}

export default RecordingItem