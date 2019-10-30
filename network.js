/**
 * Network class. 
 * Network can have same covered ratio with different fitness.... 
 * The best is the one with 1 as covered ratio and higher fitness value.... 
 * Fitness is inversely proportional to number of sensor nodes used and number of links in network.... 
 */
class Network {
    constructor (number_of_sensor_nodes) {
        this.sensorNodes = new Array(number_of_sensor_nodes);
        this.coveredRatio = 0;      // It should reach 1
    }

    /**
     * Function to add sensor nodes. 
     */
    addSensorNodes(nodes) {
        this.sensorNodes = nodes;
    }

    /**
     * Function to add sensor node to network.. 
     */
    addSensorNode () {
        let newNode = generateSensorNode(),
            tryLimit = 20,        // If yellow box is full- isCloseEnough will always return true.... we need this limit to stop in such case... 
            counter = 0;
        while (isCloseEnough(this.sensorNodes, newNode)) {
            newNode = generateSensorNode();
            counter++;
        }
        if (counter == tryLimit)   {
            console.log("not added")
            return;
        } 
        // Now we have to generate links.... 
        this.sensorNodes.forEach ((sensorNode, index) => {
            if (newNode.distanceFrom(sensorNode) < COMMUNICATION_RANGE)
                newNode.addLink(index);
        });
        this.sensorNodes.push(newNode);
        // console.log(this.sensorNodes.length + " is the size...")
    }

    /**
     * Function to delete a sensor network.... 
     * Randomly chooses a node to delete.... 
     */
    deleteSensorNode () {
        let deleteNodeIndex = floor (random(this.sensorNodes.length));
        // Deleting nodes from sensor network..... 
        this.sensorNodes = this.sensorNodes.filter ((_, index) => index != deleteNodeIndex);
        // Deleting the node's links in other nodes.... 
        this.sensorNodes.forEach ((sensorNode) => sensorNode.deleteSensorNode(deleteNodeIndex));
    }

    /**
     * Function to add link between two nodes.... 
     * Add a new link on this sensor node.... 
     */
    addSensorLink (sensor_index) {
        this.sensorNodes[sensor_index].addSensorLink();
    }

    /**
     * Function to delete a link from network.. 
     * Both side truth.... 
     */
    deleteSensorLink (sensor_index, linked_sensor_index) {
        if (sensor_index == linked_sensor_index)    return;
        this.sensorNodes[sensor_index].deleteSensorLink (linked_sensor_index);
        this.sensorNodes[linked_sensor_index].deleteSensorLink (sensor_index);
    }

    /**
     * Creating a copy of this network.... 
     */
    copy () {
        let newNetwork = new Network (this.sensorNodes.length);
        let sensorNodesCopy = [];
        this.sensorNodes.forEach ((node) => sensorNodesCopy.push(node.copy()))
        newNetwork.addSensorNodes(sensorNodesCopy);
        return newNetwork;
    }

    /**
     * Display the sensor network. 
     */
    display (enableLinks) {
        push ();
            let linkedNode;
            this.sensorNodes.forEach ((node) => {
                noStroke();
                fill(0, 255, 0);
                ellipse(node.position.x, node.position.y, 8, 8);
                if (enableLinks) {                
                    stroke(255);
                    strokeWeight(0.5);
                    node.links.forEach ((linkedNodeIndex) => {                    
                        linkedNode = this.sensorNodes[linkedNodeIndex];
                        line (node.position.x, node.position.y, linkedNode.position.x, linkedNode.position.y);
                    });
                }
            });
        pop();
    }

    /**
     * Function to find the cells covered by this network. 
     * grid is global var in sketch.js file. 
     */
    findCellsCovered () {
        let pointA,
            pointB,
            cellsCovered = 0,
            coveredGrids = [];          // To count each grid only once.  ..... 
        this.sensorNodes.map ((sensorNode) => {     // For each node..... 
            pointA = sensorNode.position;
            sensorNode.links.map ((linkedNodeIndex) => {         // Cover all it's linked nodes...... 
                pointB = this.sensorNodes[linkedNodeIndex].position;
                grid.map ((cell, index) => {            // Go through every grid cell.... 
                    if (!coveredGrids.includes(index) && collideLineRect (pointA.x, pointA.y, pointB.x, pointB.y, cell.position.x, cell.position.y, cell.resolution, cell.resolution)) {
                        coveredGrids.push(index);
                        cellsCovered++;
                    }
                });
            });
        });
        return cellsCovered;
    }

    /**
     * Function to calculate number of links in this sensor network.... 
     */
    findNumberOfLinks () {
        let linkCount = 0;
        this.sensorNodes.map ((sensorNode) => { linkCount += sensorNode.links.length });
        return linkCount / 2;
    }

    /**
     * Calculating fitness of network. 
     * Depends on percent of number of cells covered, number of sensor nodes used, number of links defined. 
     */
    calculateFitness (total_cells) {
        // find cells covered by this network. 
        // find number of sensors and number of links...... 
        this.coveredRatio =  this.findCellsCovered()// / total_cells;
        // let fitness = pow (this.coveredRatio, 2) / (this.sensorNodes.length * this.findNumberOfLinks());
        let fitness = (pow (this.coveredRatio, 2)) - this.sensorNodes.length - this.findNumberOfLinks();
        // console.log(this.coveredRatio)
        return fitness;
    }
}