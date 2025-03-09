import RoomUserItem from "./RoomUserItem"


function RoomUserList({rooms,setRooms}){
    return(
       <div id="room-container">
          {rooms.length >0? rooms.map(accommodates => (
            <RoomUserItem 
            key={accommodates.id}
            id={accommodates.id}
            room_type ={accommodates.room_type}
            price={accommodates.price}
            room_no={accommodates.room_no}
            availability={accommodates.availability}
            image={accommodates.image}
            accommodation_id={accommodates.accommodation_id}
            description={accommodates.description}
            rooms={rooms} 
            setRooms={setRooms}
            />
          )):null}
       </div>
    )
}

export default RoomUserList