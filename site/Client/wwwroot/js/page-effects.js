/**
 * Copyright 2021 Adam Chen / Encodeous
 */
/** @type {CanvasRenderingContext2D} */
let context;
let lineLen = 10;
let lastX = 0, lastY = 0;
let targetX = 0, targetY = 0;
let refreshed = true;
function Init(style){
    window.onmousemove = MouseMoveHandler;
    var canvas = document.getElementById( "bgCanvas" );
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    lineLen = Math.log2(window.innerWidth * window.innerHeight) / 3;
    context = canvas.getContext("2d");
    context.strokeStyle = style;
    context.lineWidth = 2;
    window.addEventListener("resize", ()=>{
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        context.strokeStyle = style;
        refreshed = true;
    });
    (function main(counter){
        lastX += (targetX - lastX) / 50;
        lastY += (targetY - lastY) / 50;
        if(targetX !== lastX && targetY !== lastY || refreshed){
            refreshed = false;
            Draw(lastX, lastY);
        }
        setTimeout(main,10,counter+1);
    })();
}
/**
 * @param {MouseEvent} event
 * @constructor
 */
function MouseMoveHandler(event){
    targetX = event.clientX;
    targetY = event.clientY;
}
function Draw(x, y){
    let centerScreenX = window.innerWidth/2;
    let centerScreenY = window.innerHeight/2;

    let a1 = x-centerScreenX;
    let b1 = y-centerScreenY;
    let dMag = Math.sqrt(a1*a1 + b1*b1)
    let tMag = Math.sqrt(centerScreenX*centerScreenX + centerScreenY*centerScreenY);
    let ease = dMag/tMag;
    let unita = a1/dMag;
    let unitb = b1/dMag;
    let sx = ease * 40 * unita;
    let sy = ease * 40 * unitb;
    
    context.clearRect(0,0, window.innerWidth, window.innerHeight);
    for (let i = sx; i <= window.innerHeight; i += window.innerHeight / 20)
    {
        for (let j = sy; j <= window.innerWidth; j += window.innerWidth / 20)
        {
            let a = x-j;
            let b = y-i;
            let mag = Math.sqrt(a*a + b*b);
            if(mag !== 0){
                let normx = Math.log10(1/mag) * lineLen * a/mag;
                let normy = Math.log10(1/mag) * lineLen * b/mag;
                context.beginPath();
                context.moveTo(j,i);
                context.lineTo(normx + j, normy + i);
                context.stroke();
            }
        }
    }
}
