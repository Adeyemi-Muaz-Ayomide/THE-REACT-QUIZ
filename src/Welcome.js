const Welcome = ({questions}) => {
  return (
    <div>
      <h2>Welcome to the React Quiz!</h2>
      <p>{questions.length} questions to test your React mastery</p>
      <button className="button">Let's start!</button>
    </div>
  );
};

export default Welcome;
