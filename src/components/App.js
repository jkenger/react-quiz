import { useEffect, useReducer, useRef } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import TheStartScreen from "./TheStartScreen";
import Question from "./Question";
import Button from "./Button";
import PrevButton from "./PrevButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Footer from "./Footer";
import Timer from "./Timer";

export default function App() {
  const SECS_PER_QUESTION = 30;
  const initialState = {
    rawQuestions: [],
    questions: [],

    // 'loading', 'error', 'ready', 'active', 'finished'
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: null,
    difficulty: "easy",
  };

  function reducer(state, action) {
    const data = state.rawQuestions.filter((data) => {
      return data.difficulty.toLowerCase() === action.payload;
    });
    switch (action.type) {
      case "dataReceived":
        return {
          ...state,
          rawQuestions: action.payload,
          status: "ready",
        };
      case "dataFailed":
        return { ...state, status: "error" };
      case "difficultySelected":
        return {
          ...state,
          difficulty: action.payload,
          questions: data,
        };
      case "start":
        return {
          ...state,
          status: "active",
          secondsRemaining: state.questions.length * SECS_PER_QUESTION,
        };
      case "newAnswer":
        const curQuestion = state.questions[state.index];

        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === curQuestion.correctOption
              ? state.points + curQuestion.points
              : state.points,
        };
      case "nextQuestion":
        return {
          ...state,
          index: state.index + 1,
          answer: null,
        };
      case "prevQuestion":
        return {
          ...state,
          index: state.index - 1,
          answer: null,
        };
      case "finished":
        return {
          ...state,
          status: "finished",
          highscore:
            state.points > state.highscore ? state.points : state.highscore,
        };
      case "restart":
        return {
          ...initialState,
          rawQuestions: state.rawQuestions,
          questions: state.questions,
          status: "ready",
        };
      case "tick":
        return {
          ...state,
          secondsRemaining: state.secondsRemaining - 1,
          status: state.secondsRemaining === 0 ? "finished" : state.status,
        };
      default:
        throw new Error("Action Unknown");
    }
  }
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      difficulty,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const totalQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    fetch("http://localhost:3000/questions")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "dataReceived",
          payload: data,
        });
        dispatch({
          type: "difficultySelected",
          payload: "easy",
        });
      })
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <TheStartScreen
            questions={questions}
            totalQuestions={totalQuestions}
            dispatch={dispatch}
            difficulty={difficulty}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              totalQuestions={totalQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <Button
                dispatch={dispatch}
                answer={answer}
                totalQuestions={totalQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
        {status === "restart" && (
          <TheStartScreen
            totalQuestions={totalQuestions}
            dispatch={dispatch}
            difficulty={difficulty}
          />
        )}
      </Main>
    </div>
  );
}
