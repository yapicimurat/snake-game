//import files
import {GAME, GAME_STATE, KEYS, COLORS, DIRECTIONS} from "./constant.js";

//classes
import Snake from "./snake.js";

//get canvas
const gameArea = document.getElementById("gameArea");

//set gameArea size

gameArea.width = GAME.WIDTH;
gameArea.height = GAME.HEIGHT;

//get 2d context
const context = gameArea.getContext("2d");



class Game{

    constructor(snake){
        this.snake = snake;
        this.gameState = GAME_STATE.PENDING;
    }


    keyDown(e){
        switch(e.keyCode){
            case KEYS.ENTER:
                this.start();
                break;
            case KEYS.PAUSE:
                this.pause();
                break;


            case KEYS.UP:
            case KEYS.W:
                this.snake.direction = DIRECTIONS.UP;
            break;


            case KEYS.DOWN:
            case KEYS.S:
                this.snake.direction = DIRECTIONS.DOWN;
            break;

            case KEYS.RIGHT:
            case KEYS.D:
                this.snake.direction = DIRECTIONS.RIGHT;
            break;

            case KEYS.LEFT:
            case KEYS.A:
                this.snake.direction = DIRECTIONS.LEFT;
            break;
        }
    }


    draw(){
        switch(this.gameState){
            case GAME_STATE.PENDING:
                this.drawText("PRESS ENTER TO START GAME", "20px Arial", 325, GAME.HEIGHT / 2);
            break;

            case GAME_STATE.STARTED:
                //show game informations...
                this.drawText(`Score: ${this.snake.score}`, "12px Arial", GAME.WIDTH - 50, 25);
                this.snake.draw();

            break;

            case GAME_STATE.FINISHED: 
            this.drawText("GAME OVER", "20px Arial", 325, GAME.HEIGHT / 2);
            break;

            case GAME_STATE.PAUSED:
                this.drawText("PRESS P TO CONTINUE GAME", "20px Arial", 325, GAME.HEIGHT / 2);
            break;
        }


    }

    drawText(text, font, x, y){
        context.font = font;
        context.fillStyle = COLORS.WHITE;
        context.textAlign = "center";
        context.fillText(text, x, y);
    }


    clearGame(){
        //TODO: AFTERR...
    }

    start(){
        this.gameState = GAME_STATE.STARTED;
        this.snake.init();
    }

    finish(){
        this.gameState = GAME_STATE.FINISHED;
    }

    pause(){
        if(this.gameState === GAME_STATE.PAUSED)
            this.gameState = GAME_STATE.STARTED;
        else
            this.gameState = GAME_STATE.PAUSED;
    }




}


const snake = new Snake(context);

const game = new Game(snake);

snake.game = game;




window.addEventListener("keydown", (e) => {
    game.keyDown(e);
});

setInterval(() => {
    context.clearRect(0, 0, GAME.WIDTH, GAME.HEIGHT);

    game.draw();

}, 1000 / 20);
