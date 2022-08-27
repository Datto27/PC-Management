import React from 'react'
import NavigateBtn from '../components/NavigateBtn'
import RecordingItem from '../components/RecordingItem'

// ჩანაწერების სიის გვერდი
const RecordingsList = () => {
  return (
    <div className='recordings-list_page'>
      <NavigateBtn/>
      <h1 className="title">ჩანაწერების სია</h1>
      <div className="recordings-list">
        <RecordingItem />
        <RecordingItem />
        <RecordingItem />
      </div>
    </div>
  )
}

export default RecordingsList