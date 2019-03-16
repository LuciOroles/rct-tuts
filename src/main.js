import React, { useState } from "react";
import ReactDOM from "react-dom";
// import Counter from "./Counter";

function logEvt(evt) {
  console.log(evt);
}

function ReactXx(props ) {
  return <div>React ... {props.message} </div>
}

function Button(props) {
  function handleClick () {
    return props.onClickFunction(props.increment);
  }
  return (
    <button onClick={handleClick}>
      | + {props.increment} |
  </button>
  );
}
//React.createElement(Counter)

function App() {
  const [counter, setCounter] = useState(0);
  const incrementCounter = (incrementV)=> {setCounter(counter + incrementV);};
  return (
    <div>
      <Button onClickFunction={incrementCounter} increment={1}/>
      <Button onClickFunction={incrementCounter} increment={5}/>
      <Button onClickFunction={incrementCounter} increment={10}/>
      <Button onClickFunction={incrementCounter} increment={100}/>
      <ReactXx message={counter} />
    </div>
  )
}

document.addEventListener("DOMContentLoaded", function () {
  console.log('---------------');
  ReactDOM.render(
   <App /> ,
    document.getElementById("mount")
  );
});
