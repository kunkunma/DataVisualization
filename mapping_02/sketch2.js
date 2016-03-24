var a = 100;  // Create a global variable "a"
var i = 0;
var entry = [];

function preload() {
  tcdata = loadTable("assets/NMC_v4_0.csv","csv","header");
}

function setup() {
  createCanvas(720, 400);
  background(255);
  entry = tcdata.getColumn("irst");
  //exit = tcdata.getColumn("exit");
  for(var i = 0; i < width; i++) {
    entry[i] = int(entry[i]);
    //exit[i] = int(exit[i]);
  }
  frameRate(10);
}

function draw() {
  // Draw a line using the global variable "a"
  var v = map(entry[i], 0, 1200, 0, 400);
  line(i, 400, i, 400-v);
  
  // Create a new variable "a" local to the for() statement 
  i++;
  if(i >= entry.length) {
    i = 0;
  }
  
}