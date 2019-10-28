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
     * Display the sensor network. 
     */
    display () {
        this.sensorNodes.map ((node) => node.display());
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
            sensorNode.links.map ((linkedNode) => {         // Cover all it's linked nodes...... 
                pointB = linkedNode.position;
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
        this.coveredRatio =  this.findCellsCovered() / total_cells;
        let fitness = this.coveredRatio / (this.sensorNodes.length * this.findNumberOfLinks());
        return fitness;
    }
}