function NextQuestionBtn({ dispatch, stateAnswer, index, numQuestions }) {
  // using early return instead of optional chaining or short circuiting
  if (stateAnswer === null) return;

  // console.log(index);
  // console.log(numQuestions);

  // if there is any futher question
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: `nextQuestion` })}
      >
        Next
      </button>
    );

  // if that was the last question
  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: `Finished` })}
      >
        Finish
      </button>
    );
}

export default NextQuestionBtn;
