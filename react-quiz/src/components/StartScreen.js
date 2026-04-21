export function StartScreen({numberQuestions, onStart}) {
    return <div className="start">
        <h2>Welcome to The React Quiz!</h2>
        <h3>{numberQuestions} questions to test your React mastery</h3>
        <button className="btn btn-ui" onClick={() => onStart({type: "start"})}>Let's start</button>
    </div>
}