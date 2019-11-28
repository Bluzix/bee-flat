class Player{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.width = width;
        this.height = height;
        this.speed = 12;
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
    }

    draw(ctx){
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