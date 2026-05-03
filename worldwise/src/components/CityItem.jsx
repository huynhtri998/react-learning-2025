import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext.jsx";

function formatDate(date) {
    return new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));
}

export function emojiToCountryCode(emoji) {
    return [...emoji]
        .map((char) => String.fromCharCode(char.codePointAt(0) - 127397))
        .join("")
        .toLowerCase();
}

export default function CityItem({ city }) {
    const { cityName, emoji, date, id, position } = city;
    const countryCode = emojiToCountryCode(emoji);
    const { currentCity } = useCities();

    return (
        <li>
            <Link
                to={`/app/cities/${id}?lat=${position.lat}&lng=${position.lng}`}
                className={`${styles.cityItem} ${id === currentCity.id ? styles["cityItem--active"] : ""}`}
            >
                <img
                    src={`https://flagcdn.com/24x18/${countryCode}.png`}
                    alt={cityName}
                    className={styles.emoji}
                />
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>({formatDate(date)})</time>
                <button className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>
    );
}
