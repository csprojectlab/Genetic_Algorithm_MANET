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
      NODE_MR = 0.05,
      LINK_MR = 1-NODE_MR,
      REDUCER = (current_max, value) => Math.max(current_max, value); 
var numberOfSensorNodes = 2,
    population,
    grid = [],          // Background blue grid. 
    yellowBox = { x : 210, y : 120, width : 150, height : 90},          // This is very important aspect. 
    // yellowBox = {x : 0, y : 0, width : 600, height : 330},
    domainCount = 1,
    coveredRatio = 0,
    // Interaction parameters....... 
    displayLinks = true,
    displayGrid = false,
    displayYellowBox = false,
    // Graph structures....
    linkHistory = [],
    nodeHistory = [];
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
    if (yellowBox.x == 0 && yellowBox.y == 0 && yellowBox.width == width / 2 && yellowBox.height == height / 2)
        return false;
    yellowBox.x -= RESOLUTION;
    if (yellowBox.x <= 0)   yellowBox.x = 0;
    yellowBox.y -= RESOLUTION;
    if (yellowBox.y <= 0)   yellowBox.y = 0;
    yellowBox.width += (2*RESOLUTION);
    if (yellowBox.width >= width / 2)   yellowBox.width = width / 2;
    yellowBox.height += (2*RESOLUTION);
    if (yellowBox.height >= height / 2)     yellowBox.height = height / 2;
    return true;
}

function keyPressed() {
    if (key == 'l' || key == 'L') {
        displayLinks = !displayLinks;
        console.log("Display Links: ", displayLinks);
    } else if (key == 'g' || key == 'G') {
        displayGrid = !displayGrid;
        console.log("Display Grid: ", displayGrid);
    } else if (key == 'y' || key == 'Y') {
        displayYellowBox = !displayYellowBox;
        console.log("Display yellow box: ", displayYellowBox);
    }
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
        line (0, 0, 0, height);
        displayAllSimulations();
    pop();
    push();
        translate(0, height / 2);
        stroke(255);
        strokeWeight(5);
        line (0, 0, width, 0);
        displayParameters();
    pop();
    push ();
        translate (width / 2, height / 2);
        stroke(255);
        strokeWeight(5)
        line (0, height / 4, width, height / 4)
        drawLinkGraph();
    pop();
    if (displayYellowBox) {
        stroke (255, 255, 0);
        noFill()
        rect (yellowBox.x, yellowBox.y, yellowBox.width, yellowBox.height)     // This is the range for initial generation of sensors. 
    }    
}

function backgroundGrid () {
   for (let g of grid)
        g.show();
}

function displaySimulation() {
    if (displayGrid)
        backgroundGrid();
    population.fittest();
   
    if (!population.evolve()) {
        console.log("Domain Ended: ", domainCount)
        domainCount++;
        coveredRatio = ((population.networks[population.bestNetworkIndex].findCellsCovered()) / (findNumberOfCells())) * 100;
        console.log("Covered Ratio: ", coveredRatio)
        // noLoop();
        population.currentGeneration = 1;
        if (!increaseYellowBoxSize()) {
            console.log("Finished.")
            noLoop();
        }
    }
    population.display(displayLinks);
}

function displayAllSimulations() {
    population.displayAll(displayLinks);
}

function displayParameters() {
    let offset = 30,
        y = 0;
    // stroke(0, 255, 255);
    fill(0, 255, 0)
    noStroke();
    textSize(24);
    text ("Population: " + POPULATION_SIZE, 15, y += offset)
    text ("Generations/Population: " + GENERATIONS_PER_POPULATION, 15, y += offset)
    text ("Tournament Size: " + TOURNAMENT_SIZE, 15, y += offset)
    text ("Current Domain: " + domainCount, 15, y += offset);
    text ("Temperature: " + TEMPERATURE, 15, y += offset);
    text ("Cooling Rate: " + COOLING_RATE, 15, y += offset);
    text ("Current Generation: " + population.currentGeneration + "/" + GENERATIONS_PER_POPULATION, 15, y += offset)
    text ("Domain Area Covered: " + nf ((population.networks[population.bestNetworkIndex].coveredRatio / findNumberOfCells()) * 100, 0, 2) + "%", 15, y += offset)
    text ("Link Mutation Rate: " + LINK_MR, 15, y += offset);
    text ("Node Mutation Rate: " + NODE_MR, 15, y += offset)
}

function drawLinkGraph () {
    textSize(24);
    noStroke();
    fill(255, 255, 0);
    text ("Links Count Graph", 200, 30)
    if (linkHistory.length == GENERATIONS_PER_POPULATION)
        linkHistory = [];
    linkHistory.push(population.networks[population.bestNetworkIndex].findNumberOfLinks())
    stroke(0, 0, 255);
    strokeWeight(1);
    let maxValue = linkHistory.reduce (REDUCER),
        offset = 0,
        xoffset = 20;
    for (let i = 0; i < linkHistory.length; i++) {
        line (xoffset + offset, 150, xoffset + offset, 150 - (linkHistory[i] / maxValue)*100);
        xoffset += 1;
        offset++;
    }
}
