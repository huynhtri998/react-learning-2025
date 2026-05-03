import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./City.module.css";
import Spinner from "./Spinner.jsx";
import { emojiToCountryCode } from "./CityItem.jsx";
import Button from "./Button.jsx";
import { useCities } from "../contexts/CitiesContext.jsx";

function formatDate(date) {
    return new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));
}

export default function City() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentCity, getCity, isLoading } = useCities();

    useEffect(function () {
        getCity(id);
    }, [id]);

    if (isLoading) return <Spinner />;
    if (!currentCity.id) return null;

    const { cityName, emoji, date, notes } = currentCity;
    const countryCode = emojiToCountryCode(emoji);

    return (
        <div className={styles.city}>
            <div className={styles.row}>
                <h6>City name</h6>
                <h3>
                    <img
                        src={`https://flagcdn.com/24x18/${countryCode}.png`}
                        alt={cityName}
                    />
                    {cityName}
                </h3>
            </div>

            <div className={styles.row}>
                <h6>You went to {cityName} on</h6>
                <p>{formatDate(date)}</p>
            </div>

            {notes && (
                <div className={styles.row}>
                    <h6>Your notes</h6>
                    <p>{notes}</p>
                </div>
            )}

            <div className={styles.row}>
                <h6>Learn more</h6>
                <a
                    href={`https://en.wikipedia.org/wiki/${cityName}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    Check out {cityName} on Wikipedia &rarr;
                </a>
            </div>

            <div>
                <Button variant="back" onClick={() => navigate(-1)}>&larr; Back</Button>
            </div>
        </div>
    );
}

