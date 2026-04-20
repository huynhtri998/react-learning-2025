import Header from "./Header";
import Main from "./Main";
import {useEffect, useReducer} from "react";
import Loader from "./Loader"
import Error from "./Error";
import {StartScreen} from "./StartScreen";
import {Question} from "./Question";

const initialState = {
    questions: [],
    status: "loading"
}

function reducer(state, action) {
    switch (action.type) {
        case "dataReceived": {
            return {...state, questions: action.payload, status: "ready"};
        }
        case "dataFailed": {
            return {...state, status: "error"};
        }
        case "start": {
            return {...state, status: "active"};
        }
        default: {
            throw new Error("Unknown action type");
        }
    }
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(function () {
        fetch("http://localhost:9000/questions")
            .then((res) => res.json())
            .then((data) => dispatch({type: "dataReceived", payload: data}))
            .catch((err) => dispatch({type: "dataFailed"}));
    },[])

    return (
        <div className="app">
            <Header />

            <Main>
                {state.status === "loading" && <Loader />}
                {state.status === "error" && <Error />}
                {state.status === "ready" && <StartScreen numberQuestions={state.questions.length} onStart={dispatch}/>}
                {state.status === "active" && <Question />}
            </Main>
        </div>
    )
}