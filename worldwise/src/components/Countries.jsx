import styles from "./Countries.module.css";
import Spinner from "./Spinner.jsx";
import CountryItem from "./CountryItem.jsx";

export default function Countries({ cities, isLoading }) {
    if (isLoading) return <Spinner />;

    const countries = cities.reduce((acc, city) => {
        if (!acc.some((c) => c.country === city.country))
            acc.push({ country: city.country, emoji: city.emoji });
        return acc;
    }, []);

    return (
        <ul className={styles.countryList}>
            {countries.map((country) => (
                <CountryItem key={country.country} country={country} />
            ))}
        </ul>
    );
}
