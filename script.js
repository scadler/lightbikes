const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
var ctx = canvas.getContext('2d');
var bike = {
    x: 30,
    y: 30,
    dirx: 3,
    diry: 0,
}
function draw(x, y, inAir) {
    ctx.strokeStyle = (inAir === 0) ? "#FFFFFF" : "#CCCCCC"
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round'
    ctx.beginPath();
    ctx.moveTo(x + dirx/3, y - diry / 3);
    ctx.lineTo(x + d.x, y + d.y);
    ctx.stroke()

}
function step(){
    draw(bike.x,bike.y,0)
}
step()
setInterval(step, 20)

function keyPressed(e) {
    key = e.key
    // if (bike.airTime === 0 && bike.dead === false) {
        if (key == "a" && bike.direction.x !== 3) {
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
        if (key == " ") {
            e.preventDefault();
        }
    // }
}