import {GAME,SNAKE_PIECE, COLORS} from "./constant.js";


export default class Piece{



    constructor(context, x, y){
        this.context = context;

        this.oldX = -1;
        this.oldY = -1;

        this.x = x;
        this.y = y;


    }


    draw(){
        this.context.beginPath();

        this.context.strokeStyle = COLORS.WHITE;
        this.context.stroke();

        this.context.fillStyle = COLORS.WHITE;
        this.context.fillRect(this.x, this.y, SNAKE_PIECE.WIDTH, SNAKE_PIECE.HEIGHT);
    }
}