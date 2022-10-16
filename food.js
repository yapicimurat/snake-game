import {GAME, SNAKE_PIECE, COLORS} from "./constant.js";

export default class Food{


    constructor(context){
        this.context = context;
        this.x = -1;
        this.y = -1;
    }

    generate(){

        const randomX = this.getRandom(0, GAME.WIDTH);
        const randomY = this.getRandom(0, GAME.HEIGHT);

        const calcX = randomX - (randomX % SNAKE_PIECE.WIDTH);
        const calcY = randomY - (randomY % SNAKE_PIECE.HEIGHT);

        this.x = calcX;
        this.y = calcY;
    }

    draw(){
        this.context.strokeStyle = COLORS.WHITE;
        this.context.stroke();
        this.context.fillStyle = COLORS.WHITE;
        this.context.fillRect(this.x, this.y, SNAKE_PIECE.WIDTH, SNAKE_PIECE.HEIGHT);
    }


    getRandom(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}