import Options from "./Options";

function Question({ question, dispatch, stateAnswer }) {
  // console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        stateAnswer={stateAnswer}
      />
    </div>
  );
}

export default Question;
