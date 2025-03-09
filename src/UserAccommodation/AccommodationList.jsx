import AccommodationItem from "./AccommodationItem"

function AccommodationList({ accommodation, setAccommodation }) {
  return (
    <div id="acc-container">
      {accommodation.length > 0 ? (
        accommodation.map((acc) => (
          <AccommodationItem
            key={acc.id}
            id={acc.id}
            name={acc.name}
            image={acc.image}
            description={acc.description}
            latitude={acc.latitude}
            longitude={acc.longitude}
            accommodation={accommodation}
            setAccommodation={setAccommodation}
          />
        ))
      ) : (
        <p>No accommodations available with the selected filters.</p>
      )}
    </div>
  );
}

export default AccommodationList
