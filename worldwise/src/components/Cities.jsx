import styles from "./Cities.module.css";
import Spinner from "./Spinner.jsx";
import CityItem from "./CityItem.jsx";
import Message from "./Message.jsx";
import { useCities } from "../contexts/CitiesContext.jsx";

export default function Cities() {
    const { cities, isLoading } = useCities();
    if (isLoading) return <Spinner />;

    if (cities.length === 0) return <Message message="Add your first cities by clicking on a city on the map" />;

    return (
        <ul className={styles.cityList}>
            {cities.map((city) => (
                <CityItem key={city.id} city={city} />
            ))}
        </ul>
    );
}
