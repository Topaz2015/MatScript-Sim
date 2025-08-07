// JavaScript Document
const script = document.createElement('script');
script.src = 'font.js';
script.type = 'text/javascript';
script.onload = () => {
    console.log('Script loaded successfully.');
};
document.head.appendChild(script);

var COLS = 120, ROWS = 16, startX = 4, startY = 4, w=8, s=9, mycolor = "PaleGoldenRod";
var PIXS = COLS * ROWS, DELAY = 20, COLOR_ARRAY;
var CHAR_SPACING=2, MSG_SPACING=64;
var pixels, msgArray, timerId, output, screen, bgcolor = mycolor, fgcolor = "red";
var msg = "WELCOME TO TOPAZ DIGITAL SOLUTIONS!!";
var msg_pos=0, char_cols, char_row=0, char_col=0, test_count=0;

var myCanvas = document.getElementById('canvas');

function drawMatrix() {
    pixels = new Array(PIXS);
    msgArray = new Array(PIXS);
    // COLOR_ARRAY = new Array(20);
    COLOR_ARRAY = ["red", "orange", "darkred", "darksalmon","coral", "crimson", "maroon", "magenta","darkmagenta", "indianred","darkgoldenrod", "salmon","sienna", "tomato", "orangered", "gold", "brown", "chocolate"];
    COLOR_ARRAY2 = ["forestgreen", "cornflowerblue", "dodgerblue", "lime", "limegreen", "linen", "mediumblue", "turquoise","teal", "palegreen","steelblue", "springgreen","skyblue", "silver", "seagreen", "midnightblue", "royalblue", "indigo"];
    output = document.getElementById("output");
    screen = document.getElementById("screen");
    canvas = myCanvas.getContext('2d');

        for (var col = 0; col < COLS; col++){ 
            for (var row = 0; row < ROWS; row++){ 
            var el = new Array(3);
            el[0] = row;
            el[1] = col;
            el[2] = "red";
            pixels[col * ROWS + row] = el;
            canvas.fillStyle = mycolor;
            canvas.fillRect(col * s + startY, row * s + startX, w, w);
            }
        }
    // canvas.clearRect(52 * 10 + startY, 8 * 10 + startX, 8, 8);
    output.innerHTML = "<h3>Debug output appears here</h3>";
    screen.innerHTML = "<h3>Debug screen appears here</h3>";
    drawPixel(155);
    for(var i=0; i<PIXS; i++) msgArray[i] = 0;
    addSpace2MsgEnd();
    timerId = setInterval("scroller()", DELAY);
    }
    window.addEventListener("load", drawMatrix, false);


function drawPixel(pos){
    var p = new Array(3);
    // var myCanvas = document.getElementById('canvas');
    canvas = myCanvas.getContext('2d');
    p = pixels[pos];
    var row = p[0];
    var col = p[1];
    var color = p[2];
    // alert(" out of "+pixels.length);
    // canvas.clearRect(col * 10 + startY, row * 10 + startX, 8, 8);
    canvas.fillStyle = color;
    canvas.fillRect(col * s + startY, row * s + startX, w, w);
    // alert("row="+row+"; col="+col+"; out of "+pixels.length);
}

function scroller(){
char_row = msg.charCodeAt(msg_pos)-32;
char_cols = font16[char_row][0]; 
if(char_col < char_cols)
shiftLeftDisplay(char_row, char_col);
else 
shiftLeftDisplay(0, 0); 
char_col++;
if(char_col >= char_cols+CHAR_SPACING) {
char_col = 0; 
msg_pos++;
if(msg_pos >= msg.length){
msg_pos = 0;
char_col = 0;
var m = Math.round(Math.random()*1000);
var n = m % COLOR_ARRAY.length;
var p = m%2;
output.innerHTML = "<h3>Debug Output p = "+p + "</h3>";
fgcolor = (p)? COLOR_ARRAY[n] : COLOR_ARRAY2[n];
m = Math.round(Math.random()*1000);
n = m % COLOR_ARRAY.length;
bgcolor = (!p)? COLOR_ARRAY[n] : COLOR_ARRAY2[n];
for(var l=0; l<MSG_SPACING; l++)
shiftLeftDisplay(0, 1);
// clearMatrix();
}
}
}

function shiftLeftDisplay(char_row, char_col){
//shift left
var col_pixels = getColumnData(char_row, char_col);
for (var i=0; i<PIXS; i++){
var orig = PIXS-ROWS; 
if(i < orig) {
msgArray[i] = msgArray[i+ROWS];
// = temp; 
}else{ 
var byte = col_pixels >> (i%16); 
var sum = byte & 1;
if (sum == 1) {
msgArray[i] = 1;
}else
msgArray[i] = 0;
}
} //end of shift left 
//display here and delay
for(var col=0; col<COLS; col++){
for(var row=0; row<ROWS; row++){ 
var el = new Array(3); 
el[0] = row;
el[1] = col;
var pos = col * ROWS + row;
var temp1 = msgArray[pos];
// if(pos>1500) testOut("pos = "+pos+"; temp1 ="+ temp1);

if(temp1 == 0){ 
el[2] = bgcolor;
}else{
el[2] = fgcolor;
}
pixels[pos] = el;
drawPixel(pos);
}
}//end of display
}

function getFont16(character, column){
return font16[character][column];
}

function getColumnData(character, index) {
var s = 0, t = 0;
t = getFont16(character, (index * 2 + 1)); //0>1, 1>3, 2>5
s = getFont16(character, (index * 2 + 2)); //0>2, 1>4, 2>6
s = s << 8;
var columnData = t | s; 
testOut("columndata = "+columnData);
return columnData << 1;
}


function clearMatrix() {
for (var col = 0; col < COLS; col++){ 
for (var row = 0; row < ROWS; row++){ 
canvas.fillStyle = mycolor;
canvas.fillRect(col * s + startY, row * s + startX, w, w);
}
}
// canvas.clearRect(52 * 10 + startY, 8 * 10 + startX, 8, 8);
}

function testPixel(pos, color){
var myCanvas = document.getElementById('canvas');
canvas = myCanvas.getContext('2d');
// alert(" out of "+pixels.length);
// canvas.clearRect(col * 10 + startY, row * 10 + startX, 8, 8);
var row = pos%ROWS;
var col = pos/ROWS;
canvas.fillStyle = color;
canvas.fillRect(col * s + startY, row * s + startX, w, w);
// alert("row="+row+"; col="+col+"; out of "+pixels.length);
}

function testDisp(){ 
testPixel(test_count, "green");
test_count++;
if(test_count>=pixels.length) test_count = 0; 
output.innerHTML = "msgArray i+rows = "+test_count;
}

function testOut(txt){ 
screen.innerHTML = "<h3>screen = "+txt+"</h3>";
}

function doFirst() {
var myCanvas = document.getElementById('canvas');
canvas = myCanvas.getContext('2d');
canvas.fillStyle = "green";
canvas.strokeStyle = "red";
canvas.strokeRect(10, 10, 100, 200);
canvas.fillRect(20, 20, 80, 180);
canvas.clearRect(30, 30, 60, 160);
}

function addSpace2MsgEnd() {
var j = msg.length, sp=0; 
while(msg.charAt(j-1) == ' '){
sp++;
j--;
}

var cs = font16[0][0];
var sz = cs * sp;
var add = (COLS/cs) - sz;
for(var i = 0; i < add; i++) msg += ' ';
}

// Function to resize canvas
function resizeCanvas() {
    myCanvas.width = window.innerWidth-200*(window.innerWidth/1080);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
