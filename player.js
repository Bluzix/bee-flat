class Player{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.width = width;
        this.height = height;

        this.launchDx = 8;
        this.launchDy = -4;

        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;

        this.gliding = false;
        this.launching = true;

        this.points = 0;
    }

    draw(ctx, worldHeight){        

        ctx.beginPath();//you have to begin a new path everytime
        ctx.fillStyle = '#ffdc34';
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.fill();

        /**
         * Draw Player HUD
         */
        //launchspeed
        ctx.font = "20px Arial";
        ctx.fillStyle = '#ffffff';
        ctx.fillText("LaunchSpeed: " + (-player.launchDy+player.launchDx), player.x - window.innerWidth/5, player.y+window.innerHeight/2);

        //points
        ctx.font = "20px Arial";
        ctx.fillStyle = '#ffffff';
        ctx.fillText("Points: " + this.points, (player.x + window.innerWidth/5), (player.y-window.innerHeight/2.2));


        //draw arrow for angle
        if(this.launching){
            ///i think the arrow should actually show the angle, we also need an angle property to the leap 
            this.draw_arrow(ctx, this.x, this.y, 528,1656);
        }
        
    }
    
    draw_arrow(ctx, fromx, fromy, tox, toy) {
        var headlen = 10; // length of head in pixels
        var dx = tox - fromx;
        var dy = toy - fromy;
        var angle = Math.atan2(dy, dx);

        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(tox, toy);
        ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
        ctx.stroke();
    }
    
    update(worldHeight){
        //update the player if not on the ground
        if(!(this.y > worldHeight - this.dy - this.height)){
            this.x += this.dx;
            this.y += this.dy;
            if(!this.launching){
                this.points++;
            }
        }
    }

    launch(){
        //gradually move the character to a new position
        this.dx = this.launchDx;
        this.dy = this.launchDy;
        this.launching = false;

        /**
         * I use an arrow function because keyword (this)
         * inside a setTimeout refers to the outside scope instead of 
         * the parent of the function
         * 
         * https://www.freecodecamp.org/news/learn-es6-the-dope-way-part-ii-arrow-functions-and-the-this-keyword-381ac7a32881/
         */
        setTimeout(()=>{
            console.log(this.x,this.y);
            //set the glide velocities
            this.dy = -this.launchDy;

            this.gliding = true;
        }, 1000);
    }
}