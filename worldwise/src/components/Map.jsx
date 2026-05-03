import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import styles from "./Map.module.css";
import { useCities } from "../contexts/CitiesContext.jsx";
import { emojiToCountryCode } from "./CityItem.jsx";
import { useGeolocation } from "../hooks/useGeolocation.js";
import Button from "./Button.jsx";

// Moves the map center whenever position changes
function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

// Navigates to form with lat/lng when map is clicked
function DetectClick() {
    const navigate = useNavigate();
    useMapEvents({
        click: (e) =>
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    });
    return null;
}

export default function Map() {
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const { cities, currentCity } = useCities();
    const [searchParams] = useSearchParams();
    const {
        isLoading: isLoadingPosition,
        position: geolocationPosition,
        getPosition,
    } = useGeolocation();

    const mapLat = searchParams.get("lat");
    const mapLng = searchParams.get("lng");

    // Sync map position with URL query params (from city list clicks)
    useEffect(
        function () {
            if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
        },
        [mapLat, mapLng]
    );

    // Move map when currentCity changes
    useEffect(
        function () {
            if (currentCity.position)
                setMapPosition([currentCity.position.lat, currentCity.position.lng]);
        },
        [currentCity]
    );

    // Move map to geolocation position when retrieved
    useEffect(
        function () {
            if (geolocationPosition)
                setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
        },
        [geolocationPosition]
    );

    return (
        <div className={styles.mapContainer}>
            {!geolocationPosition && (
                <Button variant="position" onClick={getPosition}>
                    {isLoadingPosition ? "Loading..." : "Use your position"}
                </Button>
            )}
            <MapContainer
                center={mapPosition}
                zoom={6}
                scrollWheelZoom={true}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker
                        key={city.id}
                        position={[city.position.lat, city.position.lng]}
                    >
                        <Popup>
                            <span>
                                <img
                                    src={`https://flagcdn.com/24x18/${emojiToCountryCode(city.emoji)}.png`}
                                    alt={city.cityName}
                                />
                            </span>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    );
}
