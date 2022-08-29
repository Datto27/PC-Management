import React from 'react'


// ტექსტისa და რიცხვის ტიპის ინფუთებისთვის განკუთვნილი კომპონენტი
function TextInput({state, setState, type, fieldName, label, placeholder, info, error=null}) {
  
  return (
    <div className="input-container">
      <label htmlFor="">{label}</label>
      {type==="number" && state===0 ? ( // show placeholder if number is 0
        <input type={type} className={`input ${error&&"error"}`} 
          placeholder={placeholder}
          onChange={(e) => setState(e.target.value, fieldName)}
        />
      ) : (
        <input type={type} className={`input ${error&&"error"}`} 
          placeholder={placeholder}
          value={state}
          onChange={(e) => setState(e.target.value, fieldName)}
        />
      )}
      {error ? (
        <p className="error-msg">{error.msg}</p>
      ) : (
        <p className='input-info'>{info}</p>
      )}
    </div>
  )
}

export default TextInput