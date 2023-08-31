const SubmitMsg = () => {
  return (
    <div>
      <h3>Thank you for taking the quiz!</h3>
      <button
        className="btn btn-ui"
        onClick={() => console.log("Thank you message clicked")}
      >
        Return to Home
      </button>
    </div>
  );
};

export default SubmitMsg;
