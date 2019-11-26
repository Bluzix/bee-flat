// Is this the first keypress to close the Start Menu?
let firstKey = true;

let canvas = document.getElementById('world');
canvas.width = innerWidth;
canvas.height = innerHeight;

let ctx = canvas.getContext('2d');
console.log(canvas)

//incase we want to stop an animation frame
let animateId;
let player;


class Player{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.width = width;
        this.height = height;
        this.speed = 3;
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
    }

    draw(){
        ctx.beginPath();//you have to begin a new path everytime
        ctx.fillStyle = '#ffdc34';
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.fill();
    }

    update(){
        this.x += this.dx;
        this.y += this.dy;
    }
}

function update(){
    player.update();
}

function draw(){
    player.draw();
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    draw();
    animateId = requestAnimationFrame(animate);
}

function init(){
    player = new Player(10,10,10,20);
    animate();
};

function startGame(){
    let startScreen = document.getElementById("start_screen");
    startScreen.style.display = "none";
    canvas.style.display = "block";
    init();
};

document.addEventListener('keydown', function(e){
    if(firstKey){
        firstKey = false;
        startGame();
    }else if(e.key == "ArrowUp" && !player.up){
        player.dy -= player.speed;
        player.up = true;
    }else if(e.key == "ArrowDown" && !player.down){
        player.dy += player.speed;
        player.down = true;
    }else if(e.key == "ArrowLeft" && !player.left){
        player.dx -= player.speed;
        player.left = true;
    }else if(e.key == "ArrowRight" && !player.right){
        player.dx += player.speed;
        player.right = true;
    }
});

document.addEventListener('keyup', function(e){
    if(e.key == "ArrowUp" && player.up){
        player.dy += player.speed;
        player.up = false;
    }else if(e.key == "ArrowDown" && player.down){
        player.dy -= player.speed;
        player.down = false;
    }else if(e.key == "ArrowLeft" && player.left){
        player.dx += player.speed;
        player.left = false;
    }else if(e.key == "ArrowRight" && player.right){
        player.dx -= player.speed;
        player.right = false;
    }
});
