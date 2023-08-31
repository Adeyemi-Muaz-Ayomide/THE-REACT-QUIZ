import { useEffect, useReducer, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Welcome from "./Welcome";

const initialState = { questions: [], status: "loading" };

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };

    default:
      break;
  }
};
const App = () => {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
  // const [data, setData] = useState(null);
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
        {status === "ready" && <Welcome questions={questions} />}
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
