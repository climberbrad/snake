import {update as updateSnake, draw as drawSnake, SNAKE_SPEED, snakeIntersection, getSnakeHead} from './snake.js'
import {draw as drawFood, update as updateFood} from './food.js'
import { outsideGrid } from './grid.js'

let gameOver = false
let lastRenderTime = 0
const gameBoard = document.getElementById('game-board')

function main(currentTime) {

    if (gameOver) {
        if(confirm('Game Over! -- you lost. Press OK to restart')) {
            window.location = '/'
        }
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