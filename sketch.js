class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})

document.addEventListener('keypress', function(e) {
	if(e.charCode === 13){
		calculator.compute()
        calculator.updateDisplay()
	}
	else if(e.charCode === 48){
		calculator.appendNumber(0);
        calculator.updateDisplay();
	}
	else if(e.charCode === 49){
		calculator.appendNumber(1);
        calculator.updateDisplay();
	}
	else if(e.charCode === 50){
		calculator.appendNumber(2);
        calculator.updateDisplay();
	}
	else if(e.charCode === 51){
		calculator.appendNumber(3);
        calculator.updateDisplay();
	}
	else if(e.charCode === 52){
		calculator.appendNumber(4);
        calculator.updateDisplay();
	}
	else if(e.charCode === 53){
		calculator.appendNumber(5);
        calculator.updateDisplay();
	}
	else if(e.charCode === 54){
		calculator.appendNumber(6);
        calculator.updateDisplay();
	}
	else if(e.charCode === 55){
		calculator.appendNumber(7);
        calculator.updateDisplay();
	}
	else if(e.charCode === 56){
		calculator.appendNumber(8);
        calculator.updateDisplay();
	}
	else if(e.charCode === 57){
		calculator.appendNumber(9);
        calculator.updateDisplay();
	}
	else if(e.charCode === 46){
		calculator.appendNumber(".");
        calculator.updateDisplay();
	}
	else if(e.charCode === 43){
        calculator.chooseOperation("+");
        calculator.updateDisplay();
	}
	else if(e.charCode === 45){
        calculator.chooseOperation("-");
        calculator.updateDisplay();
	}
	else if(e.charCode === 42 || e.charCode === 120){
        calculator.chooseOperation("*");
        calculator.updateDisplay();
	}
	else if(e.charCode === 191 || e.charCode === 111){
        calculator.chooseOperation("÷");
        calculator.updateDisplay();
	}else{
	console.log("myau");
    }
  //alert("Key: " + e.code + ", Code: " + e.charCode);
	
});

window.addEventListener("keydown",()=>{
	const key = event.key;
    if(key === "Backspace"){
        calculator.delete();
        calculator.updateDisplay();
    }
	else if(key === "Delete"){
        calculator.clear();
        calculator.updateDisplay();
    }else{
		console.log("myau");
	}	  
})
