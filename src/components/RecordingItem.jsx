import React from 'react'
import {useNavigate} from "react-router-dom"
import { API_URL } from '../config'

// შენახული ჩანაწერის (laptop) აითემი (კომპიუტერის ინფორმაცია)
const RecordingItem = ({recording}) => {
  const navigate = useNavigate()
  const {user, laptop} = recording

  return (
    <div className='recording-item'>
      <img src={"https://pcfy.redberryinternship.ge/"+laptop.image} alt="computer image" />
      <div className="recording-info">
        <p className='user'>{user.name} {user.surname}</p>
        <p className='cpu'>{laptop.name}</p>
        <p className="link"
          onClick={() => navigate(`/recording/${laptop.id}`)}
        >
          მეტის ნახვა
        </p>
      </div>
    </div>
  )
}

export default RecordingItem