const C_WIDTH = 1200,
      C_HEIGHT = 660,       // Canvas size. 
      RESOLUTION = 30,      // Grid parameter
      COMMUNICATION_RANGE = 80,
      POPULATION_SIZE = 10,
      MUTATION_RATE = 0.03,
      TOURNAMENT_SIZE = 10,
      TEMPERATURE = 1000,
      COOLING_RATE = 0.03,
      GENERATIONS_PER_POPULATION = 200,
      ADD_NODE_M_R = 0.03,
      DELETE_NODE_M_R = 0.01;
var numberOfSensorNodes = 2,
    population,
    grid = [],          // Background blue grid. 
    yellowBox = { x : 210, y : 120, width : 150, height : 90};          // This is very important aspect. 
var added = 0,
    deleted = 0;
/**
 * Function to randomly generate sensor network. 
 */
function generateSensorNetwork () {
    let sensorNetwork = [];
    let i = 1;
    while (i <= numberOfSensorNodes) {
        let newSensorNode = new SensorNode(random (yellowBox.x, yellowBox.x + yellowBox.width), random (yellowBox.y, yellowBox.y + yellowBox.height));
        if (!isCloseEnough(sensorNetwork, newSensorNode)) {
            sensorNetwork.push (newSensorNode);
            i++;
        }
    }
    for (let i = 0; i < numberOfSensorNodes; i++) {
       for (let j = i + 1; j < numberOfSensorNodes; j++) {
           if (sensorNetwork[i].distanceFrom(sensorNetwork[j]) < COMMUNICATION_RANGE) {
               sensorNetwork[i].addLink(j);
               sensorNetwork[j].addLink(i);
           }
       }
    }
    return sensorNetwork;
}

/**
 * Function to randomly generate sensor node...   
 */
function generateSensorNode () {
    let node = new SensorNode(random (yellowBox.x, yellowBox.x + yellowBox.width), random (yellowBox.y, yellowBox.y + yellowBox.height));
    return node;
}

/**
 * Function to check if node is too close to any other sensor node. 
 */
function isCloseEnough (sensorNetwork, sensorNode) {
    for (let i = 0; i < sensorNetwork.length; i++) {
        let d = dist (sensorNetwork[i].position.x, sensorNetwork[i].position.y, sensorNode.position.x, sensorNode.position.y);
        if (d < (COMMUNICATION_RANGE / 2))
            return true;
    }
    return false;
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

 /**
  * Function to increase yellow box size.... 
  */
function increaseYellowBoxSize () {
    yellowBox.x -= RESOLUTION;
    if (yellowBox.x <= 0)   yellowBox.x = 0;
    yellowBox.y -= RESOLUTION;
    if (yellowBox.y <= 0)   yellowBox.y = 0;
    yellowBox.width += (2*RESOLUTION);
    if (yellowBox.width >= width / 2)   yellowBox.width = width / 2;
    yellowBox.height += (2*RESOLUTION);
    if (yellowBox.height >= height / 2)     yellowBox.height = height / 2;
}

function setup () {
    createCanvas(C_WIDTH, C_HEIGHT);
    background(0)
    let sensorNetwork = generateSensorNetwork(),
        elitism = true,
        numberOfCells = findNumberOfCells();
    grid = generateBackgroundGrid();
    population = new Population (POPULATION_SIZE, MUTATION_RATE, elitism, TOURNAMENT_SIZE, numberOfCells, GENERATIONS_PER_POPULATION);
    population.boot(sensorNetwork, TEMPERATURE, COOLING_RATE);
    // frameRate(5)
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
    stroke (255, 255, 0);
    noFill()
    rect (yellowBox.x, yellowBox.y, yellowBox.width, yellowBox.height)     // This is the range for initial generation of sensors. 
}

function backgroundGrid () {
   for (let g of grid)
        g.show();
}

function displaySimulation() {
    backgroundGrid();
    population.fittest();
   
    if (!population.evolve()) {
        console.log("Population evolved.")
        console.log("A: " + added, "D: " + deleted)
        // noLoop();
        population.currentGeneration = 1;
        increaseYellowBoxSize();
    }
    population.display();
}

function displayParameters() {

}

function displayGraph() {

}
