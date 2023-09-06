import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;
// 'loading', 'error', 'ready', 'active', 'finished'
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  score: 0,
  secondsRemaining: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "QuestionStart":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "QuestionNext":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === question.correctOption
            ? state.score + question.score
            : state.score,
      };
    case "SubmitQuiz":
      return {
        ...state,
        status: "finished",
      };
    case "restart":
      return {
        ...initialState,
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
      return state;
  }
};

const QuizProvider = ({ children }) => {
  const [
    { questions, status, index, answer, score, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);
  const numQuestions = questions.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=20&category=9&difficulty=medium"
        );
        const jsonData = await response.json();
        dispatch({ type: "dataReceived", payload: jsonData.results });
        setLoading(false);
      } catch (error) {
        dispatch({ type: "dataFailed", payload: error });
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        score,
        secondsRemaining,
        numQuestions,
        loading,

        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");
  return context;
};

export { QuizProvider, useQuiz };
