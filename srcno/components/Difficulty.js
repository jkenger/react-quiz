export default function Difficulty({ difficulty, dispatch }) {
  const divStyle = {
    display: "flex",
    marginBottom: "5em",
    gap: "2em",
  };
  return (
    <div style={divStyle}>
      <button
        className={`btn btn ui ${difficulty === "easy" ? "selected" : ""}`}
        onClick={() =>
          dispatch({ type: "difficultySelected", payload: "easy" })
        }
      >
        EASY
      </button>
      <button
        className={`btn btn-ui ${difficulty === "medium" ? "selected" : ""}`}
        onClick={() =>
          dispatch({ type: "difficultySelected", payload: "medium" })
        }
      >
        MEDIUM
      </button>
      <button
        className={`btn btn-ui ${difficulty === "hard" ? "selected" : ""}`}
        onClick={() =>
          dispatch({ type: "difficultySelected", payload: "hard" })
        }
      >
        HARD
      </button>
    </div>
  );
}
