import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
} from "./redux/feautures/CounterSlice";
import { useState } from "react";

function App() {
  const dispatch = useDispatch();

  const count = useSelector((state) => state.counter.value);
  const [no, setNo] = useState("");

  return (
    <>
      <h1 style={{ fontSize: "100px" }}>{count}</h1>

      <button
        onClick={() => {
          dispatch(increment());
        }}
        className="btn"
      >
        Increment
      </button>
      <button
        onClick={() => {
          dispatch(decrement());
        }}
        className="btn"
      >
        Decrement
      </button>
      <button
        onClick={() => {
          dispatch(reset());
        }}
        className="btn"
      >
        Reset
      </button>
      <input
        type="number"
        value={no}
        onChange={(e) =>
          setNo(e.target.value)
        }
        placeholder="Enter number"
      />
      <button
        onClick={() => {
          dispatch(incrementByAmount(Number(no)));
        }}
        className="btn"
      >
        increment By Amount
      </button>
    </>
  );
}

export default App;
