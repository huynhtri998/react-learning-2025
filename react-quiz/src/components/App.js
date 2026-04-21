import Header from "./Header";
import Main from "./Main";
import {useEffect, useReducer} from "react";
import Loader from "./Loader"
import Error from "./Error";
import {StartScreen} from "./StartScreen";
import {Question} from "./Question";
import {NextButton} from "./NextButton";
import {Progress} from "./Progress";
import {FinishScreen} from "./FinishScreen";
import {Timer} from "./Timer";

const SECS_PER_QUESTION = 30;

const initialState = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: null,
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
            return {
                ...state,
                status: "active",
                secondsRemaining: state.questions.length * SECS_PER_QUESTION,
            };
        }
        case "newAnswer": {
            const question = state.questions[state.index];
            const isCorrect = action.payload === question.correctOption;
            return {
                ...state,
                answer: action.payload,
                points: isCorrect ? state.points + question.points : state.points,
            };
        }
        case "nextQuestion": {
            return { ...state, index: state.index + 1, answer: null };
        }
        case "finish": {
            return {
                ...state,
                status: "finished",
                highscore: Math.max(state.points, state.highscore),
            };
        }
        case "tick": {
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? "finished" : state.status,
                highscore: state.secondsRemaining === 0
                    ? Math.max(state.points, state.highscore)
                    : state.highscore,
            };
        }
        case "restart": {
            return {
                ...initialState,
                questions: state.questions,
                status: "ready",
                highscore: state.highscore,
            };
        }
        default: {
            throw new Error("Unknown action type");
        }
    }
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const currentQuestion = state.questions[state.index];
    const maxPossiblePoints = state.questions.reduce((acc, q) => acc + q.points, 0);

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
                {state.status === "active" && (
                    <>
                        <Progress
                            index={state.index}
                            numQuestions={state.questions.length}
                            points={state.points}
                            maxPossiblePoints={maxPossiblePoints}
                            answer={state.answer}
                        />
                        <Question
                            question={currentQuestion}
                            dispatch={dispatch}
                            answer={state.answer}
                        />
                        <NextButton
                            dispatch={dispatch}
                            answer={state.answer}
                            index={state.index}
                            numQuestions={state.questions.length}
                        />
                        <Timer dispatch={dispatch} secondsRemaining={state.secondsRemaining} />
                    </>
                )}
                {state.status === "finished" && (
                    <FinishScreen
                        points={state.points}
                        maxPossiblePoints={maxPossiblePoints}
                        highscore={state.highscore}
                        dispatch={dispatch}
                    />
                )}
            </Main>
        </div>
    )
}