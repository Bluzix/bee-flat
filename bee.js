class Bee{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.width = width;
        this.height = height;
    }

    draw(ctx){
        ctx.beginPath();//you have to begin a new path everytime
        ctx.fillStyle = '#ff0000';
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.fill();
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
}