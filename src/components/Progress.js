export default function Progress({
  index,
  totalQuestions,
  points,
  maxPossiblePoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        max={totalQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {totalQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}
