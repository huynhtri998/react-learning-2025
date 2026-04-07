import {useEffect, useState} from "react";

const KEY = '16cdf428'
export function useMovies(query) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [movies, setMovies] = useState([]);

    useEffect(function () {
        const controller = new AbortController();

        async function getMovies() {
            try {
                setIsLoading(true);
                setError('');
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                    { signal: controller.signal }
                );

                if (!res.ok) throw new Error("Something went wrong with fetching movies");

                const data = await res.json();

                if (data.Response === "False") throw new Error("Movie not found");

                setMovies(data.Search);
                setError('');
            } catch (err) {
                if (err.name === "AbortError") return;
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        if (query.length <= 3) {
            setMovies([]);
            setError('');
            return;
        }

        getMovies();

        return function () {
            controller.abort();
        };
    }, [query])

    return {isLoading, error, movies};
}