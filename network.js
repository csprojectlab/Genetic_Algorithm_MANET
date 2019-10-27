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
     * Calculating fitness of network. 
     */
    calculateFitness () {
        
    }
}