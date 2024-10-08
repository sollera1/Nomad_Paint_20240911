const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const colorOptions = Array.from( document.getElementsByClassName("color-option"));
const color = document.getElementById("color");
const lineWith = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWith.value;

/*ctx.moveTo(50,50);
ctx.lineTo(150,50);
ctx.lineTo(150,150);
ctx.lineTo(50,150);
ctx.lineTo(50,50);
ctx.fill();*/

/*ctx.fillRect(200,200,50,200);
ctx.fillRect(400,200,50,200);
ctx.lineWidth = 2;
ctx.fillRect(300,300,50,100);

ctx.fillRect(200,200,200,20);

ctx.moveTo(200,200);
ctx.lineTo(325,100);
ctx.lineTo(450,200);
ctx.fill();*/

/*ctx.fillRect(210 - 40 ,200 - 20, 15, 100);
ctx.fillRect(350 - 40 ,200 - 20, 15, 100);
ctx.fillRect(260 - 40 ,200 - 20, 60, 200);

ctx.arc(250, 100, 50, 0, 2*Math.PI);
//ctx.arc(260, 100, 50, 10, 350);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "white";
ctx.arc(260+10, 80, 8, Math.PI, 2*Math.PI);
ctx.arc(220+10, 80, 8, Math.PI, 2*Math.PI);
ctx.fill();*/

/*ctx.lineWidth = 2;
ctx.moveTo(0, 0);

const colors = [
    "#ff3838",
    "#ffb8b8",
    "#c56cf0",
    "#ff9f1a",
    "#fff200",
    "#32ff7e",
    "#18dcff",
    "#7d5fff",
]

function onClick(event){
    ctx.beginPath();
    ctx.moveTo(0, 0);
    const color = colors[Math.floor(Math.random() * colors.length)];
    ctx.strokeStyle = color;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
}

canvas.addEventListener("mousemove", onClick);*/

ctx.lineWidth = 5;
let isPainting = false;
let isFilling = false;

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting(event){
    isPainting = true;
}

function cancelPainting(event){
    isPainting = false;
}

function onLineWidthChange(event){
    //console.log(event.target.value);
    ctx.lineWidth = event.target.value;
    //ctx.beginPath();
    ctx.fillStyle = event.target.value;
}

function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event){
    const colorValue = event.target.dataset.color;
    //console.dir(event.target.dataset.color);
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

function onModeClick(event){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill";
    }
    else{
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}

function onDestroyClick(event){
    //ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}

function onEraserClick(event){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
//document.add("mouseleave", onMouseUp);

lineWith.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach(color => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick)
destroyBtn.addEventListener("click", onDestroyClick)
eraserBtn.addEventListener("click", onEraserClick)
