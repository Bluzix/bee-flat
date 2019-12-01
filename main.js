// Is this the first keypress to close the Start Menu?
let firstKey = true;

let canvas = document.getElementById('world');
canvas.width = innerWidth;
canvas.height = innerHeight;

let ctx = canvas.getContext('2d');

let animateId;

let world;
let player;

/**
 * Shop Variables
 */
let shopScreen = document.getElementById("shop_screen");
let shopPoints = document.getElementById('points');
let launchSpeed = document.getElementById("launch_speed");
let upgradeSpeed = document.getElementById("upgrade_speed");
let shortFunds = document.getElementById("short_funds");
let shop = {
    open: false
}

function update(){
    world.update();
    player.update(world.height);
    if(player.landed && !shop.open){
        shop.open = true;
        shopScreen.style.display = "block";
        canvas.style.display = "none";
        shopPoints.innerHTML = "Points: " + player.points;
        launchSpeed.innerHTML = "Launch Speed " + (-player.launchDy+player.launchDx), player.x - window.innerWidth/5, player.y+window.innerHeight/2;
        upgradeSpeed.innerHTML = "Upgrade Speed -" + (100*player.launchDx) + " Points"
    }
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

canvas.addEventListener('touchstart', function(e){
    if(firstKey){
        firstKey = false;
        startGame();
    }else if(player.launching){
        player.launch();
    }
});

document.addEventListener('mousedown', function(){
    if(firstKey){
        firstKey = false;
        startGame();
    }else if(player.launching && !shop.open){
        player.launch();
    }
})

/**
 * Shop Events
 */

upgradeSpeed.addEventListener('click', function(){
    if (player.points >= 100*player.launchDx){
        player.points-=100*player.launchDx;
        player.launchDx++;
        shopPoints.innerHTML = "Points: " + player.points;
        launchSpeed.innerHTML = "Launch Speed " + (-player.launchDy+player.launchDx), player.x - window.innerWidth/5, player.y+window.innerHeight/2;
        upgradeSpeed.innerHTML = "Upgrade Speed -" + (100*player.launchDx) + " Points"
    }
    else{
      shortFunds.style.display = "block";
    }
});

document.getElementById("close_shop").addEventListener('click', function(){
    player.landed = false;
    shop.open = false;
    shortFunds.style.display = "none";
    shopScreen.style.display = "none";
    canvas.style.display = "block";
});
