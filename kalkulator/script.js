// define element
const numbers = document.querySelectorAll('.number');
const wholeCalc = document.querySelector('.calculator');
const calcScreen = document.querySelector('.calculator-screen');
const operators = document.querySelectorAll('.operator');
const equalSign = document.querySelector('.equal-sign');
const clearBtn = document.querySelector('.all-clear');
const decimal = document.querySelector('.decimal');
const percen = document.querySelector('.percentage');
const reset = document.querySelector('.reset');

// define variabel
let prevNumber = '';
let calcOperation = '';
let currentNum = '0';

// define function
const updateScreen = (number) => {
	calcScreen.value = number;
};

const inputNumber = (number) => {
	if (currentNum === '0') {
		currentNum = number;
	} else {
		currentNum += number;
	}
};

const inputOperator = (operator) => {
	if (calcOperation === '') {
		prevNumber = currentNum;
	}
	calcOperation = operator;
	currentNum = '0';
};

const calculate = () => {
	let result = '';
	switch (calcOperation) {
		case '+':
			result = parseFloat(prevNumber) + parseFloat(currentNum);
			break;
		case '-':
			result = parseFloat(prevNumber) - parseFloat(currentNum);
			break;
		case '*':
			result = parseFloat(prevNumber) * parseFloat(currentNum);
			break;
		case '/':
			result = parseFloat(prevNumber) / parseFloat(currentNum);
			break;
		default:
			break;
	}

	if (!isFinite(result)) {
		if (isNaN(result)) {
			// If result is not a number; set off by, eg, double-clicking operators
			result = 'You broke it!';
		} else {
			// If result is infinity, set off by dividing by zero
			result = 'OOPS!!';
			wholeCalc.classList.add('broken'); // Break calculator
			reset.classList.remove('hide'); // And show reset button
			reset.classList.add('show'); // And show reset button
		}
	}

	currentNum = result;
	calcOperation = '';
};

const allClear = () => {
	prevNumber = '';
	calcOperation = '';
	currentNum = '0';
};

const inputDecimal = (dot) => {
	if (currentNum.includes('.')) {
		return;
	}
	currentNum += dot;
};

// eventListener
numbers.forEach((number) => {
	number.addEventListener('click', (event) => {
		inputNumber(event.target.value);
		updateScreen(currentNum);
	});
});

operators.forEach((operator) => {
	operator.addEventListener('click', (event) => {
		inputOperator(event.target.value);
	});
});

equalSign.addEventListener('click', () => {
	calculate();
	updateScreen(currentNum);
});

clearBtn.addEventListener('click', () => {
	allClear();
	updateScreen(currentNum);
});

decimal.addEventListener('click', (event) => {
	inputDecimal(event.target.value);
	updateScreen(currentNum);
});

percen.addEventListener('click', () => {
	currentNum = parseFloat(currentNum) / 100;
	updateScreen(currentNum);
});

reset.addEventListener('click', () => {
	wholeCalc.classList.remove('broken');
	reset.classList.remove('show');
	reset.classList.add('hide');
	allClear();
	updateScreen(currentNum);
});