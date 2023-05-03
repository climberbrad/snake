import {
    update as updateSnake,
    draw as drawSnake,
    SNAKE_SPEED,
    snakeIntersection,
    getSnakeHead,
    getSnakeLength
} from './snake.js'
import {draw as drawFood, update as updateFood} from './food.js'
import {outsideGrid} from './grid.js'

let gameOver = false
let lastRenderTime = 0
let startTime = 0
const gameBoard = document.getElementById('game-board')


function main(currentTime) {
    if (startTime === 0) {
        startTime = currentTime
    }

    if (gameOver) {
        scoreGame(gameBoard, currentTime)
        return
    }

    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    window.requestAnimationFrame(main)

    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    lastRenderTime = currentTime

    update()
    draw()
}

window.requestAnimationFrame(main)

function scoreGame(gameBoard, currentTime) {
    const totalSeconds = Math.round(currentTime / 1000)
    const snakeLength = getSnakeLength()
    const rateOfConsumption = Math.round(snakeLength/totalSeconds)

    const corner = {x:7, y:5}

    const title = document.createElement('div')
    title.innerHTML =
        `<div>` +
            `<div style="text-align: center; padding-bottom: 24px;padding-top: 24px"><b>GAME OVER</b></div>` +
            `<div style="margin-left: 24px;padding-bottom: 2px">Snake Length: ${snakeLength}</div>` +
            `<div style="margin-left: 24px;padding-bottom: 2px">Time: ${totalSeconds}</div>` +
            `<div style="margin-left: 24px;padding-bottom: 2px">Rate: ${rateOfConsumption} per second</div>` +
        `</div>`

    const scoreBoardElement = document.createElement('div')
    scoreBoardElement.style.gridRowStart = corner.y
    scoreBoardElement.style.gridRowEnd = corner.y + 10
    scoreBoardElement.style.gridColumnStart = corner.x
    scoreBoardElement.style.gridColumnEnd= corner.x + 10
    scoreBoardElement.classList.add('score_board')
    scoreBoardElement.appendChild(title)
    gameBoard.appendChild(scoreBoardElement)
}

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}