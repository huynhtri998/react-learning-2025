import styles from "./CountryItem.module.css";
import { emojiToCountryCode } from "./CityItem.jsx";

export default function CountryItem({ country }) {
    const countryCode = emojiToCountryCode(country.emoji);
    return (
        <li className={styles.countryItem}>
            <img
                src={`https://flagcdn.com/24x18/${countryCode}.png`}
                alt={country.country}
            />
            <span>{country.country}</span>
        </li>
    );
}

