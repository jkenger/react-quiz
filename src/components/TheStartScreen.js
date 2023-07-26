import Difficulty from "./Difficulty";

export default function TheStartScreen({
  totalQuestions,
  dispatch,
  difficulty,
  questions,
}) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3>{totalQuestions} question to test your React Mastery</h3>
      <Difficulty difficulty={difficulty} dispatch={dispatch} />
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}
