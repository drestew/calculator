// calculator screen
const input = document.querySelector('.calc-input')
const equation = document.querySelector('.equation')

// calculator buttons
const off = document.querySelector('.off')
const on = document.querySelector('.on')
const backspace = document.querySelector('.backspace')
const clear = document.querySelector('.clear')
const squared = document.querySelector('.squared')
const zero = document.querySelector('.zero')
const one = document.querySelector('.one')
const two = document.querySelector('.two')
const three = document.querySelector('.three')
const four = document.querySelector('.four')
const five = document.querySelector('.five')
const six = document.querySelector('.six')
const seven = document.querySelector('.seven')
const eight = document.querySelector('.eight')
const nine = document.querySelector('.nine')
const decimal = document.querySelector('.decimal')
const equal = document.querySelector('.equal')
const add = document.querySelector('.add')
const subtract = document.querySelector('.subtract')
const multiply = document.querySelector('.multiply')
const divide = document.querySelector('.divide')
const math = document.querySelectorAll('.math')

let total = 0
let curNumber = []
let equationArr = []
let screenEquationArr = []
let operatorArr = []

// show number in the display
const mathArr = Array.from(math)
mathArr.forEach((mathButton) =>
    mathButton.addEventListener('click', function () {
        if (!isNaN(mathButton.textContent) || mathButton.textContent === '.') {
            if (input.textContent === '0' || curNumber.length < 1) {
                input.textContent = mathButton.textContent
            } else {
                input.textContent = input.textContent + mathButton.textContent
            }
        }

        if (
            mathButton.textContent == Number(mathButton.textContent) ||
            mathButton.textContent === '.'
        ) {
            curNumber.push(mathButton.textContent)
            screenEquationArr.push(mathButton.textContent)
        }

        if (mathButton.classList.contains('operator')) {
            if (mathButton.classList.contains('squared')) {
                total = Number(input.textContent) ** 2
                equationArr.push(total)
                input.textContent = total
            } else if (mathButton.classList.contains('square-root')) {
                total = Math.sqrt(Number(input.textContent))
                equationArr.push(total)
                input.textContent = total
            } else {
                operatorArr.push(mathButton.classList[2])
                console.log(operatorArr)
                equationArr.push(curNumber.join(''))
                if (screenEquationArr.slice(-1) == '=') {
                    console.log(screenEquationArr.slice(-1))
                    screenEquationArr.pop()
                }
                screenEquationArr.push(mathButton.textContent)
                equation.textContent = screenEquationArr.join(' ')
            }
            curNumber = []
        }

        if (mathButton.classList.contains('equal')) {
            equationArr.push(curNumber.join(''))
            screenEquationArr.push('=')
            equation.textContent = screenEquationArr.join(' ')
            curNumber = []
            total = equationArr[0]
            equationArr = equationArr.filter((num) => num !== '')
            operatorArr.forEach(function (operator, index) {
                if (operator === 'add') {
                    total = Number(total) + Number(equationArr[index + 1])
                } else if (operator === 'subtract') {
                    total = Number(total) - Number(equationArr[index + 1])
                } else if (operator === 'multiply') {
                    total = Number(total) * Number(equationArr[index + 1])
                } else if (operator === 'divide') {
                    total = Number(total) / Number(equationArr[index + 1])
                }
            })
            input.textContent = total
        }
    })
)

backspace.addEventListener('click', function () {
    curNumber = curNumber.slice(0, curNumber.length - 1)
    input.textContent = curNumber.join('')
})

// set display to zero
clear.addEventListener('click', function () {
    equationArr = []
    screenEquationArr = []
    curNumber = []
    operatorArr = []
    total = 0
    input.textContent = '0'
    equation.textContent = ''
})

off.addEventListener('click', function () {
    input.classList.add('hidden')
})

on.addEventListener('click', function () {
    input.classList.remove('hidden')
    equationArr = []
    screenEquationArr = []
    curNumber = []
    operatorArr = []
    total = 0
    input.textContent = '0'
    equation.textContent = ''
})
