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
        this.glideReduce = 0.1;

        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;

        this.gliding = false;
        this.launching = true;
        this.landed = false;
        this.firstTime = true;

        this.points = 0;
    }

    draw(ctx, worldHeight){
        //draw glider if gliding
        if (this.gliding){
            ctx.beginPath();
            ctx.fillStyle = "green";
            ctx.moveTo(this.x - 10, this.y - 10);
            ctx.lineTo(this.x + this.width + 10, this.y);
            ctx.lineTo(this.x - 10, this.y + 10);
            ctx.closePath();
            ctx.fill();
        }

        //draw ninja (body)
        ctx.beginPath();//you have to begin a new path everytime
        ctx.fillStyle = '#000';
        ctx.strokeStyle = '#222';
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.fill();

        //draw headband
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";
        ctx.moveTo(this.x, this.y+(.15 *this.height));
        ctx.lineTo(this.x+this.width, this.y+(.15 *this.height));
        ctx.stroke();

        /**
         * Draw Player HUD
         */
        //launchspeed
        ctx.font = "20px Arial";
        ctx.fillStyle = '#ffffff';
        ctx.fillText("Launch Speed: " + (-player.launchDy+player.launchDx), player.x - window.innerWidth/5, player.y+window.innerHeight/2);

        //points
        ctx.font = "20px Arial";
        ctx.fillStyle = '#ffffff';
        ctx.fillText("Points: " + this.points, (player.x + window.innerWidth/5), (player.y-window.innerHeight/2.2));

        //tutorial message
        if(this.firstTime && this.launching){
            ctx.font = "20px Arial";
            ctx.fillStyle = '#ffffff';
            ctx.fillText("Tap or press any key to leap.", (player.x - 120), (player.y-20));
        }
        else if(this.firstTime && !this.launching && !this.gliding){
            ctx.font = "20px Arial";
            ctx.fillStyle = '#ffffff';
            ctx.fillText("Tap or press any key to glide.", (player.x - 120), (player.y-20));
        }

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
        ctx.lineWidth = 3;
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(tox, toy);
        ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
        ctx.stroke();
    }

    update(worldHeight){
        //update the player if not on the ground
        if(this.landing){
            this.dx = 0;
            this.dy = 3;
        }
        if(!(this.y > worldHeight - this.dy - this.height)){
            this.x += this.dx;
            this.y += this.dy;
            if(!this.launching){
                this.points++;
            }
        }else{
            this.gliding = false;
            this.landed = true;
            this.landing = false;
            this.firstTime = false;
            this.reset(100,world.height-100,10,20);
            //reset player
        }
    }

    land(){
        this.landing = true;
    }

    reset(x,y,width,height){
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.width = width;
        this.height = height;
        this.launching = true;
    }

    launch(){
        //gradually move the character to a new position
        this.dx = this.launchDx;
        this.dy = this.launchDy;
        this.launching = false;
    }

    glide(){
        // When the play clicks/touches/press a key a second time, glide
        if (this.dy < 0){
          this.dy = 0;
        }

        this.gliding = true;
    }

    slowDown(dy){
        if (this.gliding){
            this.dy = this.dy + (dy - (dy * this.glideReduce));
        }else{
            this.dy = this.dy + dy;
        }
    }
}
