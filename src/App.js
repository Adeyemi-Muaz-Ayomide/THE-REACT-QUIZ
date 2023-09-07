import { useQuiz } from "./contexts/QuizContext";

import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import WelcomeScreen from "./components/WelcomeScreen";
import Question from "./components/Question";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import NextButton from "./components/NextButton";
import Timer from "./components/Timer";

const App = () => {
  const { status, loading } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {loading && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <WelcomeScreen />}
        {status === "active" && (
          <>
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === 'finished' && <FinishScreen />}
      </Main>
    </div>
  );
};

export default App;
