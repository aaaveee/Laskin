class Laskin {
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

    compute() { //compute value

    }

    updateDisplay() { // update values inside the output
        this.currentOperaTextElement.innerText = this.currentOpera
        this.previousOperaTextElement.innerText = this.previousOpera
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperaTextElement = document.querySelector('[data-previous-opera]')
const currentOperaTextElement = document.querySelector('[data-current-opera]')

const laskin = new Laskin(previousOperaTextElement, currentOperaTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        laskin.appendNumber(button.innerText)
        laskin.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        laskin.chooseOperation(button.innerText)
        laskin.updateDisplay()
    })
})