import AccommodateItem from "./AccommodateItem";

function AccommodateList({ accommodate, setAccommodate }) {
    return (
        <div id="container">
            {accommodate.length > 0 ? accommodate.map(accommodates => (
                <AccommodateItem 
                    key={accommodates.id}
                    id={accommodates.id}
                    name={accommodates.name}
                    image={accommodates.image}
                    description={accommodates.description}
                    latitude={accommodates.latitude}
                    longitude={accommodates.longitude}
                    accommodate={accommodate} 
                    setAccommodate={setAccommodate}
                />
            )) : null}
        </div>
    );
}

export default AccommodateList;
