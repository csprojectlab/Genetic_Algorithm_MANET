/**
 * Network class. 
 */
class Network {
    constructor (number_of_sensor_nodes) {
        this.sensorNodes = new Array(number_of_sensor_nodes);
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
        for (let node of this.sensorNodes)
            node.display();
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
        // For each sensor node. 
        for (let sNode = 0; sNode < this.sensorNodes.length; sNode++) {
            pointA = this.sensorNodes[sNode].position;
            // Go through all its links. ..... 
            for (let linkNode = 0; linkNode < this.sensorNodes[sNode].links.length; linkNode++) {
                pointB = this.sensorNodes[sNode].links[linkNode].position;
                // Check grid rectangles collision...... 
                for (let r = 0; r < grid.length; r++) {
                    if (!coveredGrids.includes(r) && collideLineRect (pointA.x, pointA.y, pointB.x, pointB.y, grid[r].position.x, grid[r].position.y, grid[r].resolution, grid[r].resolution)) {
                        coveredGrids.push(r);
                        cellsCovered++;
                    }
                }
            }
        }
        return cellsCovered;
    }

    /**
     * Calculating fitness of network. 
     * Depends on percent of number of cells covered, number of sensor nodes used, number of links defined. 
     */
    calculateFitness (total_cells) {
        // find cells covered by this network. 
        let coveredRatio =  this.findCellsCovered() / total_cells;
        return coveredRatio;
    }
}