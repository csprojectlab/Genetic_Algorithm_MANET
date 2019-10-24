class Population {
    constructor () {
        this.resolution = 20;       // For displaying grid. 
    }

    /**
     * Display the background grid. 
     */
    displayGrid () {
        stroke(0, 0, 255);
        strokeWeight(1);
        for (let i = this.resolution; i < width; i++)
            line (i, 0, i, height / 2);
    }
}