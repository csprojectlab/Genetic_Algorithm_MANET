const C_WIDTH = 1100,
      C_HEIGHT = 650,       // Canvas size. 
      RESOLUTION = 20;      // Grid parameter

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
    fill(255);
    stroke(255)
    line (30, 30, 70, 70)
}

function displaySimulation() {
    backgroundGrid();
}

function displayParameters() {

}

function displayGraph() {

}
