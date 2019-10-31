class Population {
  constructor(
    population_size,
    mutation_rate,
    dominance,
    tournament_size,
    cell_count,
    generation_count
  ) {
    this.size = population_size;
    this.mutationRate = mutation_rate;
    this.elitism = dominance;
    this.networks = [];
    this.tournamentSize = tournament_size;
    this.bestNetworkFitness = 0;
    this.bestNetworkIndex = 0;
    this.numberOfCells = cell_count;
    this.generations = generation_count;
    this.currentGeneration = 1;
  }

  /**
   * boot function.
   * Using temperature and cooling rate parameters.
   */
  boot(sensor_network, _temperature, cooling_rate) {
    let currentNetwork = new Network(sensor_network.length),
      currentNetworkFitness = 0,
      newNetwork,
      newNetworkFitness = 0,
      fitnessDiff = 0;
    currentNetwork.addSensorNodes(sensor_network);
    this.networks.push(currentNetwork);
    // Adding networks to the population...
    while (this.networks.length < this.size) {
      newNetwork = new Network(sensor_network.length);
      newNetwork.addSensorNodes(generateSensorNetwork());
      // Calculate the fitnss for evaluation of best till now...
      currentNetworkFitness = currentNetwork.calculateFitness(
        this.numberOfCells
      );
      newNetworkFitness = newNetwork.calculateFitness(this.numberOfCells);
      if (newNetworkFitness > currentNetworkFitness) {
        this.networks.push(newNetwork);
        currentNetwork = newNetwork;
      } else {
        fitnessDiff = currentNetworkFitness - newNetworkFitness;
        if (
          this.acceptanceProbability(fitnessDiff, _temperature) > Math.random()
        )
          this.networks.push(newNetwork);
      }
      _temperature *= 1 - cooling_rate;
    } // end of while loop.....
  }

  /**
   * accept probability function.
   * Returning Euler's exponential value.
   */
  acceptanceProbability(fitness_difference, temperature) {
    return Math.exp(fitness_difference / temperature);
  }

  /**
   * Finding fittest of all networks....
   */
  fittest() {
    let fittestValue = this.networks[0].calculateFitness(this.numberOfCells),
      fitValue = 0;
    this.bestNetworkIndex = 0;
    this.networks.forEach((sensorNetwork, index) => {
      if (index == 0) return;
      fitValue = sensorNetwork.calculateFitness(this.numberOfCells);
      if (fitValue > fittestValue) {
        fittestValue = fitValue;
        this.bestNetworkIndex = index;
      }
    });
    this.bestNetworkFitness = fittestValue;
  }

  /**
   * tournament selection funciton.
   * Creates a pool according to tournament size at random.
   * Selects the fittest from the tournament bucket.
   * Returns the fittest network
   */
  tournamentSelection() {
    let networkTournamentIndex = [],
      randomIndex;
    // Selecting some of the networks from population at random...
    // Storing the indices...
    while (networkTournamentIndex.length < this.tournamentSize) {
      randomIndex = floor(random() * this.size);
      if (!networkTournamentIndex.includes(randomIndex))
        networkTournamentIndex.push(randomIndex);
    }
    let fittestNetwork = this.networks[networkTournamentIndex[0]],
      fittestValue = this.networks[networkTournamentIndex[0]].calculateFitness(
        this.numberOfCells
      ),
      fitValue = 0;
    networkTournamentIndex.forEach((networkIndex, index) => {
      if (index == 0) return;
      fitValue = this.networks[networkIndex].calculateFitness(
        this.numberOfCells
      );
      if (fitValue > fittestValue) {
        fittestValue = fitValue;
        fittestNetwork = this.networks[networkIndex];
      }
    });
    return fittestNetwork.copy();
  }

  /**
   * function to evolve population to next generation...
   */
  evolve() {
    this.currentGeneration++;
    // console.log(this.currentGeneration)
    if (this.currentGeneration == this.generations) return false; // No evolution happened.... limit reached...
    let newNetworks = [],
      selectedNetwork,
      elitismOffset = 0,
      sensorIndices = [],
      sensorIndex;
    if (this.elitism) {
      newNetworks.push(this.networks[this.bestNetworkIndex]); // Adding the best network already to the new generation...
      elitismOffset = 1;
    }
    for (let i = elitismOffset; i < this.size; i++) {
      selectedNetwork = this.tournamentSelection(); // A copy of best network in tournament is returned.
      if (random(1) < 0.05) {
        // Be carefull here....
        if (random(1) < 0.1) {
          // Add or delete a sensor node...
          selectedNetwork.addSensorNode();
        } else {
          selectedNetwork.deleteSensorNode();
        }
      } else {
        // delete a link....
        for (let i = 0; i < selectedNetwork.sensorNodes.length / 2; i++) {
          sensorIndex = floor(random(selectedNetwork.sensorNodes.length));
          if (!sensorIndices.includes(sensorIndex))
            sensorIndices.push(sensorIndex);
        }
        sensorIndices.forEach(sensor_index => {
          for (
            let i = 0;
            i < selectedNetwork.sensorNodes[sensor_index].links.length;
            i++
          ) {
            let linkedNodeIndex = floor(
              random(selectedNetwork.sensorNodes[sensor_index].links.length)
            );
            selectedNetwork.deleteSensorLink(sensor_index, linkedNodeIndex);
          }
        });
        sensorIndices = [];
      }

      newNetworks.push(selectedNetwork);
    }
    this.networks = newNetworks;
    return true; // Population evolved to next generation...
  }

  /**
   * Display the best network...
   */
  display(enableLinks) {
    this.networks[this.bestNetworkIndex].display(enableLinks);
  }

  /**
   * Display all the networks....
   */
  displayAll(enableLinks) {
    this.networks.forEach(network => network.display(enableLinks));
  }
}
