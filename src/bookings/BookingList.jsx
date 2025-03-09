import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./bookings.css"

const BookingList = () => {
  const [bookings, setBookings] = useState([])
  const navigate = useNavigate()
  const token = localStorage.getItem("access_token")

  useEffect(() => {
    fetch("https://moringa-hostels-backend-ebzd.onrender.com/Userbookings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched bookings:", data);  
        setBookings(data);
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  }, [token]);  

  const handleCancelBooking = (id) => {
    fetch(`https://moringa-hostels-backend-ebzd.onrender.com/bookings/${id}/cancel`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error canceling booking")
        }
        return response.json()
      })
      .then(() => {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === id ? { ...booking, status: "canceled" } : booking
          )
        )
      })
      .catch((error) => {
        console.error("Error canceling booking:", error)
      })
  }

  return (
    <div className="booking-container">
      <h2 className="booking-title">Your Bookings</h2>

      {bookings.length === 0 ? (
        <p className="no-bookings">No bookings found!</p>
      ) : (
        <div className="table-container">
          <table className="booking-table">
          <thead>
              <tr>
                <th>User Name</th>
                <th>User Email</th>
                <th>Room Type</th>
                <th>Room Number</th>
                <th>Accommodation ID</th>
                <th>Price (Per Month)</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.user_name || "N/A"}</td>
                  <td>{booking.user_email || "N/A"}</td>
                  <td>{booking.room_type}</td>
                  <td>{booking.room_no}</td>
                  <td>{booking.accommodation_id}</td>
                  <td>Ksh {booking.room_price}</td>
                  <td>
                    {booking.start_date
                      ? new Date(booking.start_date).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    {booking.end_date
                      ? new Date(booking.end_date).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>{booking.status}</td>
                  <td>
                    {booking.status === "canceled" ? (
                      <button className="cancelled-button" disabled>
                        Cancelled
                      </button>
                    ) : (
                      <button
                        className="cancel-button"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  )
}

export default BookingList
