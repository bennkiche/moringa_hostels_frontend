import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NewRoom from "./NewRooms"
import RoomList from "./RoomList";

function Room() {
  const [room, setRoom] = useState([]);
  const token = localStorage.getItem("access_token");
  const location = useLocation();
  const accommodationId = location.state?.accommodation_id || ""; 

  useEffect(() => {
    if (!token) {
      console.error("No token found. User might not be logged in.");
      return;
    }

    let url = "https://moringa-hostels-backend-ebzd.onrender.com/rooms";
    if (accommodationId) {
      url += `?accommodation_id=${accommodationId}`;
    }

    fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized or failed to fetch rooms");
        }
        return res.json();
      })
      .then((data) => {
        setRoom(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Error fetching rooms:", err));
  }, [token, accommodationId]);

  return (
    <>
      <h1 className="roomH">Rooms</h1>
      <NewRoom room={room} setRoom={setRoom} token={token} accommodationId={accommodationId} />
      <RoomList room={room} setRoom={setRoom} />
    </>
  );
}

export default Room;
