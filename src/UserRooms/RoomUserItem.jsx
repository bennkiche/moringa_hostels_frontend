import { useState } from "react"
import { useNavigate } from "react-router-dom"

function RoomUserItem({ room_no, room_type, id, image, description, availability, accommodation_id, price, rooms, setRooms }) {
  const navigate = useNavigate()
  const [isExpanded, setIsExpanded] = useState(false)

  const handleBookNow = () => {
    navigate("/book-room", {
      state: {
        room_id: id,
        room_no,
        room_type,
        accommodation_id,
        price, 
        description,
        image,
      }
    })
  }

  const words = description.split(" ")
  const shortDescription = words.slice(0, 20).join(" ") + (words.length > 20 ? "..." : "")

  return (
    <div className="room-card">
      <img className="room-image" src={image} alt={room_type} />
      <div className="room-info">
        <h2 className="room-type">{room_type}</h2>
        
        {/* Show short description initially and toggle full description on click */}
        <p className="room-description">
          {isExpanded ? description : shortDescription}{" "}
          {words.length > 20 && (
            <span className="view-more" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "View Less" : "View More"}
            </span>
          )}
        </p> 

        <div className="room-status">
          <p className="availability">Availability: {availability}</p>
          <p className="room-number">Room No: {room_no}</p>
        </div>

        <p className="price">Ksh: {price}</p>
        <button className="book-btn" onClick={handleBookNow}>Book Now</button>
      </div>
    </div>
  )
}

export default RoomUserItem