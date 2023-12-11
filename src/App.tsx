import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [answer, setAnswer] = useState("");
  const [value, setValue] = useState("");
  const [expression, setExpression] = useState("");
  const [backgroundGradient, setBackgroundGradient] = useState('');

  const et = expression.trim();

  const isOperator = (symbol: string) => {
    return /[*/+-]/.test(symbol);
  };

  const buttonPress = (symbol: string) => {
    if (symbol === "clear") {
      setAnswer("");
      setValue("");
      setExpression("0");
    } else if (symbol === "percentage") {
      if (answer === "") return;
      setValue("%");
      setAnswer((parseFloat(answer) / 100).toString());
    } else if (isOperator(symbol)) {
      setValue(symbol);
      setExpression(et + " " + symbol + " ");
    } else if (symbol === "=") {
      setValue("");
      calculate();
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setValue(symbol);
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      // split by operators and get last number
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      console.log("lastNumber :>> ", lastNumber);
      // if last number already has a decimal, don't add another
      if (lastNumber?.includes(".")) return;
      setValue(symbol);
      setExpression(expression + symbol);
    } else {
      setValue(symbol);
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };

  const calculate = () => {
    // if last char is an operator, do nothing
    if (isOperator(et.charAt(et.length - 1))) return;
    // clean the expression so that two operators in a row uses the last operator
    // 5 * - + 5 = 10
    const parts = et.split(" ");
    const newParts = [];

    // go through parts backwards
    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression) as string);
    } else {
      setAnswer(eval(newExpression) as string);
    }
    setExpression("");
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // const red = Math.floor(Math.random() * (250 - 100 + 1)) + 100;
    const green = Math.floor(Math.random() * (250 - 100 + 1)) + 100;
    const blue = Math.floor(Math.random() * (250 - 100 + 1)) + 100;

      const newGradient = `linear-gradient(rgba(0,${green},${blue}, 1),rgba(0,${green},${blue}, 0.3))`;
      setBackgroundGradient(newGradient);
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="container" style={{background: backgroundGradient }}>
        <h1>JavaScript Calculator</h1>
        <div id="calculator">
          <div id="display">
          <div id="expression">{expression}</div>
            <div id="answer">{answer}</div>
          </div>
          <div id="value">{value}</div>
          <div id="buttons">
            <button id="clear" onClick={()=> buttonPress("clear")} className="color1">C</button>
            {/* <button id="negative" onClick={()=> buttonPress("negative")} className="color1">+/-</button> */}
            <button id="percentage" onClick={()=> buttonPress("percentage")} className="color1">%</button>
            <button id="divide" onClick={()=> buttonPress("/")} className="color2">/</button>
            <button id="seven" onClick={()=> buttonPress("7")} className="color3">7</button>
            <button id="eight" onClick={()=> buttonPress("8")} className="color3">8</button>
            <button id="nine" onClick={()=> buttonPress("9")} className="color3">9</button>
            <button id="multiply" onClick={()=> buttonPress("*")} className="color2">*</button>
            <button id="four" onClick={()=> buttonPress("4")} className="color3">4</button>
            <button id="five" onClick={()=> buttonPress("5")} className="color3">5</button>
            <button id="six" onClick={()=> buttonPress("6")} className="color3">6</button>
            <button id="subtract" onClick={()=> buttonPress("-")} className="color2">-</button>
            <button id="one" onClick={()=> buttonPress("1")} className="color3">1</button>
            <button id="two" onClick={()=> buttonPress("2")} className="color3">2</button>
            <button id="three" onClick={()=> buttonPress("3")} className="color3">3</button>
            <button id="add" onClick={()=> buttonPress("+")} className="color2">+</button>
            <button id="zero" onClick={()=> buttonPress("0")} className="color3">0</button>
            <button id="decimal" onClick={()=> buttonPress(".")} className="color3">.</button>
            <button id="equals" onClick={()=> buttonPress("=")} className="color2">=</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
