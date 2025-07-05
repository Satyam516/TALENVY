const display = document.getElementById("display");
let expression = "";

function handleClick(value) {
  if (!isNaN(value) || value === ".") {
    expression += value;
    updateDisplay(expression);
  } else if (value === "C") {
    expression = "";
    updateDisplay("");
  } else if (value === "DEL") {
    expression = expression.slice(0, -1);
    updateDisplay(expression);
  } else if (value === "=") {
    const result = evaluateExpression(expression);
    updateDisplay(result);
    expression = result.toString();
  } else {
    if (expression !== "" && !isOperator(expression.slice(-1))) {
      expression += ` ${value} `;
      updateDisplay(expression);
    }
  }
}

function updateDisplay(val) {
  display.value = val;
}

function isOperator(char) {
  return ["+", "-", "*", "/", "%"].includes(char);
}

function evaluateExpression(expr) {
  const tokens = expr.split(" ");
  let result = parseFloat(tokens[0]);

  for (let i = 1; i < tokens.length; i += 2) {
    let operator = tokens[i];
    let nextNumber = parseFloat(tokens[i + 1]);

    if (isNaN(nextNumber)) return "Error";

    if (operator === "+") result += nextNumber;
    else if (operator === "-") result -= nextNumber;
    else if (operator === "*") result *= nextNumber;
    else if (operator === "/") {
      if (nextNumber === 0) return "Error";
      result /= nextNumber;
    } else if (operator === "%") result %= nextNumber;
    else return "Invalid";
  }

  return result;
}

const buttons = document.querySelectorAll(".btn");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", () => {
    handleClick(buttons[i].textContent);
  });
}
