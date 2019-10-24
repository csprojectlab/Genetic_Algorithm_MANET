class SensorNode {
    constructor (x, y) {
        this.position = createVector (x, y);
        this.links = [];
    }

    /**
     * Function to return distance from another sensor node. 
     */
    distanceFrom (otherSensorNode) {
        let otherPosition = otherSensorNode.position;
        let distance = this.position.dist(otherPosition);
        return distance;
    }

    /**
     * Function to add links. 
     */
    addLinks (node_links) {
        this.links = node_links;
    }
}