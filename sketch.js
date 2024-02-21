let x, y; // Position of the clock
let vx, vy; // Velocity of the clock
let clockSize; // Size of the clock

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  x = width / 2;
  y = height / 2;
  vx = 2; // Adjust for speed
  vy = 2; // Adjust for speed
  clockSize = 80; // Adjust for clock size
}

function draw() {
  background(0);
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(clockSize);
  
  let hr = nf(hour(), 2);
  let mn = nf(minute(), 2);
  let sc = nf(second(), 2);
  let timeString = `${hr}:${mn}:${sc}`;
  
  text(timeString, x, y);
  
  // Move the clock
  x += vx;
  y += vy;
  
  // Check for bouncing
  if (x > width - clockSize || x < clockSize) {
    vx *= -1;
  }
  if (y > height - clockSize || y < clockSize) {
    vy *= -1;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
