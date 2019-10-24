class Population {
    constructor (population_size, mutation_rate, dominance, tournament_size) {
       this.size = population_size;
       this.mutationRate = mutation_rate;
       this.elitism = dominance;
       this.networks = [];
       this.bestFitnessValue = 0;
       this.bestNetworkIndex = 0;
    }

    /**
     * boot function. 
     * Using temperature and cooling rate parameters. 
     */
    boot (sensor_networks, _temperature, cooling_rate) {
        
    }

}