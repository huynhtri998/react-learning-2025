import {useEffect, useRef, useState} from "react";
import {wait} from "@testing-library/user-event/dist/utils";
import StarRating from "./StarRating";
import {useMovies} from "./useMovies";
import {useLocalStorageState} from "./useLocalStorageState";
import {useKey} from "./useKey";

const tempMovieData = [{
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
}, {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
}, {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
},];

const tempWatchedData = [{
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
}, {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
},];


const KEY = '16cdf428'
const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
    const [query, setQuery] = useState("");
    // const [watched, setWatched] = useState([]);
    const [watched, setWatched] = useLocalStorageState([], "watched");
    const {isLoading, error, movies} = useMovies(query);

    const [selectedId, setSelectedId] = useState(null);


    function handleSelectedMovie(id) {
        setSelectedId(selectedId => id === selectedId ? null : id);
    }

    function handleCloseSelectedMovie() {
        setSelectedId(null);
    }

    useEffect(function () {
        if (query.length > 3) {
            setSelectedId(null);
        }
    }, [query]);

    function handleAddWatched(movie) {
        setWatched(watched => [...watched, movie]);
    }

    function handleDeleteWatched(id) {
        setWatched(watched => watched.filter(movie => movie.imdbID !== id));
    }

    return (<>
        <NavBar>
            <Search query={query} setQuery={setQuery}/>
            <NumResults movies={movies}/>
        </NavBar>
        <Main>
            <Box>
                {isLoading && <Loader/>}
                {!isLoading && !error && <MovieList movies={movies} handleSelectedMovie={handleSelectedMovie}/>}
                {error && <ErrorMessage message={error}/>}
            </Box>
            <Box>
                {selectedId ? <SelectedMovie
                    selectedId={selectedId}
                    handleCloseSelectedMovie={handleCloseSelectedMovie}
                    onAddWatched={handleAddWatched}
                    watched={watched}
                /> : <>
                    <Summary watched={watched}/>
                    <WatchedMovieList watched={watched} onDeleteWatched={handleDeleteWatched}/>
                </>}
            </Box>
        </Main>
    </>);
}

function SelectedMovie({selectedId, handleCloseSelectedMovie, onAddWatched, watched}) {
    const [movie, setMovie] = useState({});
    const [userRating, setUserRating] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
    const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;

    useEffect(function () {
        setIsLoading(true);

        async function getMovieDetails() {
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
            const data = await res.json();
            setMovie(data)
            setIsLoading(false);
        }

        getMovieDetails();
    }, [selectedId])

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    const countRef = useRef(0)

    useEffect(function () {
        if (userRating) countRef.current++;
    }, [userRating]);

    useEffect(function () {
        if (!title) return;
        document.title = `Movie | ${title}`;

        return function () {
            document.title = "usePopcorn";
        }
    }, [title])

    useKey("Escape", handleCloseSelectedMovie);

    function handleAdd() {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ")[0]),
            userRating,
            countUserDecision: countRef.current
        };
        onAddWatched(newWatchedMovie);
        handleCloseSelectedMovie();
    }

    return <div className="details">
        {isLoading ? <Loader/> : <>
            <header>
                <button className="btn-back" onClick={handleCloseSelectedMovie}>&larr;</button>
                <img src={poster} alt={`Poster of ${title} movie`}/>
                <div className="details-overview">
                    <h2>{title}</h2>
                    <p>{released} &bull; {year} &bull; {runtime}</p>
                    <p>{genre}</p>
                    <p>
                        <span>⭐</span>
                        {imdbRating} IMDb rating
                    </p>
                </div>
            </header>

            <section>
                <div className="rating">
                    {isWatched ?
                        <p>You rated this movie {watchedUserRating} ⭐</p> :
                        <>
                            <StarRating
                                maxRating={10}
                                size={24}
                                onSetRating={setUserRating}
                            />

                            {userRating > 0 &&
                                <button className="btn-add" onClick={handleAdd}>
                                    + Add to list
                                </button>
                            }
                        </>
                    }
                </div>
                <p><em>{plot}</em></p>
                <p>Starring {actors}</p>
                <p>Directed by {director}</p>
            </section>
        </>}
    </div>
}

function Loader() {
    return <p className='loader'>Loading...</p>;
}

function ErrorMessage({message}) {
    return <p className='error'>⛔ {message}</p>;
}

function Main({children}) {
    return <main className="main">
        {children}
    </main>
}

function NavBar({children}) {
    return <nav className="nav-bar">
        <Logo/>
        {children}
    </nav>
}

function Logo() {
    return <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
    </div>
}

function Search({query, setQuery}) {

    useKey("Enter", function (){
        if (document.activeElement === inputEl.current) {
            return;
        }

        inputEl.current.focus();
        setQuery("");
    })

    const inputEl = useRef(null);

    return <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
    />
}

function NumResults({movies}) {
    return <p className="num-results">
        Found <strong>{movies.length}</strong> results
    </p>
}

function Box({children}) {
    const [isOpen, setIsOpen] = useState(true);

    return <div className="box">
        <button
            className="btn-toggle"
            onClick={() => setIsOpen((open) => !open)}
        >
            {isOpen ? "–" : "+"}
        </button>
        {isOpen && children}
    </div>
}

function MovieList({movies, handleSelectedMovie}) {
    return <ul className="list">
        {movies?.map((movie) => <Movie movie={movie} handleSelectedMovie={handleSelectedMovie}/>)}
    </ul>
}

function Movie({movie, handleSelectedMovie}) {
    return <li key={movie.imdbID} onClick={() => handleSelectedMovie(movie.imdbID)}>
        <img src={movie.Poster} alt={`${movie.Title} poster`}/>
        <h3>{movie.Title}</h3>
        <div>
            <p>
                <span>🗓</span>
                <span>{movie.Year}</span>
            </p>
        </div>
    </li>
}

/*function WatchedBox({children}){
    const [isOpen2, setIsOpen2] = useState(true);

    return <div className="box">
        <button
            className="btn-toggle"
            onClick={() => setIsOpen2((open) => !open)}
        >
            {isOpen2 ? "–" : "+"}
        </button>
        {isOpen2 && (<>
            {children}
        </>)}
    </div>
}*/

function Summary({watched}) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));

    return <div className="summary">
        <h2>Movies you watched</h2>
        <div>
            <p>
                <span>#️⃣</span>
                <span>{watched.length} movies</span>
            </p>
            <p>
                <span>⭐️</span>
                <span>{avgImdbRating.toFixed(2)}</span>
            </p>
            <p>
                <span>🌟</span>
                <span>{avgUserRating.toFixed(2)}</span>
            </p>
            <p>
                <span>⏳</span>
                <span>{avgRuntime.toFixed(2)} min</span>
            </p>
        </div>
    </div>
}

function WatchedMovieList({watched, onDeleteWatched}) {
    return <ul className="list">
        {watched.map((movie) => <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched}/>)}
    </ul>
}

function WatchedMovie({movie, onDeleteWatched}) {
    return <li>
        <img src={movie.poster} alt={`${movie.title} poster`}/>
        <h3>{movie.title}</h3>
        <div>
            <p>
                <span>⭐️</span>
                <span>{movie.imdbRating}</span>
            </p>
            <p>
                <span>🌟</span>
                <span>{movie.userRating}</span>
            </p>
            <p>
                <span>⏳</span>
                <span>{movie.runtime} min</span>
            </p>
        </div>
        <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>✕</button>
    </li>
}
