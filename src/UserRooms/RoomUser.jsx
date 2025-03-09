import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom" 
import "./rooms.css"
import RoomUserList from "./RoomUserList"

function RoomUser() { 
  const { accommodation_id } = useParams() 
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    fetch(`https://moringa-hostels-backend-ebzd.onrender.com/rooms?accommodation_id=${accommodation_id}`) 
      .then(res => res.json())
      .then(data => {
        setRooms(Array.isArray(data) ? data : [])
      })
      .catch(err => console.log("Error fetching rooms:", err))
  }, [accommodation_id])
  
  return (
    <>
      <h1 className="roomH">Hostel Rooms</h1> 
      <RoomUserList rooms={rooms} setRooms={setRooms} />
    </>
  )
}

export default RoomUser
