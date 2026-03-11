import './index.css';
import {useState} from "react";

export default function App() {
    const [step, setStep] = useState(1);
    const [count, setCount] = useState(0);

    const date = new Date("Mar 11 2026");
    date.setDate(date.getDate() + count);

    function handleStepChange(e) {
        setStep(Number(e.target.value));
    }

    function handleReset() {
        setStep(1);
        setCount(0);
    }

    return (
        <div className="App">
            <div>
                <input
                    type={"range"}
                    min={0}
                    max={10}
                    value={step}
                    onChange={handleStepChange}
                />
                <span>Step: {step}</span>
            </div>

            <div>
                <button onClick={() => setCount((c) => c - step)}>-</button>
                <input type={"text"} value={count} onChange={(e) => setCount(Number(e.target.value))}/>
                <button onClick={() => setCount((c) => c + step)}>+</button>
            </div>

            <div>
                <p>
                <span>
                    {count === 0 ? "Today is "
                        : count > 0 ? `${count} day${count > 1 ? "s" : ""} from now is `
                            : `${Math.abs(count)} day${Math.abs(count) > 1 ? "s" : ""} ago was `
                    }
                </span>
                    <span>{date.toDateString()}</span>
                </p>
            </div>

            {count !== 0 || step !== 1
                ? <button onClick={handleReset}>Reset</button>
                : null}
        </div>
    );
}
