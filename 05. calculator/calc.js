function add(num1, num2) {
    return Number(num1) + Number(num2);
}

function subtract(num1, num2) {
    return Number(num1) - Number(num2);
}

function multiply(num1, num2) {
    return Number(num1) * Number(num2);
}

function divide(num1, num2) {
    return num2 == "0" ? "ERorRRoR! Div0 :(" : Number(num1) / Number(num2);
}

function operate(num1, operator, num2) {
    let result = 0;
    switch(operator) {
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "*":
            result = multiply(num1, num2);
            break;
        case "/":
            result = divide(num1, num2);
            break;
    }
    return result;
}

function numberInput(e){
    if (newNumInput) {
        newNumInput = false;
        displayUpdate("", displaySecound);
    }

    const input = e.target.value || e.key;

    const firstSecondDot = num1.toString().includes(".") && input == "." && !whichNum;
    const secondSecondDot = num2.toString().includes(".") && input == "." && whichNum;

    if (!firstSecondDot && !secondSecondDot) {
        whichNum ? num2 += input : num1 += input;
        displayUpdate(input, displaySecound, 1);
    }
}

function operationInput(e) {
    operator = e.target.value || e.key;
    if (operator != "=" && !newNumInput) whichNum = !whichNum;
    newNumInput = true;
    let result;

    //after "=" if user click next operation
    if (num1 === "" && num2 === "" && operator != "=") {
        num1 = displaySecound.textContent;
        whichNum = 1;
    }

    if (num1 != "" && num2 == "" && operator != "=") {
        whichNum = 1;
    }

    //1 + 2 -3 (without "=")
    if (num1 != "" && num2 != "" && operator != "=") {
        result = operate(num1, operatorLast, num2);
        [num1, num2] = [result, ""];
        displayUpdate(result, displaySecound);
        whichNum = !whichNum;
    }

    if (operator == "=") {
        if (num1 == "" || num2 == "") {
            whichNum = 0;
            num1 = "";
            num2 = "";
            displayUpdate("0", displaySecound);
        } else {
            result = operate(num1, operatorLast, num2);
            displayUpdate(result, displaySecound);
            [num1, num2] = ["", ""];
            whichNum = !whichNum
        }
        
    } else {
        operatorLast = operator;
    }
}


function debug() {
    debugField.innerHTML = `num1: ${num1}<br>
                            num2: ${num2}<br>
                            operatorLast: ${operatorLast}<br>
                            operator: ${operator}<br>
                            newNumInput: ${newNumInput}<br>
                            whichNum: ${whichNum ? "num2" : "num1"}`;
}

function funcClear() {
    [num1, num2] = ["", ""];
    displayUpdate(0, displaySecound);
    displayUpdate("", displayFirst);
}

function funcsign() {
    if (num1 === "" && num2 === "") num1 = displaySecound.textContent;
    
    if (whichNum) {
        num2 = -num2;
        displayUpdate(num2, displaySecound);
    } else {
        num1 = -num1;
        displayUpdate(num1, displaySecound);
    }
}

function funcPercent() {
    if (num1 === "" && num2 === "") num1 = displaySecound.textContent;

    if (whichNum) {
        num2 = num2 / 100;
        displayUpdate(num2, displaySecound);
    } else {
        num1 = num1 / 100;
        displayUpdate(num1, displaySecound);
    }
}

function funcBackspace () {
    let newValue;
    if (whichNum) {
        newValue = num2.slice(0, num2.length-1);
        num2 = newValue;
        if (num2 == "") {
            newValue = 0;
            newNumInput = true;
        }
    } else {
        newValue = num1.slice(0, num1.length-1);
        num1 = newValue;
        if (num1 == "") {
            newValue = 0;
            newNumInput = true;
        }
    }
    displayUpdate(newValue, displaySecound);
}

function hoverOnNum(e) {
    e.target.classList.add("hoverNum");
}

function hoverOffNum(e) {
    e.target.classList.remove("hoverNum");
}

function hoverOnOperator(e) {
    e.target.classList.add("hoverOperator");
}

function hoverOffOperator(e) {
    e.target.classList.remove("hoverOperator");
}

function hoverOnFunc(e) {
    e.target.classList.add("hoverFunc");
}

function hoverOffFunc(e) {
    e.target.classList.remove("hoverFunc");
}

function displayUpdate (value, display, extend = 0) {
    let totalValue;
    extend ? totalValue = display.textContent + value : totalValue = value;
    
    totalValue = totalValue.toString();
    if (totalValue.length > 18) totalValue = totalValue.slice(0, 18);
    display.textContent = totalValue;
}

let num1 = "";
let num2 = "";
let operatorLast;
let operator;
let newNumInput = true;
let whichNum = 0;

const buttonsNumbers = document.querySelectorAll(".number");
const buttonOparators = document.querySelectorAll('.operator');
const buttonFunc = document.querySelectorAll('.func');
const displaySecound = document.querySelector('#displaySecond');
const displayFirst = document.querySelector('#displayFirst');
const debugField = document.querySelector('#debug');
const clearButton = document.querySelector('#AC');
const signButton = document.querySelector('#sign');
const percentButton = document.querySelector('#percent');


buttonsNumbers.forEach(button => {
    button.addEventListener("click", numberInput);
    button.addEventListener("mouseover", hoverOnNum);
    button.addEventListener("mouseout", hoverOffNum);
});

buttonOparators.forEach(button => {
    button.addEventListener("click", operationInput);
    button.addEventListener("mouseenter", hoverOnOperator);
    button.addEventListener("mouseleave", hoverOffOperator);
});

buttonFunc.forEach(button => {
    button.addEventListener("mouseenter", hoverOnFunc);
    button.addEventListener("mouseleave", hoverOffFunc);
});

clearButton.addEventListener('click', funcClear);
signButton.addEventListener('click', funcsign);
percentButton.addEventListener('click', funcPercent);

document.addEventListener('keyup', (e) => {
    switch(e.key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
        case ".":
            numberInput(e);
            break;
        case "/":
        case "*":
        case "-":
        case "+":
        case "=":
            operationInput(e);
            break;
        case "%":
            funcPercent();
            break;
        case "Delete":
            funcClear();
            break;
        case "Backspace":
            funcBackspace();
            break;

    }
});



// const intervalId = window.setInterval(debug, 100);