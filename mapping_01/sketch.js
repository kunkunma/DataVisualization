var osc; // this is the oscillator we will hear
var reverb;
var env;

var modulator; // this oscillator will modulate the amplitude of the osc
var data;
var ki = 0;
var x, y;
var font, fontsize = 60;
var message = "CatchME"
var rowCount;

function preload(){
  data = loadTable("assets/NMC_v4_0.csv", "csv", "header");
  font = loadFont('assets/LeagueGothic-Regular.otf');
}

function setup() {
  rowCount = data.getRowCount();

  createCanvas(710, 400);

  env = new p5.Env(.025, 1.0, .025, .2, .2, .05, .1);
  osc = new p5.Oscillator('sawtooth'); // connects to master output by default
  osc.amp(0.0);
  osc.start();
  reverb = new p5.Reverb();
  reverb.process(osc);
  frameRate(16); // tempo

  // set up the font
  textFont(font);
  textSize(fontsize);

  // get the width and height of the text so we can center it initially
  bounds = font.textBounds(message, 0, 0, fontsize);
  x = width / 2 - bounds.w / 2;
  y = height / 2 - bounds.h / 2;
}


function draw() {

  fill(204, 120);
  rect(0, 0, width, height);

  // write the text in black and get its bounding box
  fill(0);
  text(message, x, y);
  bounds = font.textBounds(message,x,y,fontsize);

  // check if the mouse is inside the bounding box and tickle if so
  if ( mouseX >= bounds.x && mouseX <= bounds.x + bounds.w &&
    mouseY >= bounds.y && mouseY <= bounds.y + bounds.h) {
    x += random(-5, 5);
    y += random(-5, 5);

    // map mouseY to moodulator freq 
    var freq = data.getNum(ki%rowCount, 2) + data.getNum(ki%rowCount, 5); 
    freq = constrain(freq, 1500, 4500);
    freq = midiToFreq(round(map(freq, 1500, 4500, 60, 72)));
    ki++;
    osc.freq(freq);
    env.play(osc);
  }
}