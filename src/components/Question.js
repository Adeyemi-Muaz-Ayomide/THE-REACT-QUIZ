import { useQuiz } from "../contexts/QuizContext";
import Options from "./Options";

function Question() {
  const { questions, index } = useQuiz();
  const question = questions.at(index);

  return (
    <>
      <h3>Question {`${index + 1} / ${questions.length}`}</h3>
      <div>
        <h4>{question.question}</h4>
        <Options question={question} />
      </div>
    </>
  );
}

export default Question;
