import SubmitMsg from "./SubmitMsg";

const Question = ({ questions, dispatch, index, questionLength, answer , score}) => {
  const hasAnswered = answer !== null;
  if (!questions || index >= questions.length) {
    return <SubmitMsg dispatch={dispatch} score={score} />;
  }

  const { question, correct_answer, incorrect_answers } = questions;
  const allOptions = [correct_answer, ...incorrect_answers];
  console.log(questions);

  return (
    <div>
      <h3>Question {`${index + 1} / ${questionLength}`}</h3>
      <h4>{question}</h4>

      <div className="options">
        {allOptions.map((option, index) => (
          <button
            className={`btn btn-ui ${index === answer ? "answer" : ""} ${
              hasAnswered
                ? index === allOptions.correct_answer
                  ? "correct"
                  : "wrong"
                : ""
            }  `}
            key={index}
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}  
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
      {/* <h4>
        This is a multi-choice question with {questions.correct_answer} as the
        correct answer. It has {questions.type}
      </h4> */}
    </div>
  );
};

export default Question;
