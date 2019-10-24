const C_WIDTH = 1100,
      C_HEIGHT = 650,       // Canvas size. 
      RESOLUTION = 30;      // Grid parameter

/**
 * Setup function. 
 */
function setup () {
    createCanvas(C_WIDTH, C_HEIGHT);
}

/**
 * Draw function. 
 * Loops 60 times a second (if it can process 60 frames.)
 */
function draw () {
    background(0);
    push();
        displaySimulation();
    pop();
    push();
        translate(width / 2, 0);
        stroke(255);
        strokeWeight(5)
        line (0, 0, 0, height / 2);
        displayParameters();
    pop();
    push();
        translate(0, height / 2);
        stroke(255);
        strokeWeight(5);
        line (0, 0, width, 0);
        displayGraph();
    pop();
}

function backgroundGrid () {
    stroke(0,0,255)
    for (let i = RESOLUTION; i < width / 2; i += RESOLUTION)
        line (i, 0, i, height / 2);     // Vertical lines. 
    for (let i = RESOLUTION; i < height / 2; i += RESOLUTION)
        line (0, i, width/ 2, i);       // Horizontal lines.     
}

function displaySimulation() {
    backgroundGrid();
}

function displayParameters() {

}

function displayGraph() {

}
