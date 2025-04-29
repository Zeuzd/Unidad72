let usarSimulacion = true;
let modoManual = false;

let volumenSimulado = 0;
let volumenSimuladoOponente = 0;

let sliderA, sliderB;
let mic;

function setup() {
  createCanvas(600, 400);

  if (!usarSimulacion) {
    mic = new p5.AudioIn();
    mic.start();
  }

  sliderA = createSlider(0, 100, 50);
  sliderA.position(100, height + 20);
  sliderA.style('width', '150px');

  sliderB = createSlider(0, 100, 50);
  sliderB.position(300, height + 20);
  sliderB.style('width', '150px');

  if (!modoManual) {
    sliderA.hide();
    sliderB.hide();
  }
}

function draw() {
  background(30);

  let volumenA, volumenB;

  if (usarSimulacion) {
    if (modoManual) {
      volumenA = sliderA.value();
      volumenB = sliderB.value();
    } else {
      let t = millis() * 0.001;
      volumenA = map(noise(t), 0, 1, 20, 90);
      volumenB = random(20, 90);
    }
  } else {
    let micLevel = mic.getLevel();
    volumenA = map(micLevel, 0, 1, 0, 100);
    volumenB = 0;
  }

  volumenSimulado = volumenA;
  volumenSimuladoOponente = volumenB;

  // Visualización
  fill(0, 200, 255);
  rect(150, height - volumenA * 3, 50, volumenA * 3);
  fill(255, 100, 100);
  rect(400, height - volumenB * 3, 50, volumenB * 3);

  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(`Hinchada A: ${volumenA.toFixed(1)}%`, 175, 30);
  text(`Hinchada B: ${volumenB.toFixed(1)}%`, 425, 30);
}

function keyPressed() {
  if (key === 'm') {
    modoManual = !modoManual;
    if (modoManual) {
      sliderA.show();
      sliderB.show();
    } else {
      sliderA.hide();
      sliderB.hide();
    }
  }
}
