const C_WIDTH = 1200,
      C_HEIGHT = 660,       // Canvas size. 
      RESOLUTION = 30,      // Grid parameter
      COMMUNICATION_RANGE = 90,
      POPULATION_SIZE = 10,
      MUTATION_RATE = 0.03,
      TOURNAMENT_SIZE = 10,
      TEMPERATURE = 1000,
      COOLING_RATE = 0.03;
var numberOfSensorNodes = 12,
    population,
    grid = [];          // Background blue grid. 

/**
 * Function to randomly generate sensor network. 
 */
function generateSensorNetwork () {
    let xoffset = COMMUNICATION_RANGE - 50,     // Carefull here. 
        yoffset = (height / 2) - 40,
        sensorNetwork = [];
    for (let i = 1; i <= numberOfSensorNodes; i++) 
        sensorNetwork.push (new SensorNode(xoffset * i, yoffset));
    for (let i = 0; i < numberOfSensorNodes; i++) {
        if (i > 0)
            sensorNetwork[i].addLink(i - 1);
        if (i < numberOfSensorNodes - 1)
            sensorNetwork[i].addLink(i  + 1);
    }
    return sensorNetwork;
}

/**
 * Function to generate grid
 */
function generateBackgroundGrid () {
    let temp = [];
    for (let j = 0; j < height / 2; j += RESOLUTION) 
        for (let i = 0; i < width / 2; i += RESOLUTION)
            temp.push (new Grid (i, j));
    return temp;
}

/**
 * Setup function. 
 */
function setup () {
    createCanvas(C_WIDTH, C_HEIGHT);
    let sensorNetwork = generateSensorNetwork(),
        elitism = true;
    grid = generateBackgroundGrid();
    population = new Population (POPULATION_SIZE, MUTATION_RATE, elitism, TOURNAMENT_SIZE);
    population.boot(sensorNetwork, TEMPERATURE, COOLING_RATE);
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
   for (let g of grid)
        g.show();
}

function displaySimulation() {
    backgroundGrid();
}

function displayParameters() {

}

function displayGraph() {

}
