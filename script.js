const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
var ctx = canvas.getContext('2d');
var bike = {
    x: 30,
    y: 30,
    dirx: 3,
    diry: 0,
    jump: 0,
    jumpCooldown: 0,
    dead: false,
}
function draw(x, y, dirx, diry, jump) {
    ctx.strokeStyle = (jump === 0) ? "#FFFFFF" :"#909090";
    ctx.globalCompositeOperation = (jump !== 0) ? "source-over" : "destination-over";
    ctx.lineWidth = 4;
    ctx.lineJoin = 'miter'
    ctx.beginPath();
    ctx.moveTo(x - dirx*2/3, y - diry*2/3);
    ctx.lineTo(x + dirx, y + diry);
    ctx.stroke()
   
}
function move(){
    let height = (bike.jump !==0)? Math.round((8-(bike.jump-2))/4) : 0;
    bike.x+=bike.dirx + (height*Math.abs(bike.diry/3));
    bike.y+=bike.diry + (height*Math.abs(bike.dirx/3));
}
function collisionDetect(x,y,dirx,diry,jump){
    if(jump===0){
    let dx = (dirx === 0) ? 1 : dirx*4/3;
    let dy = (diry === 0) ? 1 : diry*4/3;
    let cc = (diry >0) ? 3 : (diry < 0) ? -4 : 0;
    let dd = (dirx >0) ? 3 : (dirx < 0) ? -4 : 0;
    console.log(ctx.getImageData(x+dd-Math.ceil(cc/2), y+cc-Math.ceil(dd/2), dy, dx).data.filter(function(value) {return value ===255; }).length)
    if(ctx.getImageData(x+dd-Math.ceil(cc/2), y+cc-Math.ceil(dd/2), dy, dx).data.filter(function(value) {return value ===255; }).length >= 5){
        console.log("white")
        bike.dead = true;
        }
    }
}

function step(){
    if(bike.dead == false){
    draw(bike.x,bike.y,bike.dirx,bike.diry,bike.jump)
    move()
    collisionDetect(bike.x,bike.y,bike.dirx,bike.diry,bike.jump)
    if(bike.jump !== 0){
        bike.jump-=1;
        if(bike.jump < 0){
            bike.jump = 0;
        }
    }
    if(bike.jumpCooldown !==0){
        bike.jumpCooldown-=1;
        if(bike.jumpCooldown < 0){
            bike.jumpCooldown = 0;
        }
    }
}
}
step()
 setInterval(step, 25)
document.addEventListener('keydown', keyPressed)
function keyPressed(e) {
    console.log("works")
    key = e.key
    if(bike.jump === 0){
        if (key == "a" && bike.dirx !== 3) {
            bike.dirx = -3
            bike.diry = 0
        } else if (key == "d" && bike.dirx !== -3) {
            bike.dirx = 3
            bike.diry = 0
        } else if (key == "w" && bike.diry !== 3) {
            bike.dirx = 0
            bike.diry = -3
        } else if (key == "s" && bike.diry !== -3) {
            bike.dirx = 0
            bike.diry = 3
        }
        if (key == " " && bike.jumpCooldown === 0) {
            bike.jump=20;
            bike.jumpCooldown=60;
            e.preventDefault();
        }
    }
}