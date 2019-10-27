class Population {
    constructor (population_size, mutation_rate, dominance, tournament_size, cell_count) {
       this.size = population_size;
       this.mutationRate = mutation_rate;
       this.elitism = dominance;
       this.networks = [];
       this.tournamentSize = tournament_size;
       this.bestFitnessValue = 0;
       this.bestNetworkIndex = 0;
       this.numberOfCells = cell_count;
    }

    /**
     * boot function. 
     * Using temperature and cooling rate parameters. 
     */
    boot (sensor_networks, _temperature, cooling_rate) {

    }

}