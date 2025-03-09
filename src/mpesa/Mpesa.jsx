import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import "./mpesa.css" 

function Mpesa() {
  const location = useLocation()
  const navigate = useNavigate()
  const [phone, setPhone] = useState("254")
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)

  const { accommodation_id, room_id, start_date, end_date } = location.state || {}

  useEffect(() => {
    if (location.state?.amount) {
      setAmount(location.state.amount)
    }
  }, [location.state])

  const handlePhoneChange = (e) => {
    let input = e.target.value
    if (!input.startsWith("254")) {
      input = "254"
    } else if (input.length > 12) {
      input = input.slice(0, 12)
    }
    setPhone(input)
  }

  const handlePay = async (e) => {
    e.preventDefault();
  
    if (!phone || phone.length !== 12 || !amount) {
      alert("Please enter a valid phone number.");
      return;
    }
  
    setLoading(true);
  
    try {
      const token = localStorage.getItem("access_token");
  
      // First, make the payment request
      const paymentResponse = await axios.post("https://moringa-hostels-backend-ebzd.onrender.com/mpesa/pay", {
        phone_number: phone,
        amount: amount
      }, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });
  
      console.log("Payment Response:", paymentResponse.data);
      alert("Payment successful! Booking will now be saved.");
  
      // If payment is successful, create the booking
      const bookingData = {
        accommodation_id,
        room_id,
        start_date,
        end_date,
      };
  
      const bookingResponse = await fetch("https://moringa-hostels-backend-ebzd.onrender.com/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });
  
      const bookingResult = await bookingResponse.json();
      console.log("Booking Response:", bookingResult);
  
      if (!bookingResponse.ok) {
        throw new Error(bookingResult.error || "Error booking room");
      }
  
      alert("🎉 Booking confirmed successfully!");
  
      navigate("/accommodationUsers");
  
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.error || "Payment failed! Booking was not completed.");
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div className="container">
      <h2 className="title">Moringa Hostels</h2>
      <p className="subtitle">
        Pay with <span className="mpesa-text">M<span className="hyphen">-</span>pesa</span>
      </p>

      <form className="payment-form" onSubmit={handlePay}>
        <input
          type="text"
          value={phone}
          onChange={handlePhoneChange}
          className="input-field"
          placeholder="2547XXXXXXXX"
          required
        />

        <input
          type="number"
          value={amount}
          className="input-field" 
          placeholder="Enter amount"
          required
          readOnly
        />

        <button type="submit" className="pay-button" disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  )
}

export default Mpesa
