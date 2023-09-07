import { useQuiz } from "../contexts/QuizContext";

const NextButton = () => {
  const { dispatch, answer, numQuestions, index } = useQuiz();

  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "QuestionNext" })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "SubmitQuiz" })}
      >
        Finish
      </button>
    );
};

export default NextButton;
