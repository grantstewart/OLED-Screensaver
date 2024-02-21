// Initialize Cast receiver context
const castContext = cast.framework.CastReceiverContext.getInstance();

// Set up the Cast receiver context options
const options = new cast.framework.CastReceiverOptions();
options.statusText = 'Ready to display';
options.maxInactivity = 3600; // seconds before closing the app due to inactivity

// Handle the system state change events
castContext.addEventListener(
  cast.framework.system.EventType.SYSTEM_STATE_CHANGED,
  function(event) {
    console.log(`Received system state change event: ${event.data}`);
  }
);

// Start the Cast receiver application
castContext.start(options);

const context = cast.framework.CastContext.getInstance();
context.setOptions({
  receiverApplicationId: '0FB43A87',
  autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
});



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

function startCasting() {
  const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
  if (castSession) {
    // A session is already active; handle appropriately
  } else {
    // Request casting
    cast.framework.CastContext.getInstance().requestSession();
  }
}

// Add to your receiver script
const namespace = 'your_namespace'; // Same as used in the sender app

castContext.addCustomMessageListener(namespace, (event) => {
  console.log('Received message:', event.data);
  // Handle the message. For example, start or stop the screensaver based on the message
});

