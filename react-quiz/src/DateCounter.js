import {useReducer} from "react";

const initialState = {
    count: 0, step: 1,
}

function reducer(state, action) {
    switch (action.type) {
        case "inc": {
            return {...state, count: state.count + state.step};
        }
        case "dec": {
            return {...state, count: state.count - state.step};
        }
        case "define": {
            return {...state, count: action.value};
        }
        case "reset": {
            return initialState;
        }
        case "step": {
            return {...state, step: action.value};
        }
        default: {
            throw new Error("Unknown action type");
        }
    }
}

function DateCounter() {
    // const [count, setCount] = useState(0);
    // const [step, setStep] = useState(1);
    const [state, dispatch] = useReducer(reducer, initialState);
    const {count, step} = state;
    // This mutates the date object.
    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + count);

    const dec = function () {
        dispatch({type: "dec"});
        // setCount((count) => count - 1);
        // setCount((count) => count - step);
    };

    const inc = function () {
        dispatch({type: "inc"});
        // setCount((count) => count + 1);
        // setCount((count) => count + step);
    };

    const defineCount = function (e) {
        dispatch({type: "define", value: Number(e.target.value)});
        // setCount(Number(e.target.value));
    };

    const defineStep = function (e) {
        dispatch({type:"step", value: Number(e.target.value)});
    };

    const reset = function () {
        // setCount(0);
        dispatch({type: "reset"})
    };

    return (<div className="counter">
            <div>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={step}
                    onChange={defineStep}
                />
                <span>{step}</span>
            </div>

            <div>
                <button onClick={dec}>-</button>
                <input value={count} onChange={defineCount}/>
                <button onClick={inc}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <div>
                <button onClick={reset}>Reset</button>
            </div>
        </div>);
}

export default DateCounter;
