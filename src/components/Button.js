export default function Button({ dispatch, answer, index, totalQuestions }) {
  return (
    <>
      {answer !== null && (
        <>
          {index === totalQuestions - 1 && (
            <button
              className="btn btn-ui"
              onClick={() => dispatch({ type: "finished" })}
            >
              Next
            </button>
          )}
          {index < totalQuestions - 1 && (
            <button
              className="btn btn-ui"
              onClick={() => dispatch({ type: "nextQuestion" })}
            >
              Next
            </button>
          )}
        </>
      )}
      {index > 0 && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "prevQuestion" })}
        >
          Back
        </button>
      )}
    </>
  );
}
