class Bee{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.width = 100;
        this.height = 100;
    }

    draw(ctx){
        ctx.beginPath();//you have to begin a new path everytime
        ctx.fillStyle = 'yellow';
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.fill();

        //give it stripes
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.rect(this.x+this.width/1.5,this.y,this.width/4,this.height);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.rect(this.x+this.width/4,this.y,this.width/4,this.height);
        ctx.fill();
    }
    
    update(){

    }
}