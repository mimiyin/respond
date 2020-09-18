// Open and connect input socket
// let socket = io("/audience");
let start = false;
let audio;
let sum = 0;
let tested = false;
let completed = false;
// Timer for testing the mic
let tts = 0;
// Intro text
let intro;

// Listen for confirmation of connection
// socket.on("connect", () => {
//   console.log("Connected");
//
//   // Log in with the usher
//   socket.emit('data', 0);
// });

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  // Get the stream
  getStream(() => {
    // Listen for the start status
    // socket.on('start', _start => {
    //   if (completed) {
    //     console.log("START?", _start);
    //     start = _start;
    //     audio.enabled = start;
    //     background(0);
    //   }
    // });

  });

  // Grab intro div
  intro = select("div");
}

// Toggle Mic
function toggle(seconds) {
  audio.enabled = start;
  if (!start) background(0);
  console.log("START?", start, seconds);
  setTimeout(() => {
    start = !start;
    let delay = start ? random(1, 5) : random(3, 15);
    delay = floor(delay);
    toggle(delay);
  }, seconds * 1000);
}

function draw() {
  // Welcome messaging
  if (!completed) {
    // Mic not working yet
    if (!tested) {
      // Give up after 30 seconds
      if (millis() > 30000) {
        background(0);
        intro.html("Nothing?<br><br>Reload to try again. Use Safari on iOS.");
      } else if (sum > 5000) {
        console.log("Mic works!");
        tested = true;
        tts = millis();
      }
      // Mic is working...wait another 10 seconds
    } else {
      // Has it been 10 seconds since tested?
      if (millis() - tts > 10000) {
        console.log("Completed!");
        completed = true;
        intro.hide();
        toggle(5);
        // Get the start status.
        // socket.emit('get start');
        background(0);
      } else {
        intro.html("Good.<br><br>Now leave this window open and return to the live stream.");
      }
    }
  }

  // Draw audio feedback
  let sz = 0;
  if (tested) sz = map(sum, 0.1, 1, 0, 5);
  else sz = map(sum, 0.1, 10, 0, 5);

  fill(255, 2);
  noStroke();
  ellipse(random(width), random(height), sz, sz);
}
