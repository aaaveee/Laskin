class Calculator {
    constructor(previousOperaTextElement, currentOperaTextElement) {
        this.previousOperaTextElement = previousOperaTextElement
        this.currentOperaTextElement = currentOperaTextElement
        this.clear()
    }

    clear() { // clear all operation
        this.currentOpera = ''
        this.previousOpera = ''
        this.operation = undefined
    }

    delete() { // delete operation
        this.currentOpera = this.currentOpera.toString().slice(0, -1) // changes the current operand to a string and slices the last digit from it
    }

    appendNumber(number) { // when user clicks a number, adds it to the screen
        if (number === '.' && this.currentOpera.includes('.')) return // does not allow more than one period per number
        this.currentOpera = this.currentOpera.toString() + number.toString()
    }

    chooseOperation(operation) { // when user clicks on an operation
        if (this.currentOpera === '') return
        if (this.previousOpera !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOpera = this.currentOpera
        this.currentOpera = ''
    }

    compute() { // compute value
        let computation // result of compute function
        const prev = parseFloat(this.previousOpera) // number version of previous operand
        const current = parseFloat(this.currentOpera) // number version of current operand
        if (isNaN(prev) || isNaN(current)) return // if no previous or current value, cancel function
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
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOpera = computation
        this.operation = undefined
        this.previousOpera = ''
    }

    getDisplayNumber(number) { // formats commas to large numbers
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1] // handels decimal integers
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

    updateDisplay() { // update values inside the output
        this.currentOperaTextElement.innerText = 
            this.getDisplayNumber(this.currentOpera)
        if (this.operation != null) {
            this.previousOperaTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOpera)} ${this.operation}`
        } else {
            this.previousOperaTextElement.innerText = ''
        } 
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperaTextElement = document.querySelector('[data-previous-opera]')
const currentOperaTextElement = document.querySelector('[data-current-opera]')

const calculator = new Calculator(previousOperaTextElement, currentOperaTextElement)

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