/**
 * Network class. 
 */
class Network {
    constructor (number_of_sensor_nodes) {
        this.sensorNodes = new Array(number_of_sensor_nodes);
        this.links = [];
    }

    /**
     * Function to add sensor nodes. 
     */
    addSensorNodes(nodes) {
        this.sensorNodes = nodes;
    }

    /**
     * Function to add links. 
     */
    addLinks (node_links) {
        this.links = node_links;
    } 
}