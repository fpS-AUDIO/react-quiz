import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextQuestionBtn from "./NextQuestionBtn";
import Progress from "./Progress";
import FinishPage from "./FinishPage";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30;

const initialState = {
  // possible statuses: `loading`, `error`, `ready`, `active`, `finished`
  status: `loading`,
  questions: [],
  // current index of questions array
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  remainingSecs: null,
};

// reducer is called by dispatch function of the useReducer
function reducer(state, action) {
  switch (action.type) {
    // when data is correctly fetched
    case `dataRecieved`:
      return { ...state, status: "ready", questions: action.payload };

    // when data is failed to fetch
    case `dataFailed`:
      return { ...state, status: "error" };

    // when start button is clicked
    case `start`:
      return {
        ...state,
        status: `active`,
        remainingSecs: state.questions.length * SECS_PER_QUESTION,
      };

    // when clicked on an answer
    case `newAnswer`:
      // derived state
      const currentQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };

    // when clicked on next question button
    case "nextQuestion":
      return { ...state, index: state.index++, answer: null };

    // when the last question is finished
    case "Finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    // when restart button is clicked
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };

    // when 1 second is passed and the timer is refreshed
    case "tick":
      return {
        ...state,
        remainingSecs: state.remainingSecs - 1,
        status: state.remainingSecs === 0 ? "finished" : state.status,
      };
    default:
      throw new Error(`Action.type is not detected by reducer....`);
  }
}

export default function App() {
  // managing state with useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  // derived states
  const numQuestions = state.questions.length;
  const maxPoints = state.questions.reduce((prev, cur) => prev + cur.points, 0);

  // fetching data on mount from fake API (json-server)
  useEffect(function () {
    async function getQuestions() {
      try {
        // run 'npm run server' to run json-server
        const data = await fetch("http://localhost:9000/questions");

        // guard clause
        if (!data.ok) throw new Error(`data is failed to fetch`);

        // converting from json
        const questions = await data.json();

        // updating state
        dispatch({ type: "dataRecieved", payload: questions });
      } catch (err) {
        // updating state with error
        dispatch({ type: "dataFailed" });

        // for debugging loging to the console the error
        console.log(err.message);
      }
    }

    // calling async function to get data and update the state
    getQuestions();
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {/* show different UIs basing on the state */}
        {state.status === `loading` && <Loader />}
        {state.status === `error` && <Error />}
        {state.status === `ready` && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {state.status === `active` && (
          <>
            <Progress
              points={state.points}
              index={state.index}
              numQuestions={numQuestions}
              maxPoints={maxPoints}
              answer={state.answer}
            />
            <Question
              question={state.questions[state.index]}
              dispatch={dispatch}
              stateAnswer={state.answer}
            />
            <footer>
              <Timer remainingSecs={state.remainingSecs} dispatch={dispatch} />
              <NextQuestionBtn
                stateAnswer={state.answer}
                dispatch={dispatch}
                index={state.index}
                numQuestions={numQuestions}
              />
            </footer>
          </>
        )}

        {state.status === `finished` && (
          <FinishPage
            maxPoints={maxPoints}
            points={state.points}
            highscore={state.highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
