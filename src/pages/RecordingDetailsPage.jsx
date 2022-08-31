import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavigateBtn from '../components/NavigateBtn'
import { API_URL, MY_TOKEN } from '../config'
import { useGlobalContext } from '../context'

// შიდა გვერდი კონკრეტული ლეპტოპის დეტალებით
const RecordingDetailsPage = () => {
  const {recordingID} = useParams()
  // global state
  const {brands, cpus, teams, positions} = useGlobalContext()
  // local states
  const [laptop, setLaptop] = useState({})
  const [user, setUser] = useState({})

  useEffect(() => {
    axios.get(`${API_URL}/laptop/${recordingID}?token=${MY_TOKEN}`)
      .then((res) => {
        // console.log(res.data)
        setLaptop(res.data.data.laptop)
        setUser(res.data.data.user)
      })
      .catch(err => console.log(err))
  }, [])


  const getTeam = (id) => {
    // get team name with its id
    const team = teams.find((team) => team.id === id)
    if(team) return team.name
    return ""
  }
  const getPosition = (id) => {
    // get position name with its id
    const position = positions.find((position) => position.id === id)
    if(position) return position.name
    return ""
  }
  const getBrand = (id) => {
    // get team name with its id
    const brand = brands.find((brand) => brand.id === id)
    if(brand) return brand.name
    return ""
  }

  return (
    <div className='recording-details_page'>
      <NavigateBtn />
      <h1 className="title">ლეპტოპის ინფო</h1>
      {/* ------------ laptop image and its user info ---------- */}
      <div className="main-info">
        <div className="left">
          <img src={"https://pcfy.redberryinternship.ge"+laptop.image} alt="laptop image" />
        </div>
        <div className="right">
          <table className='items'>
            <tbody>
              <tr className="info-item">
                <td>სახელი: </td>
                <td>{user.name} {user.surname}</td>
              </tr>
              <tr className="info-item">
                <td>თიმი: </td>
                <td>{getTeam(user.team_id)}</td>
              </tr>
              <tr className="info-item">
                <td>პოზიცია: </td> 
                <td>{getPosition(user.position_id)}</td>
              </tr>
              <tr className="info-item">
                <td>მეილი: </td>
                <td>{user.email}</td>
              </tr>
              <tr className="info-item">
                <td>ტელ. ნომერი: </td>
                <td>{user.phone_number}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <hr/>
      {/* ------------- laptop details specification etc. ------ */}
      <div className="laptop-desc">
        <div className="left">
          <table className='items'>
           <tbody>
            <tr>
                <td>ლეპტოპის სახელი:</td>
                <td>{laptop.name}</td>
              </tr>
              <tr>
                <td>ლეპტოპის ბრენდი:</td>
                <td>{getBrand(laptop.brand_id)}</td>
              </tr>
              <tr>
                <td>RAM:</td>
                <td>{laptop.ram}</td>
              </tr>
              <tr>
                <td>მეხსიერების ტიპი:</td>
                <td>{laptop.hard_drive_type}</td>
              </tr>
           </tbody>
          </table>
        </div>
        <div className="right">
          <table className='items'>
            <tbody>
              <tr>
                <td>CPU:</td>
                <td>{laptop.cpu?.name}</td>
              </tr>
              <tr>
                <td>CPU cors:</td>
                <td>{laptop.cpu?.cores}</td>
              </tr>
              <tr>
                <td>CPU threads:</td>
                <td>{laptop.cpu?.threads}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <hr/>
      {/* ------------ laptop condition, price and date --------- */}
      <div className="laptop-specs">
        <div className="left">
          <table className='items'>
            <tbody>
              <tr className="info-item">
                <td>მდგომარეობა: </td>
                <td>{laptop.state==="new"?"ახალი":"ძველი"}</td>
              </tr>
              <tr className="info-item">
                <td>ლეპტოპის ფასი: </td>
                <td>{laptop.price}₾</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="right">
          <table className="items">
            <tbody>
              <tr className="info-item">
                <td>შევსების რიცხვი: </td>
                <td>12/05/2022</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default RecordingDetailsPage