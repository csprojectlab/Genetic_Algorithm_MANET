class SensorNode {
    constructor (x, y) {
        this.position = createVector (x, y);
    }

    /**
     * Function to return distance from another sensor node. 
     */
    distanceFrom (otherSensorNode) {
        let otherPosition = otherSensorNode.position;
        let distance = this.position.dist(otherPosition);
        return distance;
    }
}