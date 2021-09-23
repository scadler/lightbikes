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
    let dx = (dirx === 0) ? 1 : dirx;
    let dy = (diry === 0) ? 1 : diry;
    ctx.fillStyle = "#FF0000"
    ctx.fillRect(x+dirx,y+diry,dx,dy)
}
function move(){
    let height = (bike.jump !==0)? Math.round((8-(bike.jump-2))/4) : 0;
    bike.x+=bike.dirx + (height*Math.abs(bike.diry/3));
    bike.y+=bike.diry + (height*Math.abs(bike.dirx/3));
}
function collisionDetect(x,y,dirx,diry){
    let dx = (dirx === 0) ? 1 : dirx;
    let dy = (diry === 0) ? 1 : diry;
    console.log(ctx.getImageData(x, y, dx, dy).data)
    if(ctx.getImageData(x, y, dx, dy).data.includes(255)){
        console.log("wsiwebfripweufyp")
    }
}

function step(){
    draw(bike.x,bike.y,bike.dirx,bike.diry,bike.jump)
    move()
    collisionDetect(bike.x,bike.y,bike.dirx,bike.diry)
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
step()
// setInterval(step, 20)
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