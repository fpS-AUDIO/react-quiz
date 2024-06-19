import { useEffect } from "react";

function Timer({ dispatch, remainingSecs }) {
  const mins = Math.floor(remainingSecs / 60);
  const secs = remainingSecs % 60;

  useEffect(
    function () {
      const tickId = setInterval(() => dispatch({ type: "tick" }), 1000);

      // using return function to unmount the setInterval when the component unmounts
      return () => clearInterval(tickId);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins < 10 ? "0" : ""}
      {mins}:{secs < 10 ? "0" : ""}
      {secs}
    </div>
  );
}

export default Timer;
