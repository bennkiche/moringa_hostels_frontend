import RoomItem from "./RoomItem";

function RoomList({ room, setRoom }) {
    return (
        <div id="container">
            {room.length > 0 ? 
                room.map((accommodates, index) => (
                    <RoomItem
                        key={accommodates.id || `room-${index}`}
                        id={accommodates.id}
                        room_type={accommodates.room_type}
                        price={accommodates.price}
                        room_no={accommodates.room_no}
                        availability={accommodates.availability}
                        image={accommodates.image}
                        accommodation_id={accommodates.accommodation_id}
                        description={accommodates.description}
                        room={room} 
                        setRoom={setRoom}
                    />
                )) 
            : <p>No rooms available.</p>}
        </div>
    );
}

export default RoomList;
