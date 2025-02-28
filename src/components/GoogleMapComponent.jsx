import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 10.963752, // Example latitude (change as needed)
  lng: 79.385935, // Example longitude (change as needed)
};

const GoogleMapComponent = () => {
  return (
    <div className="flex justify-center items-center w-[80%] md:w-[30%] pb-8">
      <LoadScript googleMapsApiKey="AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapComponent;
