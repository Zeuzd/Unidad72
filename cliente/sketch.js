let usarSimulacion = true;
let modoManual = false;

let volumenSimulado = 0;
let volumenSimuladoOponente = 0;

let sliderA, sliderB;
let mic;

function setup() {
  createCanvas(800, 400); // Aumentamos el ancho para los datos a la derecha

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
  
      let t2 = millis() * 0.0007; // un poco más lento
      volumenB = map(noise(t2 + 1000), 0, 1, 30, 80); // menos extremo
    }
    
  } else {
    let micLevel = mic.getLevel();
    volumenA = map(micLevel, 0, 1, 0, 100);
    volumenB = 0;
  }

  volumenSimulado = volumenA;
  volumenSimuladoOponente = volumenB;

  // Visualización de barras
  fill(0, 200, 255);
  rect(150, height - volumenA * 3, 50, volumenA * 3);
  fill(255, 100, 100);
  rect(400, height - volumenB * 3, 50, volumenB * 3);

  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(`Hinchada A: ${volumenA.toFixed(1)}%`, 175, 30);
  text(`Hinchada B: ${volumenB.toFixed(1)}%`, 425, 30);

  // 🔍 Mostrar datos intermedios a la derecha
  let total = volumenA + volumenB;
  let porcentajeA = total > 0 ? (volumenA / total) * 100 : 50;
  let porcentajeB = 100 - porcentajeA;

  let puntosExtraA = volumenA > 70 ? 5 : 0;
  let puntosExtraB = volumenB > 70 ? 5 : 0;

  textAlign(LEFT);
  textSize(14);
  let xInfo = 600;
  let yStart = 80;
  let lh = 20;

  fill(255);
  text("📊 Datos Simulados", xInfo, yStart);
  text(`Volumen A: ${volumenA.toFixed(1)}`, xInfo, yStart + lh * 1);
  text(`Volumen B: ${volumenB.toFixed(1)}`, xInfo, yStart + lh * 2);
  text(`% A: ${porcentajeA.toFixed(1)}%`, xInfo, yStart + lh * 3);
  text(`% B: ${porcentajeB.toFixed(1)}%`, xInfo, yStart + lh * 4);
  text(`Puntos Extra A: ${puntosExtraA}`, xInfo, yStart + lh * 5);
  text(`Puntos Extra B: ${puntosExtraB}`, xInfo, yStart + lh * 6);
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
