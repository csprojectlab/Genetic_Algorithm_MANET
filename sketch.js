const C_WIDTH = 1200,
      C_HEIGHT = 660,       // Canvas size. 
      RESOLUTION = 30,      // Grid parameter
      COMMUNICATION_RANGE = 80,
      POPULATION_SIZE = 10,
      MUTATION_RATE = 0.03,
      TOURNAMENT_SIZE = 10,
      TEMPERATURE = 1000,
      COOLING_RATE = 0.03;
var numberOfSensorNodes = 20,
    population,
    grid = [];          // Background blue grid. 
var net;
/**
 * Function to randomly generate sensor network. 
 */
function generateSensorNetwork () {
    let sensorNetwork = [];
    for (let i = 1; i <= numberOfSensorNodes; i++) 
        sensorNetwork.push (new SensorNode(random (width / 11, width / 11 + 300), random (height / 7, height / 7 + 150)));
    for (let i = 0; i < numberOfSensorNodes; i++) {
       for (let j = i + 1; j < numberOfSensorNodes; j++) {
           if (sensorNetwork[i].distanceFrom(sensorNetwork[j]) < COMMUNICATION_RANGE) {
               sensorNetwork[i].addLink(sensorNetwork[j]);
               sensorNetwork[j].addLink(sensorNetwork[i]);
           }
       }
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
    net = new Network(sensorNetwork.length)
    net.addSensorNodes(sensorNetwork);
}

/**
 * Draw function. 
 * Loops 60 times a second (if it can process 60 frames.)
 */
function draw () {
    background(0);
    stroke (255, 255, 0);
    noFill()
    rect (width / 11, height / 7, 300, 150)     // This is the range for initial generation of sensors. 
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
    net.display();
}

function displayParameters() {

}

function displayGraph() {

}
