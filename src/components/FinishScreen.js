import { useQuiz } from "../contexts/QuizContext";

const FinishScreen = () => {
  const { dispatch, score } = useQuiz();

  let emoji;
  if (score === 15) emoji = "🥇";
  if (score >= 10 && score < 15) emoji = "🎉";
  if (score < 10 && score >= 5) emoji = "🤨";
  if (score < 5) emoji = "🤦‍♂️";

  return (
    <div>
      <h3>Thank you for taking the quiz!</h3>
      <p className="result">
        <span>{emoji}</span>
        You scored {score} out of 15
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </div>
  );
};

export default FinishScreen;
