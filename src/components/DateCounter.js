import { useState, useMemo, useCallback } from "react";

function DateCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const date = useMemo(() => {
    const d = new Date("june 21 2027");
    d.setDate(d.getDate() + count);
    return d;
  }, [count]);

  const dec = useCallback(() => {
    setCount((count) => count - step);
  }, [step]);

  const inc = useCallback(() => {
    setCount((count) => count + step);
  }, [step]);

  const defineCount = useCallback((e) => {
    setCount(Number(e.target.value));
  }, []);

  const defineStep = useCallback((e) => {
    setStep(Number(e.target.value));
  }, []);

  const reset = useCallback(() => {
    setCount(0);
    setStep(1);
  }, []);

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
