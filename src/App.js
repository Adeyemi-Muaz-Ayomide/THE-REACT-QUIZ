import { useEffect, useReducer, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Welcome from "./Welcome";
import Question from "./Question";

const initialState = { questions: [], status: "loading", index: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "QuestionStart":
      return { ...state, status: "active" };
    case "QuestionNext":
      return { ...state, index: state.index + 1 };
    case 'SubmitQuiz':
      return { ...state, status : 'finished' }

    default:
      break;
  }
};
const App = () => {
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [loading, setLoading] = useState(true);

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
    <div className="app">
      <Header />
      <Main>
        {loading && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" || status === "finished" ? (
          <Welcome questions={questions} dispatch={dispatch} />
        ) : null}
        {status === "active" && (
          <Question
            questions={questions[index]}
            dispatch={dispatch}
            index={index}
          />
        )}
      </Main>

      {/* <div>
        {data && (
          <ul>
            {data.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        )}
      </div> */}
    </div>
  );
};

export default App;
