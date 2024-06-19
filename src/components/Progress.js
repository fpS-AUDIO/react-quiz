function Progress({ points, index, numQuestions, maxPoints, answer }) {
  return (
    <header className="progress">
      {/*   to make progress bar instantly work withput clicking on the next question button 
            you calculate the value by adding to the current index the converted to a number boolean
            if there is an answer. false is gonna be 0 and true 1.   */}
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / <strong>{numQuestions}</strong>
      </p>
      <p>
        Points <strong>{points}</strong> / <strong>{maxPoints}</strong>
      </p>
    </header>
  );
}

export default Progress;
