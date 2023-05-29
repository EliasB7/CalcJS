let runningTotal = 0;
let buffer = "0";
let prevOperator = null;
let isNewCalculation = false;

const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      prevOperator = null;
      isNewCalculation = false;
      break;

    case "=":
      if (prevOperator === null) {
        return;
      }
      flushOperation(parseFloat(buffer));
      prevOperator = null;
      isNewCalculation = true;
      break;

    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.slice(0, -1);
      }
      break;

    case "+":
    case "−":
    case "/":
    case "×":
      handleMath(symbol);
      break;

    case ".":
      handleDecimal();
      break;
  }
}

function handleMath(symbol) {
  if (buffer === "0") {
    return;
  }

  const floatBuffer = parseFloat(buffer);

  if (prevOperator === "+") {
    runningTotal += floatBuffer;
  } else if (prevOperator === "−") {
    runningTotal -= floatBuffer;
  } else if (prevOperator === "/") {
    runningTotal /= floatBuffer;
  } else if (prevOperator === "×") {
    runningTotal *= floatBuffer;
  } else {
    runningTotal = floatBuffer;
  }

  prevOperator = symbol;
  buffer = "0";
}

function flushOperation(floatBuffer) {
  if (prevOperator === "+") {
    runningTotal += floatBuffer;
  } else if (prevOperator === "−") {
    runningTotal -= floatBuffer;
  } else if (prevOperator === "/") {
    runningTotal /= floatBuffer;
  } else if (prevOperator === "×") {
    runningTotal *= floatBuffer;
  }

  buffer = runningTotal.toString();
}

function handleNumber(numberString) {
  if (buffer.length < 10) {
    if (isNewCalculation || buffer === "0") {
      buffer = numberString;
      isNewCalculation = false;
    } else {
      buffer += numberString;
    }
  }
}

function handleDecimal() {
  if (!buffer.includes(".")) {
    buffer += ".";
  }
}

function init() {
  const buttons = document.querySelectorAll(".calc-button");
  buttons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
  });

  document.addEventListener("keydown", function (event) {
    const key = event.key;
    if (key === "Enter") {
      buttonClick("=");
    } else if (
      !isNaN(key) ||
      key === "." ||
      key === "+" ||
      key === "-" ||
      key === "*" ||
      key === "/"
    ) {
      buttonClick(key);
    } else if (key === "Backspace") {
      buttonClick("←");
    } else if (key === "Escape") {
      buttonClick("C");
    }
  });
}

init();
