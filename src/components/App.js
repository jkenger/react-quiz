import { useContext, useEffect, useReducer, useRef } from "react";
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
import { useQuiz } from "../contexts/QuizContext";

export default function App() {
  const {
    status,
    questions,
    totalQuestions,
    dispatch,
    difficulty,
    index,
    points,
    maxPossiblePoints,
    answer,
    secondsRemaining,
    highscore,
  } = useQuiz();
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
