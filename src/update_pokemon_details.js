// ----------------------
// This code updates the local pokemon data
// ----------------------

/*
name    body.name
types[] body.types[].type.name
photo   body.sprites.other.dream_world.front_default
weight  body.weight
basexp  body.base_experience
HP      body.stats[index].stats.name === hp (where) body.stats[index].base_stat
Attack  body.stats[index].stats.name === attack (where) body.stats[index].base_stat
defense body.stats[index].stats.name === defense (where) body.stats[index].base_stat
speed   body.stats[index].stats.name === speed (where) body.stats[index].base_stat
*/

const updateLocalRecord = async (allPokemonData) => {
  const fileContent = JSON.stringify(allPokemonData, null, 2);
  await Deno.writeTextFile("./resources/pokemon_local_data.json", fileContent);
};

const processPokemonContent = (body) => {
  const pokemon = {};
  pokemon.name = body.name;
  pokemon.photo = body.sprites.other.dream_world.front_default;
  pokemon.types = body.types.map((type) => type.type.name);
  pokemon.weight = body.weight;
  pokemon.basexp = body.base_experience;
  pokemon.hp = body.stats.find((stat) => stat.stat.name === "hp").base_stat;
  pokemon.attack =
    body.stats.find((stat) => stat.stat.name === "attack").base_stat;
  pokemon.defense =
    body.stats.find((stat) => stat.stat.name === "defense").base_stat;
  pokemon.speed =
    body.stats.find((stat) => stat.stat.name === "speed").base_stat;

  return pokemon;
};

const processPokemonLinks = async (pokemonLinks) => {
  const allPokemonContent = {};
  for (const { url } of pokemonLinks.results) {
    const pokemon = await fetch(url)
      .then((data) => data.json());
    allPokemonContent[pokemon.name] = processPokemonContent(pokemon);
  }
  return allPokemonContent;
};

const getPokemonLinks = async (pokemonCount = 10000) =>
  await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonCount}`)
    .then((data) => data.json());

const getAllPokemonDetails = async () =>
  await processPokemonLinks(await getPokemonLinks());

const updatePokemonData = async () => {
  updateLocalRecord(await getAllPokemonDetails());
};

await updatePokemonData();
