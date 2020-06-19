const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");

/* ------------------Tools elements--------------------- */

const color = document.querySelector("#color");
const line = document.querySelector("#line");
const clearBtn = document.querySelector('.clear');
const uploadBtn = document.querySelector('.upload-img');

/* ------------------------Canvas options----------------------- */
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
//ctx.lineWidth = line['value'];

/* -------------------------------------------------------------- */

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 200;
let direction = 0;

function draw(e) {
    if (!isDrawing) return;
    console.log(e);
    ctx.strokeStyle = `${color["value"]}`;
    ctx.lineWidth = line["value"];
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

/* ------------------Canvas Listeners------------------------- */

canvas.addEventListener("mousedown", e => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

/* ---------------------------Control buttons Listeners------------------ */

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
});

uploadBtn.addEventListener('click', () => {
    const img = new Image();
    img.src = './img/path.jpg';
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
    }
});