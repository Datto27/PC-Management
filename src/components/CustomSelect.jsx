import React from 'react'

// custom select with options component for select (team, position...)
const CustomSelect = () => {
  return (
    <div class="list-choice">
      <div class="list-choice-title">Month</div>
      <div class="list-choice-objects">
        <label>
          <input type="radio" name="month"/>                         <span>January</span>
        </label>
        <label>
          <input type="radio" name="month"/>                         <span>February</span>
        </label>
        <label>
          <input type="radio" name="month"/>                         <span>March</span>
        </label>
        <label>
          <input type="radio" name="month"/>                         <span>April</span>
        </label>
      </div>
    </div>
  )
}

export default CustomSelect