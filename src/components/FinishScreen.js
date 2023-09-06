const FinishScreen = ({ dispatch, score }) => {
  return (
    <div>
      <h3>Thank you for taking the quiz!</h3>
      <p className="result">
        You scored {score} out of 20
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
