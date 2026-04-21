export function Options({ question, dispatch, answer }) {
    const hasAnswered = answer !== null;

    return (
        <div className="options">
            {question.options.map((option, index) => (
                <button
                    key={option}
                    disabled={hasAnswered}
                    onClick={() => dispatch({ type: "newAnswer", payload: index })}
                    className={`btn btn-option ${answer === index ? "answer" : ""} ${
                        hasAnswered
                            ? index === question.correctOption
                                ? "correct"
                                : index === answer
                                ? "wrong"
                                : ""
                            : ""
                    }`}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}
