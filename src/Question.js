import SubmitMsg from "./SubmitMsg";

const Question = ({ questions, dispatch, index }) => {
  if (!questions || index >= questions.length) {
    <SubmitMsg />;
  }
  // if (index === questions.length - 1) {
  //     // Display the Submit button on the last question
  //     return (
  //         <div>
  //             <h4>{questions[index].question}</h4>
  //             <div className="options">
  //                 {questions[index].options.map((option, optionIndex) => (
  //                     <button className="btn btn-ui" key={optionIndex}>
  //                         {option}
  //                     </button>
  //                 ))}
  //             </div>
  //             <button
  //                 className="btn btn-ui"
  //                 onClick={() => {
  //                     dispatch({ type: "SubmitQuiz" });
  //                     setSubmitted(true);
  //                 }}
  //             >
  //                 Submit
  //             </button>
  //         </div>
  //     );
  // }

  const { question, correct_answer, incorrect_answers } = questions;
  const allOptions = [correct_answer, ...incorrect_answers];
  console.log(questions);

  if (!questions || index >= questions.length) {
    return <button>Submit</button>;
  }

  //   if (questions.length === 20) {
  //     // return <button className="btn btn-ui">Submit</button>;
  //     return `Thank you for taking the quiz!`
  //   }

  return (
    <div>
      <h4>{question}</h4>
      <h3>{}</h3>

      <div className="options">
        {allOptions.map((option, index) => (
          <button className="btn btn-ui" key={index}>
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
