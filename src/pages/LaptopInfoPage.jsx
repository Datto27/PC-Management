import React, { useRef, useState } from 'react'
import {useNavigate} from "react-router-dom"
import NavigateBtn from '../components/NavigateBtn'

const LaptopInfoPage = () => {
  const navigate = useNavigate()
  // states
  const [image, setImage] = useState(null) // laptop image for upload
  // refs
  const wrapperRef = useRef() // used for file input drag & drop

  // file input functions
  const onDragEnter = (e) => {
    // change file input wrapper (file-input-container) style
    e.preventDefault()
    e.stopPropagation()
    // console.log(e.target.files)
    wrapperRef.current.classList.add("dragover")
  }
  const onDragLeave = (e) => {
    // change file input wrapper (file-input-container) style
    e.preventDefault()
    e.stopPropagation()
    wrapperRef.current.classList.remove("dragover")
  }
  const onDrop = (e) => {
    // save image into local state
    e.preventDefault()
    e.stopPropagation()
    wrapperRef.current.classList.remove("dragover")
    if(e.dataTransfer.files.length  > 0) {
      // console.log(e.dataTransfer.files[0])
      setImage(e.dataTransfer.files[0])
    } 
  }
  const onFileDrop = (e) => {
    const file = e.target.files[0] // file for upload
    console.log(file)
    if(file) {
      setImage(file)
    }
  }

  const handleSubmit = () => {
    // handle form submit
  }

  return (
    <div className='laptop-info_page'>
      <NavigateBtn />
      <div className='header'>
        <h4 className='title'>თანამშრომლის ინფო</h4>
        <h4 className='title active'>ლეპტოპის მახასიათებლები</h4>
      </div>
      {/* ---------------------- form ------------------ */}
      <form onSubmit={handleSubmit}>
        {/* ----------------- file input --------------- */}
        <div className="file-input-container" 
          ref={wrapperRef}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDrop}
          onDrop={onDrop}
        >
          <p>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</p>
          <input type="file" id="file" 
            onChange={onFileDrop}
          />
          <label htmlFor="file" className='filled-btn'>ატვირთე</label>
        </div>
        {/* ----------------- name input --------------- */}
        <div className="form-section">
          <div className="input-container">
            <label htmlFor="">სახელი</label>
            <input type="text" required className='input' 
              placeholder='HP'
            />
            <p className='input-info'>ლათინური ასოები, ციფრები, !@#$%^&*()_+=</p>
          </div>
          <select name="">
            <option value="">ლეპტოპის ბრენდი</option>
          </select>
        </div>
        {/* ----------------- cpu input --------------- */}
        <div className="form-section">
          <select name="">
            <option value="">CPU</option>
          </select>
          <div className="input-container">
            <label htmlFor="">CPU-ს ბირთვი</label>
            <input type="number" required className='input' 
              placeholder='14'
            />
            <p className='input-info'>მხოლოდ ციფრები</p>
          </div>
          <div className="input-container">
            <label htmlFor="">CPU-ს ნაკადი</label>
            <input type="number" required className='input' 
              placeholder='28'
            />
            <p className='input-info'>მხოლოდ ციფრები</p>
          </div>
        </div>
        {/* ----------------- memory input --------------- */}
        <div className="form-section">
          <div className="input-container">
            <label htmlFor="">ლეპტოპის RAM(GB)</label>
            <input type="number" required className='input'
              placeholder='16'
            />
            <p className='input-info'>მხოლოდ ციფრები</p>
          </div>
          <div className="radios-container">
            <h4>მეხსიერების ტიპი</h4>
            <input type="radio" name='memory' id='ssd' value="SSD" />
            <label htmlFor="ssd">SSD</label>
            <input type="radio" name='memory' id='hdd' value="HDD" />
            <label htmlFor="hdd">HDD</label>
          </div>
        </div>
        <hr />
        {/* ----------------- memory input --------------- */}
        <div className="form-section">
          <div className="input-container">
            <label htmlFor="">შეძენის რიცხვი (არჩევითი)</label>
            <input type="date" required className='input'
              placeholder='დდ/თთ/წწწწ'
            />
            <p>თარიღი</p>
          </div>
          <div className="input-container">
            <label htmlFor="">ლეპტოპის ფასი</label>
            <input type="number" required className='input'
              placeholder='0000'
            />
            <p className='input-info'>მხოლოდ ციფრები</p>
          </div>
        </div>
        {/* ----------------- laptop shape input --------------- */}
        <div className="form-section">
          <div className="radios-container">
            <h4>მეხსიერების ტიპი</h4>
            <input type="radio" name='memory' id='new' value="new" />
            <label htmlFor="new">ახალი</label>
            <input type="radio" name='memory' id='old' value="old" />
            <label htmlFor="old">მეორადი</label>
          </div>
        </div>
        {/* ------------------------ submit ------------------- */}
        <div className="form-footer">
          <input type="submit" value='შემდეგი' className='filled-btn'
            onClick={() => navigate("/success")}
          />
          <button className='text-btn'
            onClick={() => navigate(-1)}
          >
            უკან
          </button>
        </div>
      </form>
      <img src="/images/LOGO-01.png" alt="logo" className='logo' />
    </div>
  )
}

export default LaptopInfoPage