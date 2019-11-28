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
    player.update(world.height);
}

function draw(){
    world.draw(ctx,canvas,player);
    player.draw(ctx,world.height);
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    draw();
    animateId = requestAnimationFrame(animate);
}

function init(){
    world = new World(worldObjects.x, worldObjects.y, worldObjects.width, worldObjects.height);
    player = new Player(100,world.height-100,10,20);
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
    }
});

document.addEventListener('keyup', function(e){
    
});

document.addEventListener('mousedown', function(){
    if(firstKey){
        firstKey = false;
        startGame();
    }else if(player.launching){
        player.launch();
    }
})

