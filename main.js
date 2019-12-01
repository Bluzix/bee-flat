// Is this the first keypress to close the Start Menu?
let firstKey = true;

let canvas = document.getElementById('world');
canvas.width = innerWidth;
canvas.height = innerHeight;

let ctx = canvas.getContext('2d');

let animateId;

let world;
let beeArray = [];
let player;

/**
 * Shop Variables
 */
let shopScreen = document.getElementById("shop_screen");
let shopPoints = document.getElementById('points');
let launchSpeed = document.getElementById("launch_speed");
let gliderEffect = document.getElementById("glide_effect");
let upgradeSpeed = document.getElementById("upgrade_speed");
let upgradeGlider = document.getElementById("upgrade_glider");
let shortFunds = document.getElementById("short_funds");
let maxReached = document.getElementById("max_reached");
let maxGlidePrice = 10000;
let shop = {
    open: false
}

function update(){
    world.update();
    player.update(world.height);
    for(let i = 0; i < beeArray.length; i++){
        beeArray[i].update();
        //check to see if the player hit it
        if(rectCollision(player, beeArray[i]) && !player.launching){
            player.land();
        }
    }
    if(player.landed && !shop.open){

        //lets also use this to randomize the bee's locations
        for(let i = 0; i < 50; i++){
            let x = randomIntFromInterval(player.x*2, world.width);// the starting pos is just a guess
            let y = randomIntFromInterval(0, world.height);            
            beeArray[i].x = x;
            beeArray[i].y = y;
        }
        shop.open = true;
        shopScreen.style.display = "block";
        canvas.style.display = "none";
        shopPoints.innerHTML = "Points: " + player.points;
        launchSpeed.innerHTML = "Launch Speed " + (-player.launchDy+player.launchDx), player.x - window.innerWidth/5, player.y+window.innerHeight/2;
        gliderEffect.innerHTML = "Glider Effect: -" + Math.floor(100*player.glideReduce) + "% of Gravity";
        upgradeSpeed.innerHTML = "Upgrade Speed -" + (100*player.launchDx) + " Points"
        upgradeGlider.innerHTML = "Upgrade Glider -" + Math.ceil(10000*player.glideReduce) + " Points"
    }
}

function draw(){
    world.draw(ctx,canvas,player);
    player.draw(ctx,world.height);
    for(let i = 0; i < beeArray.length; i++){
        beeArray[i].draw(ctx);
    }

    // if the player is in flight (jumped or gliding), have gravity affect them
    if (!player.launching){
        player.slowDown(world.gravity);
    }
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
        
    //create random locations for bees
    for(let i = 0; i < 50; i++){
        let x = randomIntFromInterval(player.x*2, world.width);// the starting pos is just a guess
        let y = randomIntFromInterval(0, world.height);
        
        beeArray.push(new Bee(x,y));
        
    }
    animate();
};

function startGame(){
    let startScreen = document.getElementById("start_screen");
    startScreen.style.display = "none";
    canvas.style.display = "block";
    init();
};

function rectCollision(rect1, rect2){
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y) {
         // collision detected!
         return true;
    }else{
        return false;
    }
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

document.addEventListener('keydown', function(e){
    if(firstKey){
        firstKey = false;
        startGame();
    }else if(player.launching && !shop.open){
        player.launch();
    }else if(!player.gliding && !shop.open){
        player.glide();
    }
});

document.addEventListener('keyup', function(e){

});

canvas.addEventListener('touchstart', function(e){
    if(firstKey){
        firstKey = false;
        startGame();
    }else if(player.launching && !shop.open){
        player.launch();
    }else if(!player.gliding && !shop.open){
        player.glide();
    }
});

document.addEventListener('mousedown', function(){
    if(firstKey){
        firstKey = false;
        startGame();
    }else if(player.launching && !shop.open){
        player.launch();
    }else if(!player.gliding && !shop.open){
        player.glide();
    }
})

/**
 * Shop Events
 */

upgradeSpeed.addEventListener('click', function(){
    //reset notifications
    shortFunds.style.display = "none";
    maxReached.style.display = "none";

    //only upgrade speed if the player can afford it
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

upgradeGlider.addEventListener('click', function(){
    //reset notifications
    shortFunds.style.display = "none";
    maxReached.style.display = "none";

    //only upgrade glider if the player can afford it and max value not reached
    if (player.points >= Math.ceil(maxGlidePrice*player.glideReduce) && player.glideReduce < 0.9){
        player.points-=Math.ceil(maxGlidePrice*player.glideReduce);
        player.glideReduce+=0.01;
        shopPoints.innerHTML = "Points: " + player.points;
        gliderEffect.innerHTML = "Glider Effect: -" + Math.floor(100*player.glideReduce) + "% of Gravity";
        upgradeGlider.innerHTML = "Upgrade Glider -" + Math.ceil(maxGlidePrice*player.glideReduce) + " Points"
    }
    else if (player.glideReduce >= 0.9){
        maxReached.style.display = "block";
    }
    else{
        shortFunds.style.display = "block";
    }
});

document.getElementById("close_shop").addEventListener('click', function(){
    player.landed = false;
    shop.open = false;
    shortFunds.style.display = "none";
    maxReached.style.display = "none";
    shopScreen.style.display = "none";
    canvas.style.display = "block";
});
