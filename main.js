// Is this the first keypress to close the Start Menu?
let firstKey = true;

let canvas = document.getElementById('world');
canvas.width = innerWidth;
canvas.height = innerHeight;

let ctx = canvas.getContext('2d');

let animateId;

let world;
let player;

function update(){
    world.update();
    player.update();
}

function draw(){
    world.draw(ctx,canvas,player);
    player.draw(ctx);
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    draw();
    animateId = requestAnimationFrame(animate);
}

function init(){
    world = new World(worldObjects.x, worldObjects.y, worldObjects.width, worldObjects.height);
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

