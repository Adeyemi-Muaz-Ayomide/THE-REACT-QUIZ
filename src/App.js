import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import WelcomeScreen from "./components/WelcomeScreen";
import Question from "./components/Question";
import { useQuiz } from "./contexts/QuizContext";
import FinishScreen from "./components/FinishScreen";

const App = () => {
  const { status, loading } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {loading && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <WelcomeScreen />}
        {status === "active" && <>
          <Question />
          
        </>}
        {status === 'finished' && <FinishScreen />}
      </Main>
    </div>
  );
};

export default App;
