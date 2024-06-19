function FinishPage({ points, maxPoints, highscore, dispatch }) {
  const percentageCorrect = (points / maxPoints) * 100;

  let emoji;
  if (percentageCorrect === 100) emoji = "🥇";
  if (percentageCorrect >= 80 && percentageCorrect < 100) emoji = "😜";
  if (percentageCorrect >= 60 && percentageCorrect < 80) emoji = "🫣";
  if (percentageCorrect > 0 && percentageCorrect < 60) emoji = "🤔";
  if (percentageCorrect === 0) emoji = "😬";

  return (
    <>
      <p className="result">
        {emoji} You scored {points} out of {maxPoints} (
        {Math.ceil(percentageCorrect)}%)
      </p>
      <p className="highscore">Your highscore is {highscore}</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishPage;
