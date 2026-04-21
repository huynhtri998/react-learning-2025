import { useEffect } from "react";

export function Timer({ dispatch, secondsRemaining }) {
    const mins = Math.floor(secondsRemaining / 60);
    const secs = secondsRemaining % 60;

    useEffect(function () {
        const id = setInterval(function () {
            dispatch({ type: "tick" });
        }, 1000);

        return () => clearInterval(id);
    }, [dispatch]);

    return (
        <div className="timer">
            {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </div>
    );
}

