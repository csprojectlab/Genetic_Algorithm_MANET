/**
 * Background grid class.
 */
class Grid {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.resolution = RESOLUTION;
  }

  /**
   * Display the grid.
   */
  show() {
    stroke(0, 0, 255);
    noFill();
    rect(this.position.x, this.position.y, this.resolution, this.resolution);
  }
}
