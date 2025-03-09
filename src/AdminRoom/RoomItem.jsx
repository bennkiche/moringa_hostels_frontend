import { useState } from "react";

function RoomItem({ room_type, room_no, availability, accommodation_id, description, id, image, price, room, setRoom }) {
  const [update, setUpdate] = useState({
    room_type,
    room_no,
    availability,
    accommodation_id,
    price,
    description,
    image,
  });
  const [uploading, setUploading] = useState(false);

  function handleChange(e) {
    let { name, value } = e.target;

    if (name === "availability") {
      value = value === "true" ? true : false;
    }

    setUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "react_uploads");

    fetch("https://api.cloudinary.com/v1_1/dvjkvk71s/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdate((prev) => ({ ...prev, image: data.secure_url }));
        setUploading(false);
      })
      .catch((err) => {
        console.error("Error uploading image:", err);
        setUploading(false);
      });
  }

  function handleUpdate(e) {
    e.preventDefault();

    const minPrice = 5000;
    const maxPrice = 30000;

    if (update.price < minPrice || update.price > maxPrice) {
      alert(`Room price must be between ${minPrice} and ${maxPrice}!`);
      return;
    }

    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("You must be logged in to update a room.");
      return;
    }

    // **Frontend validation: Ensure room number is unique within accommodation**
    const isDuplicateRoom = room.some(
      (r) => r.room_no === Number(update.room_no) && r.accommodation_id === accommodation_id && r.id !== id
    );

    if (isDuplicateRoom) {
      alert("A room with this number already exists in the selected accommodation!");
      return;
    }

    fetch(`https://moringa-hostels-backend-ebzd.onrender.com/rooms/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        room_type: update.room_type,
        room_no: Number(update.room_no),
        availability: update.availability,
        accommodation_id: update.accommodation_id,
        price: Number(update.price),
        description: update.description,
        image: update.image,
      }),
    })
      .then((resp) => resp.json())
      .then((updated) => {
        let updatedRooms = room.map((craft) =>
          craft.id === id ? { ...craft, ...updated } : craft
        );
        setRoom(updatedRooms);
        setUpdate(updated);
        alert("Room updated successfully!");
      })
      .catch((err) => console.error("Error updating room:", err));
  }

  function handleDelete() {
    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("You must be logged in to delete a room.");
      return;
    }

    fetch(`https://moringa-hostels-backend-ebzd.onrender.com/rooms/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        let remainder = room.filter((fins) => fins.id !== id);
        setRoom(remainder);
        alert("The room has been deleted successfully");
      })
      .catch((err) => console.error("Error deleting room:", err));
  }

  return (
    <div id="content">
      <img src={image} alt={room_type} />
      <h2 className="cont"><strong>{room_type}</strong></h2>
      <h2 className="cont"><strong>{room_no}</strong></h2>
      <h2 className="cont"><strong>{description}</strong></h2>
      <h2 className="cont"><strong>{availability ? "Available" : "Not Available"}</strong></h2>
      <h2 className="cont"><strong>ksh: {price}</strong></h2>
      
      <form id="new" onSubmit={handleUpdate}>
        <input className="input" type="text" name="room_type" placeholder="room_type" value={update.room_type} required onChange={handleChange} /><br />
        <input className="input" type="number" name="room_no" placeholder="room_no" value={update.room_no} required onChange={handleChange} /><br />
        <select className="input" name="availability" value={update.availability} required onChange={handleChange}>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select><br />
        <input className="input" type="hidden" name="accommodation_id" value={update.accommodation_id} />
        <input className="input" type="text" name="description" placeholder="Description" value={update.description} required onChange={handleChange} /><br />
        <input className="input" type="number" name="price" placeholder="Price" value={update.price} required onChange={handleChange} /><br />
        <input className="input" type="file" name="image" accept="image/*" onChange={handleImageUpload} /><br />
        {uploading && <p>Uploading...</p>}
        {update.image && <img src={update.image} alt="Preview" style={{ width: "100px" }} />}<br />
        <button className="update" type="submit">Update</button>
      </form>
      <button className="delete" onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default RoomItem;
