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
    }

    draw(ctx){
        ctx.beginPath();//you have to begin a new path everytime
        ctx.fillStyle = '#ffdc34';
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.fill();

        //draw arrow for angle
        if(this.launching){


            //THIS IS ARBITRARY for testing of everything else we need to find where the player will change his path
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