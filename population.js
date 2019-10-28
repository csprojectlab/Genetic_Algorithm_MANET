class Population {
    constructor (population_size, mutation_rate, dominance, tournament_size, cell_count) {
       this.size = population_size;
       this.mutationRate = mutation_rate;
       this.elitism = dominance;
       this.networks = [];
       this.tournamentSize = tournament_size;
       this.bestNetworkIndex = 0;
       this.numberOfCells = cell_count;
    }

    /**
     * boot function. 
     * Using temperature and cooling rate parameters. 
     */
    boot (sensor_network, _temperature, cooling_rate) {
        let currentNetwork = new Network(sensor_network.length),
            newNetwork,
            fitnessDiff = 0;
        currentNetwork.addSensorNodes(sensor_network);
        this.networks.push(currentNetwork);
        // Adding networks to the population... 
        while (this.networks.length < this.size) {
            newNetwork = new Network (sensor_network.length);
            newNetwork.addSensorNodes(generateSensorNetwork());
            // Calculate the fitnss for evaluation of best till now... 
            currentNetwork.calculateFitness(this.numberOfCells);
            newNetwork.calculateFitness(this.numberOfCells);
            if (newNetwork.fitness > currentNetwork.fitness) {
                this.networks.push(newNetwork);
                currentNetwork = newNetwork;
            } else {
                fitnessDiff = currentNetwork.fitness - newNetwork.fitness;
                if (this.acceptanceProbability (fitnessDiff, _temperature) > Math.random())
                    this.networks.push(newNetwork);
            }
            _temperature *= 1 - cooling_rate;
        }   // end of while loop..... 
    }

    /**
     * accept probability function. 
     * Returning Euler's exponential value. 
     */
    acceptanceProbability (fitness_difference, temperature) {
        return Math.exp(fitness_difference / temperature);
    }

}