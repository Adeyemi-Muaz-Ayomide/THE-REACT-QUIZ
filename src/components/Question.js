import FinishScreen from "./FinishScreen";

const Question = ({
  questions,
  dispatch,
  index,
  questionLength,
  answer,
  score,
  // hasAnswered
}) => {
  const hasAnswered = answer !== null;

  console.log(questions);

  if (!questions || index >= questions.length) {
    return <FinishScreen dispatch={dispatch} score={score} />;
  }


  const { question, correct_answer, incorrect_answers } = questions;
  const allOptions = [correct_answer, ...incorrect_answers];

  const shuffledOptions = allOptions
    .slice()
    .sort(() => Math.random() - 0.5);

  const handleAnswer = (optionIndex) => {
    if (!hasAnswered) {
      if (optionIndex === answer) {
        dispatch({ type: "newAnswer", payload: optionIndex });
        dispatch({ type: "incrementScore" });
      } else {
        dispatch({ type: "newAnswer", payload: optionIndex });
      }
    }
  };

  return (
    <div>
      <h3>Question {`${index + 1} / ${questionLength}`}</h3>
      <h4>{question}</h4>

      <div className="options">
        {shuffledOptions.map((option, optionIndex) => (
          <button
            className={`btn btn-option ${optionIndex === answer ? "answer" : ""
              } ${hasAnswered
                ? option === correct_answer
                  ? "correct"
                  : "wrong"
                : ""
              }`}
            key={optionIndex}
            disabled={hasAnswered}
            onClick={() =>
              handleAnswer(optionIndex)
              // hasAnswered ? null : handleAnswer(optionIndex)
              // dispatch({ type: "newAnswer", payload: optionIndex })
            }
          >
            {option}
          </button>
        ))}
      </div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "QuestionNext" })}
      >
        Next
      </button>
    </div>
  );
};

export default Question;
