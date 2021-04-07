let classifier;

let video;

let label = "waiting ..."

function preload() {
  classifier = ml5.imageClassifier('MobileNet');
}

function setup() {
  createCanvas(640, 520);
  video = createCapture(VIDEO);
  video.hide();
  classifyVideo();
}

function classifyVideo() {
  classifier.classify(video, gotResults)
}

function draw() {
  background(0);
  image(video, 0, 0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(label, width / 2, height - 16);

  let symbol = "⬅️";

  if (label.charAt(0) == "A" || label.charAt(0) == "E" || label.charAt(0) == "I" || label.charAt(0) == "O" || label.charAt(0) == "U") {
    symbol = "⬅️";
  } else {
    symbol = "➡️";
  }

  textSize(100);
  text("V  " + symbol + "  C", width / 2, height / 2);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  classifyVideo();
  createDiv(`Label: ${results[0].label}`);
  createDiv(`Confidence: ${nf(results[0].confidence, 0, 2)}`);
}