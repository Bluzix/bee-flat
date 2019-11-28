class World{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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
        ctx.translate( -player.x-player.width/2+canvas.width/2, -player.y-player.height/2+canvas.height/2 );

        //draw background color
        ctx.beginPath();//you have to begin a new path everytime
        ctx.fillStyle = '#444444';
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.fill();

        //draw world stats, to aid development
        ctx.font = "20px Arial";
        ctx.fillStyle = '#ffffff';
        ctx.fillText("X: " + player.x + "/" + this.width, player.x+30, player.y);
        ctx.fillText("Y: " + player.y + "/" + this.height, player.x+30, player.y+30);
        
    }

    update(){

    }
}