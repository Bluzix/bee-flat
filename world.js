class World{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.gravity = 0.05;
    }

    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {Element} canvas
     * @param {Player} player
     */
    draw(ctx, canvas, player){

        ctx.setTransform(1,0,0,1,0,0);//reset the transform matrix as it is cumulative
        ctx.clearRect(0, 0, canvas.width, canvas.height);//clear the viewport AFTER the matrix is reset

        //move the viewport
        ctx.translate(-player.x-player.width/2+canvas.width/2, -player.y-player.height/2+canvas.height/2);

        //draw background color
        ctx.beginPath();//you have to begin a new path everytime
        ctx.fillStyle = '#444444';
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.fill();

        //I was thinking we have the player spawn on a building and leap off of it
        ctx.beginPath();
        ctx.fillStyle = '#00F';
        ctx.rect(0, this.height-80, 110, 80);
        ctx.fill();
    }

    update(){

    }
}
