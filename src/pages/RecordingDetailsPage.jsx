import React from 'react'
import NavigateBtn from '../components/NavigateBtn'

// შიდა გვერდი სპეციფიკური ლეპტოპის დეტალები
const RecordingDetailsPage = () => {
  return (
    <div className='recording-details_page'>
      <NavigateBtn />
      <h1 className="title">ლეპტოპის ინფო</h1>
      {/* ------------ laptop image and its user info ---------- */}
      <div className="main-info">
        <div className="left">
          <img src="/logo192.png" alt="laptop image" />
        </div>
        <div className="right">
          <table className='items'>
            <tr className="info-item">
              <td>სახელი: </td>
              <td>აკაკი წერეთელი</td>
            </tr>
            <tr className="info-item">
              <td>თიმი: </td>
              <td>დიზაინერები</td>
            </tr>
            <tr className="info-item">
              <td>პოზიცია: </td> 
              <td>ილუსტრატორი</td>
            </tr>
            <tr className="info-item">
              <td>მეილი: </td>
              <td>ako@gmail.com</td>
            </tr>
            <tr className="info-item">
              <td>ტელ. ნომერი: </td>
              <td>599 11 11 11</td>
            </tr>
          </table>
        </div>
      </div>
      <hr/>
      {/* ------------- laptop details specification etc. ------ */}
      <div className="laptop-desc">
        <div className="left">
          <table className='items'>
            <tr>
              <td>ლეპტოპის სახელი:</td>
              <td>რაღაც</td>
            </tr>
            <tr>
              <td>ლეპტოპის ბრენდი:</td>
              <td>ლენოვო</td>
            </tr>
            <tr>
              <td>RAM:</td>
              <td>16</td>
            </tr>
            <tr>
              <td>მეხსიერების ტიპი:</td>
              <td>SSD</td>
            </tr>
          </table>
        </div>
        <div className="right">
          <table className='items'>
            <tr>
              <td>CPU:</td>
              <td>Intel i5</td>
            </tr>
            <tr>
              <td>CPU cors:</td>
              <td>6</td>
            </tr>
            <tr>
              <td>CPU threads:</td>
              <td>12</td>
            </tr>
          </table>
        </div>
      </div>
      <hr/>
      {/* ------------ laptop condition, price and date --------- */}
      <div className="laptop-specs">
        <div className="left">
          <table className='items'>
            <tr className="info-item">
              <td>ლეპტოპის მდგომარეობა: </td>
              <td>მეორადი</td>
            </tr>
            <tr className="info-item">
              <td>ლეპტოპის ფასი: </td>
              <td>1500L</td>
            </tr>
          </table>
        </div>
        <div className="right">
          <table className="items">
            <tr className="info-item">
              <td>შევსების რიცხვი: </td>
              <td>12/05/2022</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  )
}

export default RecordingDetailsPage