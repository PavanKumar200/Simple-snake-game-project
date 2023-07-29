const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText =document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetbutton");

const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;

const snakeColor = "#4d0404";
const boardColor = "#02fa17"
const snakeBorder = "#02fa17";
const foodColor = "red";
const unitsize =25;


let running = false;
let foodx;
let foody;
let xVelocity = unitsize;
let yVelocity = 0;
let score = 0 ;
let snake = [
    {x:unitsize*4,y:0},
    {x:unitsize*3,y:0},
    {x:unitsize*2,y:0},
    {x:unitsize,y:0},
    {x:0,y:0}
]

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click",resetGame);

startGame();

function startGame(){
    running =true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextick();
};
function nextick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            movesnake();
            drawSnake();
            checkGameover();
            nextick();
        },100)
    }
    else{
        displayGameover();
    }


};
function clearBoard(){
    ctx.fillStyle = boardColor;
    ctx.fillRect(0,0,gameWidth,gameHeight);
};
function createFood(){
    function randFood(min,max){
        const randNum = Math.round((Math.random()*(max-min)+min)/unitsize)*unitsize;
        return randNum;
    }
    foodx = randFood(0,gameWidth-unitsize);
    foody  = randFood(0,gameWidth-unitsize);
};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodx,foody,unitsize,unitsize)
};
function movesnake(){
        const head ={x:snake[0].x+xVelocity,
                     y:snake[0].y+yVelocity};

        snake.unshift(head);

        if (snake[0].x == foodx && snake[0].y ==foody) {
            score++;
            scoreText.textContent = score;
            createFood();
            
        } else {
            snake.pop();
            
        }
};
function drawSnake(){
        ctx.fillStyle =snakeColor;
        ctx.strokeStyle = snakeBorder;

        snake.forEach(snakePart => {
            ctx.fillRect(snakePart.x,snakePart.y,unitsize,unitsize);
            ctx.strokeRect(snakePart.x,snakePart.y,unitsize,unitsize);
        })
};
function changeDirection(event){ 
    let keyPressed = event.keyCode;

    const UP = 38;
    const DOWN =40;
    const LEFT = 37;
    const RIGHT =39;

    const goingUP = (yVelocity == -unitsize);
    const goingDown =(yVelocity == unitsize);
    const goingLeft = (xVelocity== -unitsize);
    const goingRight = (xVelocity == unitsize);

    switch (true) {
        case (keyPressed == LEFT && !goingRight):
        xVelocity = -unitsize;
        yVelocity = 0;
        break;
        case(keyPressed == RIGHT && !goingLeft):
        xVelocity = unitsize;
        yVelocity = 0;
        break;
        case(keyPressed == UP && !goingDown):
        yVelocity = -unitsize;
        xVelocity=0;
        break;
        case(keyPressed == DOWN && !goingUP):
        yVelocity = unitsize;
        xVelocity = 0;
        break;
    }

};
function checkGameover(){
    switch(true){
        case(snake[0].x < 0):
        running =false;
        break;
        case(snake[0].x >= gameWidth):
        running= false;
        break;
        case(snake[0].y < 0):
        running = false;
        break;
        case(snake[0].y >= gameHeight):
        running =false;
        break;
    }
    for(let i =1;i< snake.length;i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running=false;
        }
    }

};
function displayGameover(){
        ctx.font = "60px cursive";
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.fillText("!Game Over:)", gameHeight / 2, gameWidth / 2 );
        running = false;
};
function resetGame(){
    score =0;
    score.textContent = score;
    xVelocity =unitsize;
    yVelocity =0;
    snake= [
        {x:unitsize*3,y:0},
        {x:unitsize*2,y:0},
        {x:unitsize,y:0},
        {x:0,y:0}
    ];
    startGame();
};