import { DIRECTIONS, GAME, SNAKE_PIECE } from "./constant.js";

import Piece from "./piece.js";
import Food from "./food.js";
export default class Snake{


    constructor(context){
        this.context = context;
        //snake pieces
        //every single piece is Piece class
        this.pieces = [];

        //start default as RIGHT
        this.direction = DIRECTIONS.RIGHT;

        this.food = null;

        this.score = 0;

        this.game = null;

    }

    init(){
        //head of the snake...
        this.pieces.push(new Piece(this.context, 160, 160));
        this.pieces.push(new Piece(this.context, 144, 160));


        //random food
        this.food = new Food(this.context);

        this.food.generate();
    }

    draw(){
        this.food?.draw();

        if(!Array.isArray(this.pieces)) return;

        this.move();

        this.pieces[0].draw();

        for(let i = 1; i < this.pieces.length; i++){
            this.pieces[i].oldX = this.pieces[i].x;
            this.pieces[i].oldY = this.pieces[i].y;

            this.pieces[i].x = this.pieces[i - 1].oldX;
            this.pieces[i].y = this.pieces[i - 1].oldY;


            this.pieces[i].draw();
        }

    }

    eat(){
        this.food?.generate();
        this.score++;
        this.grow();
    }

    grow(){
        //calculate the suitable position

        const lastest = this.pieces[this.pieces.length - 1];
        const beforeLastest = this.pieces[this.pieces.length - 2];

        if(lastest.x > beforeLastest.x){
            //right
            this.pieces.push(new Piece(this.context, lastest.x + SNAKE_PIECE.WIDTH, lastest.y));
            
        }else if(lastest.x < beforeLastest.x){
            //right
            this.pieces.push(new Piece(this.context, lastest.x - SNAKE_PIECE.WIDTH, lastest.y));
            
        }
        else if(lastest.y > beforeLastest.y){
            //right
            this.pieces.push(new Piece(this.context, lastest.x, lastest.y - SNAKE_PIECE.HEIGHT));
            
        }else if(lastest.y < beforeLastest.y){
            //right
            this.pieces.push(new Piece(this.context, lastest.x,lastest.y + SNAKE_PIECE.HEIGHT));
            
        }


    }

    move(){
        const head = this.pieces[0];

        head.oldX = head.x;
        head.oldY = head.y;


        switch(this.direction){
            case DIRECTIONS.UP:
                head.y -= SNAKE_PIECE.HEIGHT;
            break;

            case DIRECTIONS.DOWN:
                head.y += SNAKE_PIECE.HEIGHT;
            break;

            case DIRECTIONS.RIGHT:
                head.x += SNAKE_PIECE.WIDTH;
            break;

            case DIRECTIONS.LEFT:
                head.x -= SNAKE_PIECE.WIDTH;
            break;
        }



        //check out
        if(head.x > GAME.WIDTH){
            head.x = 0;
        }else if(head.x < 0){
            head.x = GAME.WIDTH;
        }else if(head.y > GAME.HEIGHT){
            head.y = 0;
        }else if(head.y < 0){
            head.y = GAME.HEIGHT;
        }


        //check eat

        if(head.x === this.food?.x && head.y === this.food?.y){
            this.eat();
        }


        for(let i = 1; i < this.pieces.length; i++){
            if(head.x === this.pieces[i].x && head.y === this.pieces[i].y){
                //collision
                this.game?.finish();
            }
        }


    }


    
}