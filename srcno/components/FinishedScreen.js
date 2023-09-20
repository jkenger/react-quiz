export default function FinishedScreen({
  points,
  maxPossiblePoints,
  highscore,
  dispatch,
}) {
  const perc = (points / maxPossiblePoints) * 100;
  let emoji;

  if (perc === 100) emoji = "🥇";
  if (perc >= 80 && perc < 100) emoji = "🎉";
  if (perc >= 50 && perc < 80) emoji = "😊";
  if (perc >= 0 && perc < 50) emoji = "🤔";
  if (perc === 0) emoji = "🤦‍♂️";
  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You scored <strong>{points}</strong> out of {maxPossiblePoints}{" "}
        {Math.ceil(perc)}%
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}
