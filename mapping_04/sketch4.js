var osc;
var reverb;
var max_distance;
var ki = 0;
var rowCount;

function preload() {
  data = loadTable("assets/Inter-StateWarData_v4.0.csv","csv","header");
}

function setup() {
  createCanvas(710, 500);
  noStroke();
  max_distance = dist(0, 0, width, height);
  rowCount = data.getRowCount();

  env = new p5.Env(.025, 1.0, .025, .2, .2, .05, .1);
  osc = new p5.Oscillator('sawtooth'); // connects to master output by default
  osc.freq(340);
  osc.amp(0.0);
  osc.start();
}

function draw() {
  background(0);

  for(var i = 0; i <= width; i += 20) {
    for(var j = 0; j <= height; j += 20) {
      var size = dist(mouseX, mouseY, i, j);
      size = size/max_distance * 66;
      ellipse(i, j, size, size);
    }
  }
//The row of data is decided by the distance between mouse and the center of canvas.
  var size = dist(mouseX, mouseY, width/2, height/2);
  var idx = round(map(size, 0, dist(0, 0, width/2, height/2), 0, rowCount-1));
  var modAmp = map(data.getNum(idx%rowCount, 8), 1823, 2003, 0, 1);
  osc.amp(modAmp, 0.01);
}