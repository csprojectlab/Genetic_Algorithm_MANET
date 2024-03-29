class SensorNode {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.links = [];
  }

  /**
   * Function to return distance from another sensor node.
   */
  distanceFrom(otherSensorNode) {
    let otherPosition = otherSensorNode.position;
    let distance = this.position.dist(otherPosition);
    return distance;
  }

  /**
   * Function to add completely new links.
   */
  addLinks(node_links) {
    this.links = node_links;
    return this.links;
  }

  /**
   * Function to add a single link.
   */
  addLink(sensor_node) {
    this.links.push(sensor_node);
    return sensor_node;
  }

  /**
   * Delete sensor node
   */
  deleteSensorNode(delete_node_index) {
    for (let i = this.links.length - 1; i >= 0; i--) {
      if (this.links[i] == delete_node_index) this.links.splice(i, 1);
      else if (this.links[i] > delete_node_index) this.links[i]--;
    }
  }

  /**
   * Deleting sensor link...
   */
  deleteSensorLink(link_index) {
    for (let i = this.links.length - 1; i >= 0; i--) {
      if (this.links[i] == link_index) {
        this.links.splice(i, 1);
        break;
      }
    }
  }

  /**
   * Creating a copy of this node....
   */
  copy() {
    let newNode = new SensorNode(this.position.x, this.position.y);
    newNode.addLinks(this.links.slice());
    return newNode;
  }

  /**
   * Display function.
   */
  display() {
    push();
    noStroke();
    fill(0, 255, 0);
    ellipse(this.position.x, this.position.y, 8, 8);
    stroke(255);
    strokeWeight(0.2);
    for (let i = 0; i < this.links.length; i++) {
      line(
        this.position.x,
        this.position.y,
        this.links[i].position.x,
        this.links[i].position.y
      );
    }
    pop();
  }
}
