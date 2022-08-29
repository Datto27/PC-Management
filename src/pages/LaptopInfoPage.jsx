import axios from "axios"
import React, { useEffect, useRef, useState } from 'react'
import {useNavigate} from "react-router-dom"
import { useGlobalContext } from '../context'
import NavigateBtn from '../components/NavigateBtn'
import { AiFillDelete } from 'react-icons/ai'
import { API_URL } from '../config'
import TextInput from "../components/TextInput"
import CustomDropdown from "../components/CustomDropdown"

const LaptopInfoPage = () => {
  const navigate = useNavigate()
  // global state 
  const {laptopState, setLaptopState} = useGlobalContext()
  // local states
  const [inputError, setInputError] = useState({field:"", msg:""}) // show error for specific input
  const [avBrands, setAvBrands] = useState([]) // available laptop brands for select
  const [avCPUs, setAvCPUs] = useState([]) // available cpus for select
  const [brandDropName, setBrandDropName] = useState("") // laptop dropdown name after its value change
  const [CPUDropName, setCPUDropName] = useState("")
  const [test, setTest] = useState("")
  // refs
  const wrapperRef = useRef() // used for file-image input drag & drop


  useEffect(() => {
    // get available laptop brands from server
    axios.get(`${API_URL}/brands`).then((res) => {
      // console.log(res.data)
      setAvBrands(res.data.data)
    })
    .catch((err) => console.log(err))
    // get available cpus
    axios.get(`${API_URL}/cpus`).then((res) => {
      setAvCPUs(res.data.data)
    })
    .catch((err) => console.log(err))
    // get saved input values if exists
    const laptopInputs = JSON.parse(localStorage.getItem("laptopState"))
    // console.log(staffInputs)
    if(laptopInputs) {
      setLaptopState(laptopInputs)
    }
  }, [])

  useEffect(() => {
    // ყოველ ცვლილებაზე laptopState-ის ლოკალურად შენახვა (იმ შემთხვევაში თუ დაწყებულია ველების შევსება)
    if(laptopState.laptop_image || laptopState.laptop_name) {
      // იმ შემთხვევაში თუ გვაქვს ინფორმაცია ცვლილებებით მხოლოდ მაშინ შევინახოთ localStorage-ში
      localStorage.setItem("laptopState", JSON.stringify(laptopState))
    }
  }, [laptopState])

  // set input changes to globalstate
  const setGlobState = (value, key) => {
    // ამ ფუნქციის შემთხვევაში პირდაპირ value-ს ვაწვდი არგუმენტად რადგან გამოყენებულია file-ისთვისაც სთეითში შესანახად
    // value იქნება e.dataTransfer.files[0], e.target.files[0] ან e.target.value (განსხვავებით StaffInfoPage -> setGlobState-სგან)
    setLaptopState(state => {
      // console.log(state[key], e.target.value)
      return {...state, [key]: value}
    })
  }

  // file drag and drop functions
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
    // for drag and drop save image into state
    e.preventDefault()
    e.stopPropagation()
    wrapperRef.current.classList.remove("dragover")
    wrapperRef.current.classList.remove("error")
    if(e.dataTransfer.files.length  > 0) {
      const file = e.dataTransfer.files[0]
      // console.log(file)
      file.src = URL.createObjectURL(file) // create src for show this image
      setGlobState(file, "laptop_image")
    } 
  }
  
  const onFileDrop = (e) => {
    // ატვირთე button-ზე დაჭერისას
    wrapperRef.current.classList.remove("error")
    const file = e.target.files[0] // file for upload
    // console.log(file)
    file.src = URL.createObjectURL(file) // create src for show this image
    if(file) {
      setGlobState(file, 'laptop_image')
    }
  }

  const removeImage = () => {
    setLaptopState(state => {
      return {...state, laptop_image: null}
    })
  }

  const handleSubmit = (e) => {
    // handle form submit
    e.preventDefault()
    const { // desturcutring laptopState
      laptop_image, laptop_name, laptop_brand_id, 
      laptop_cpu, laptop_cpu_cores, laptop_cpu_threads,
      laptop_ram, laptop_hard_drive_type,
      laptop_state, laptop_purchase_date, laptop_price
    } = laptopState
    // validate inputs
    if(!laptop_image) {
      window.scroll(0, 0)
      wrapperRef.current.classList.add("error")
      return setInputError({field:"image", msg:"სურათი შეყვანა მოთხოვნილია!"})
    } else if(!/[a-zA-Z0-9-!@#$%^&*()_+=]+/.test(laptop_name)) {
      window.scrollTo(0, 90)
      return setInputError({field:"laptop_name", msg:"ლათინური ასოები, ციფრები, !@#$%^&*()_+=!"})
    } else if(!laptop_brand_id) {
      window.scrollTo(0, 80)
      return setInputError({field:"laptop_brand_id", msg:"ბრენდის დასახელება სავალდებულოა!"})
    } else if(!laptop_cpu) {
      window.scrollTo(0, 10)
      return setInputError({field:"laptop_cpu", msg:"CPU დასახელება სავალდებულოა!"})
    } else if(laptop_cpu_cores<2) {
      window.scrollTo(0, 60)
      return setInputError({field:"laptop_cpu_cores", msg:"CPU ბირთვების რაოდენობა სავალდებულოა!"})
    } else if(laptop_cpu_threads<2) {
      window.scrollTo(0, 50)
      return setInputError({field:"laptop_cpu_threads", msg:"CPU ნაკადების რაოდენობა სავალდებულოა!"})
    } else if(laptop_ram<4) {
      window.scrollTo(0, 50)
      return setInputError({field:"laptop_ram", msg:"RAM მოცულობა GB-ში (>4)!"})
    } else if(!laptop_hard_drive_type) {
      window.scrollTo(0, 40)
      return setInputError({field:"laptop_hard_drive_type", msg:"მყარი დისკის ტიპი!"})
    } else if(!laptop_price || laptop_price<=0) {
      window.scrollTo(0, 30)
      return setInputError({field:"laptop_price", msg:"ლეპტოპის ფასი!"})
    }  
    else if(!laptop_state) {
      window.scrollTo(0, 40)
      return setInputError({field:"laptop_state", msg:"ლეპტოპის მდოგმარეობა!"})
    } 
    // თუ ინფუთებმა ვალიდაცია გაიარეს -> ჩანაწერის დამატება; localStorage სთეითის წაშლა; ნავიგაცია /success-ზე
    localStorage.setItem("isSuccess", true)
    navigate("/success")
  }

  // console.log(inputError.field, laptopState.laptop_price)

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
        <div className="file-input-wrapper" 
          ref={wrapperRef}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDrop}
          onDrop={onDrop}
        >
          <input type="file" id="file" accept="image/*"
            onChange={onFileDrop}
          />
          {/* -------- show uploaded image if exists -------- */}
          {laptopState.laptop_image ? (
            <div className="uploaded-img-container">
              <img src={laptopState.laptop_image.src} alt="laptop image" />
              <button className="remove-btn" 
                onClick={removeImage}
              >
                <AiFillDelete size={18} color="white" />
              </button>
            </div>
          ) : (
            <div className="">
              <p>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</p>
              <label htmlFor="file" className='filled-btn'>ატვირთე</label>
            </div>
          )}
        </div>
        {/* ----------------- name input --------------- */}
        <div className="form-section">
          <TextInput type="text" fieldName="laptop_name"
            label="სახელი" placeholder="HP"
            info="ლათინური ასოები, ციფრები, !@#$%^&*()_+="
            state={laptopState.laptop_name} 
            setState={setGlobState}
            error={inputError.field==="laptop_name" && inputError}
          />
          <CustomDropdown 
            name={brandDropName ? brandDropName:"ლეპტოპის ბრენდი"}
            error={inputError.field==="laptop_brand_id" && true}
          >
            {avBrands.map((brand, i) => {
              return <p key={i} className="dropdown-item"
                onClick={() => {
                  setGlobState(brand.id, "laptop_brand_id")
                  setBrandDropName(brand.name)
                }}
              >
                {brand.name}
              </p>
            })}
          </CustomDropdown>
        </div>
        {/* ----------------- cpu input --------------- */}
        <div className="form-section">
          <CustomDropdown 
              name={CPUDropName ? CPUDropName:"CPU"}
              error={inputError.field==="laptop_cpu" && true}
            >
            {avCPUs.map((cpu, i) => {
              return <p key={i} className="dropdown-item"
                onClick={() => {
                  setGlobState(cpu.id, "laptop_cpu")
                  setCPUDropName(cpu.name)
                }}
              >
                {cpu.name}
              </p>
            })}
          </CustomDropdown>
          <TextInput type="number" fieldName="laptop_cpu_cores"
            label="CPU-ს ბირთვი" placeholder="14"
            info="მხოლოდ ციფრები"
            state={laptopState.laptop_cpu_cores} 
            setState={setGlobState}
            error={inputError.field==="laptop_cpu_cores" && inputError}
          />
          <TextInput type="number" fieldName="laptop_cpu_threads"
            label="CPU-ს ნაკადი" placeholder="28"
            info="მხოლოდ ციფრები"
            state={laptopState.laptop_cpu_threads} 
            setState={setGlobState}
            error={inputError.field==="laptop_cpu_threads" && inputError}
          />
        </div>
        {/* ----------------- memory inputs --------------- */}
        <div className="form-section">
          <TextInput type="number" fieldName="laptop_ram"
            label="ლეპტოპის RAM(GB)" placeholder="16"
            info="მხოლოდ ციფრები"
            state={laptopState.laptop_ram} 
            setState={setGlobState}
            error={inputError.field==="laptop_ram" && inputError}
          />
          <div className="radios-container">
            <h4>მეხსიერების ტიპი</h4>
            <input type="radio" name='memory' id='ssd' value="SSD" 
              checked={laptopState.laptop_hard_drive_type==="SSD"}
              onChange={(e) => setGlobState(e.target.value, "laptop_hard_drive_type")}
            />
            <label htmlFor="ssd">SSD</label>
            <input type="radio" name='memory' id='hdd' value="HDD" 
              checked={laptopState.laptop_hard_drive_type==="HDD"}
              onChange={(e) => setGlobState(e.target.value, "laptop_hard_drive_type")}
            />
            <label htmlFor="hdd">HDD</label>
            {inputError.field==="laptop_hard_drive_type" && <p className="error">{inputError.msg}</p>}
          </div>
        </div>
        <hr />
        {/* ----------------- buy inputs --------------- */}
        <div className="form-section">
          <TextInput type="date" fieldName="laptop_purchase_date"
            label="შეძენის რიცხვი (არჩევითი)" placeholder="დდ/თთ/წწწწ"
            info="თარიღი"
            state={laptopState.laptop_purchase_date} 
            setState={setGlobState} // ვალიდაცია არაა მოთხოვნილი
          />
          <TextInput type="number" fieldName="laptop_price"
            label="ლეპტოპის ფასი" placeholder="0000"
            info="მხოლოდ ციფრები"
            state={laptopState.laptop_price} 
            setState={setGlobState} 
            error={inputError.field==="laptop_price" && inputError}
          />
        </div>
        {/* ----------------- laptop condition input --------------- */}
        <div className="form-section">
          <div className="radios-container">
            <h4>ლეპტოპის მდგომარეობა</h4>
            <input type="radio" name='condition' id='new' value="new"
              checked={laptopState.laptop_state==="new"}
              onChange={(e) => setGlobState(e.target.value, "laptop_state")}
            />
            <label htmlFor="new">ახალი</label>
            <input type="radio" name='condition' id='old' value="old" 
              checked={laptopState.laptop_state==="old"}
              onChange={(e) => setGlobState(e.target.value, "laptop_state")}
            />
            <label htmlFor="old">მეორადი</label>
            {inputError.field==="laptop_state" && <p className="error">{inputError.msg}</p>}
          </div>
        </div>
        {/* ------------------------ submit ------------------- */}
        <div className="form-footer">
          <input type="submit" value='შემდეგი' className='filled-btn'/>
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