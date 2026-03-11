import './index.css';
import {useState} from "react";

function App() {
    const [step, setStep] = useState(1);
    const [count, setCount] = useState(0);

    const date = new Date("Jun 21 2027");
    date.setDate(date.getDate() + count);

    function increaseStep() {
        setStep(s => s + 1);
    }

    function decreaseStep() {
        setStep(s => s - 1);
    }

    function increaseCount() {
        setCount(c => c + step);
    }

    function decreaseCount() {
        setCount(c => c - step);
    }

    return <div className={"App"}>
        <div>
            <button onClick={decreaseStep}>-</button>
            <span>Step: {step}</span>
            <button onClick={increaseStep}>+</button>
        </div>

        <div>
            <button onClick={decreaseCount}>-</button>
            <span>Count: {count}</span>
            <button onClick={increaseCount}>+</button>
        </div>

        <div>
            <p>
                <span>
                {count === 0 ? "Today is "
                    : count > 0 ? `${count} day${count > 1 ? "s" : ""} from now is `
                        : `${Math.abs(count)} day${Math.abs(count) > 1 ? "s" : ""} ago was `
                }
                </span>
                <span>{date.toDateString()} </span>
            </p>
        </div>
    </div>
}

export default App;
