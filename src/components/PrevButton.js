export default function PrevButton({ dispatch, index }) {
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "prevQuestion" })}
    >
      Previous
    </button>
  );
}
