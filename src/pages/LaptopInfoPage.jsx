import axios from "axios"
import React, { useEffect, useRef, useState } from 'react'
import {useNavigate} from "react-router-dom"
import { useGlobalContext } from '../context'
import NavigateBtn from '../components/NavigateBtn'
import { AiFillDelete } from 'react-icons/ai'
import {IoWarning} from "react-icons/io5"
import { API_URL, MY_TOKEN } from '../config'
import TextInput from "../components/TextInput"
import CustomDropdown from "../components/CustomDropdown"
import { LoadingAnimation } from "../components/LoadingAnimation"

// ლეპტოპის ინფორმაციის შესაყვანად განკუთვნილი გვერდი
const LaptopInfoPage = () => {
  const navigate = useNavigate()
  // global state 
  const {
    laptopState, setLaptopState, 
    staffState, setStaffState,
    brands: avBrands, cpus: avCPUs
  } = useGlobalContext()
  // local states
  const [inputError, setInputError] = useState({field:"", msg:""}) // show error for specific input
  const [brandDropName, setBrandDropName] = useState("") // laptop dropdown name after its value change
  const [CPUDropName, setCPUDropName] = useState("")
  const [loading, setLoading] = useState(false)
  // refs
  const wrapperRef = useRef() // used for file-image input drag & drop


  useEffect(() => {
    // get saved input values if exists
    const laptopInputs = JSON.parse(localStorage.getItem("laptopState"))
    const staffInputs = JSON.parse(localStorage.getItem("staffState"))
    // console.log(staffInputs)
    if(laptopInputs) {
      setLaptopState(laptopInputs)
      setStaffState(staffInputs)
    }
    console.log(laptopInputs)
    // change brands dropdown name if it is already changed
    if(laptopInputs?.laptop_brand_id) {
      let brand = avBrands.find((brand) => brand.id===laptopInputs.laptop_brand_id)
      if(brand) setBrandDropName(brand.name)
    }
    // change CPU dropdown name
    if(laptopInputs?.laptop_cpu) {
      let cpu = avCPUs.find((cpu) => cpu.name===laptopInputs.laptop_cpu)
      if(cpu) setCPUDropName(cpu.name)
    }
  }, [avBrands, avCPUs])

  useEffect(() => {
    // console.log(laptopState)
    // ყოველ ცვლილებაზე laptopState-ის ლოკალურად შენახვა (იმ შემთხვევაში თუ დაწყებულია ველების შევსება)
    if(laptopState.laptop_image || laptopState.laptop_name || laptopState.laptop_brand_id || laptopState.laptop_cpu) {
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
    // for drag and drop save image
    e.preventDefault()
    e.stopPropagation()
    wrapperRef.current.classList.remove("dragover")
    wrapperRef.current.classList.remove("error")
    if(e.dataTransfer.files.length  > 0) {
      const file = e.dataTransfer.files[0]
      // console.log(file)
      // convert file to dataUrl
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener("load", () => {
        // console.log(reader.result)
        setGlobState(reader.result, 'laptop_image')
        setGlobState(file.name, 'image_name')
        setGlobState(file.type, 'image_type')
      })
    } 
  }
  const onFileDrop = (e) => {
    // ატვირთე button-ზე დაჭერისას
    wrapperRef.current.classList.remove("error")
    const file = e.target.files[0] // file for upload
    console.log(file)
    // conver file to dataUrl
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener("load", () => {
      // console.log(reader.result)
      if(file) {
        setGlobState(reader.result, 'laptop_image')
        setGlobState(file.name, 'image_name')
        setGlobState(file.type, 'image_type')
      }
    })
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
      return setInputError({field:"laptop_image", msg:"სურათი შეყვანა მოთხოვნილია!"})
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
      return setInputError({field:"laptop_hard_drive_type", msg:"მეხსიერების ტიპი!"})
    } else if(!laptop_price || laptop_price<=0) {
      window.scrollTo(0, 30)
      return setInputError({field:"laptop_price", msg:"ლეპტოპის ფასი!"})
    }  
    else if(!laptop_state) {
      window.scrollTo(0, 40)
      return setInputError({field:"laptop_state", msg:"ლეპტოპის მდოგმარეობა!"})
    } 
    // თუ ინფუთებმა ვალიდაცია გაიარეს -> ჩანაწერის დამატება; localStorage სთეითის წაშლა; ნავიგაცია /success-ზე
    saveData()
  }

  const saveData = async () => {
    // console.log(laptopState.laptop_image, staffState)
    setLoading(true)
    const {
      name, surname, team_id, position_id, phone_number, email
    } = staffState
    const {
      laptop_name, laptop_image, image_name, image_type, laptop_brand_id, laptop_cpu, laptop_cpu_cores, laptop_cpu_threads, laptop_ram, laptop_hard_drive_type, laptop_state, laptop_purchase_date, laptop_price
    } = laptopState

    // convert created data:image url to file
    let imageFile 
    await fetch(laptop_image)
    .then(res => {
      return res.arrayBuffer()
    })
    .then((buf) => { 
      imageFile = new File([buf], image_name, {type:image_type})
      // console.log(imageFile)
    })

    // for data for send request
    const form = new FormData()
    form.append("token", MY_TOKEN)
    form.append("name", name)
    form.append("surname", surname)
    form.append("team_id", team_id)
    form.append("position_id", position_id)
    form.append("phone_number", phone_number)
    form.append("email", email)
    form.append("laptop_name", laptop_name)
    form.append("laptop_image", imageFile)
    form.append("laptop_brand_id", laptop_brand_id)
    form.append("laptop_cpu", laptop_cpu)
    form.append("laptop_cpu_cores", laptop_cpu_cores)
    form.append("laptop_cpu_threads", laptop_cpu_threads)
    form.append("laptop_ram", laptop_ram)
    form.append("laptop_hard_drive_type", laptop_hard_drive_type)
    form.append("laptop_state", laptop_state)
    form.append("laptop_purchase_date", laptop_purchase_date)
    form.append("laptop_price", laptop_price)

    axios.post(`${API_URL}/laptop/create`, form)
    .then((res) => {
      console.log(res.data)
      setLoading(false)
      localStorage.setItem("isSuccess", true)
      navigate("/success")
    })
    .catch(err => {
      setLoading(false)
      console.log(err)
    })
  }

  // console.log(inputError.field, laptopState.laptop_price)

  return (
    <div className='laptop-info_page'>
      <NavigateBtn />
      {loading && <LoadingAnimation />}
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
              <img src={laptopState.laptop_image} alt="laptop image" />
              <button className="remove-btn" 
                onClick={removeImage}
              >
                <AiFillDelete size={18} color="white" />
              </button>
            </div>
          ) : (
            <div className="">
              {inputError.field==="laptop_image"
                ? <div className="error-msg"><IoWarning/><p>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</p></div>
                : <p>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</p>
              }
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
                  setGlobState(cpu.name, "laptop_cpu")
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
            {inputError.field==="laptop_hard_drive_type" 
              ? <div className="error-msg"><h4 className="error">{inputError.msg}</h4><IoWarning/></div>
              : <h4>მეხსიერების ტიპი</h4>
            }
            <div className="radios">
              <div className="radio-container">
                <input type="radio" name='memory' id='ssd' value="SSD" 
                  checked={laptopState.laptop_hard_drive_type==="SSD"}
                  onChange={(e) => setGlobState(e.target.value, "laptop_hard_drive_type")}
                />
                <label htmlFor="ssd">SSD</label>
              </div>
              <div className="radio-container">
                <input type="radio" name='memory' id='hdd' value="HDD" 
                  checked={laptopState.laptop_hard_drive_type==="HDD"}
                  onChange={(e) => setGlobState(e.target.value, "laptop_hard_drive_type")}
                />
                <label htmlFor="hdd">HDD</label>
              </div>
            </div>
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
            {inputError.field==="laptop_state" 
              ? <div className="error-msg"><h4 className="error">{inputError.msg}</h4><IoWarning/></div>
              : <h4>ლეპტოპის მდგომარეობა</h4>
            }
            <div className="radios">
              <div className="radio-container">
                <input type="radio" name='condition' id='new' value="new"
                  checked={laptopState.laptop_state==="new"}
                  onChange={(e) => setGlobState(e.target.value, "laptop_state")}
                />
                <label htmlFor="new">ახალი</label>
              </div>
              <div className="radio-container">
                <input type="radio" name='condition' id='used' value="used" 
                  checked={laptopState.laptop_state==="used"}
                  onChange={(e) => setGlobState(e.target.value, "laptop_state")}
                />
                <label htmlFor="used">მეორადი</label>
              </div>
            </div>
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