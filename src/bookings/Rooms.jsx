import React, { useState, useEffect } from "react"
import BookingForm from "./BookingForm"

const AvailableRooms = () => {
  const [rooms, setRooms] = useState([])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("http://127.0.0.1:5000/rooms")
      .then((response) => response.json())
      .then((data) => {
        setRooms(data)
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err)
        setError("Failed to load rooms.")
      })
  }, [])

  const cancelBooking = (roomId) => {
    fetch(`http://127.0.0.1:5000/bookings/cancel/${roomId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setRooms(rooms.map(room => 
          room.id === roomId ? { ...room, is_booked: false, booked_dates: null } : room
        ))
      })
      .catch((err) => {
        console.error("Error canceling booking:", err)
      })
  }

  return (
    <div>
      <h2>All Rooms</h2>
      <div>
        <label>Start Date:</label>
        <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        
        <label>End Date:</label>
        <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {rooms.map((room) => (
          <div
            key={room.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "8px",
              width: "300px",
              boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <img
              src={room.image || "https://via.placeholder.com/300"}
              alt={`Room ${room.room_no}`}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <h3>Room {room.room_no}</h3>
            <p><strong>Type:</strong> {room.room_type}</p>
            <p><strong>Description:</strong> {room.description || "No description available"}</p>
            <p><strong>Price:</strong> ${room.price} per month</p>
            <p><strong>Accommodation ID:</strong> {room.accommodation_id}</p>
            <p><strong>Status:</strong> {room.is_booked ? "Booked" : "Available"}</p>
            {room.is_booked && (
              <>
                <p><strong>Booked Dates:</strong> {room.booked_dates || "N/A"}</p>
                <button onClick={() => cancelBooking(room.id)}>Cancel Booking</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AvailableRooms