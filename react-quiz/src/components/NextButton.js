export function NextButton({ dispatch, answer, index, numQuestions }) {
    if (answer === null) return null;

    const isLastQuestion = index === numQuestions - 1;

    return (
        <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: isLastQuestion ? "finish" : "nextQuestion" })}
        >
            {isLastQuestion ? "Finish" : "Next"}
        </button>
    );
}
