import axios from "axios"
import React, { useEffect, useState } from 'react'
import {API_URL, MY_TOKEN} from "../config"
import NavigateBtn from '../components/NavigateBtn'
import RecordingItem from '../components/RecordingItem'

// ჩანაწერების სიის გვერდი
const RecordingsList = () => {
  const [laptops, setLaptops] = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/laptops?token=${MY_TOKEN}`)
      .then((res) => {
        // console.log(res.data)
        setLaptops(res.data.data)
      }).catch((err) => console.log(err))
  }, [])

  return (
    <div className='recordings-list_page'>
      <NavigateBtn/>
      <h1 className="title">ჩანაწერების სია</h1>
      <div className="recordings-list">
        {laptops.map((recording, i) => {
          return <RecordingItem key={i} recording={recording} />
        })}
      </div>
    </div>
  )
}

export default RecordingsList