import React from 'react'
import { AiFillCaretDown } from 'react-icons/ai'

// dropdown menu, გამოყენებულია: თიმის, პოზიციის, ლეპტოპის ბრენდისა და CPU ველებისთვის
const CustomDropdown = ({children, name, error=null}) => {
  return (
    <div className={`dropdown ${error && "error"}`}>
      <div className={`drop-btn ${error && "error"}`}>
        <p>{name}</p>
        <AiFillCaretDown />
      </div>
      <div className="dropdown-content">
        {children}
      </div>
    </div>
  )
}

export default CustomDropdown