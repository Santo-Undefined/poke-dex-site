const capitalizeFirstCharacter = (word) => {
  return word[0].toUpperCase() + word.slice(1);
};

const makePokemonTypesHTML = (types) => {
  const typesHTML = [];
  for (const type of types) {
    typesHTML.push(
      `<div class="poke-type ${type}">
      <p>${capitalizeFirstCharacter(type)}</p>
    </div>`,
    );
  }
  return typesHTML.join("\n");
};

const makePokemonCardHTML = (pokeData) => {
  return `<div class="card">
  <div class="card-image card-content-border">
    <img
      src="${pokeData.photo}"
      alt="photo of ${pokeData.name}"
    >
  </div>
  <div class="poketitle card-content-border">
    <div class="poke-name"><h2>${
    capitalizeFirstCharacter(pokeData.name)
  }</h2></div>
    ${makePokemonTypesHTML(pokeData.types)}
  </div>
  <div class="poke-info card-content-border">
    <table>
      <tbody>
        <tr>
          <td class="poke-stats">Weight</td>
          <td class="poke-stats-value">${pokeData.weight}</td>
        </tr>
        <tr>
          <td class="poke-stats">Base XP</td>
          <td class="poke-stats-value">${pokeData.basexp}</td>
        </tr>
        <tr>
          <td class="poke-stats">HP</td>
          <td class="poke-stats-value">${pokeData.hp}</td>
        </tr>
        <tr>
          <td class="poke-stats">Attack</td>
          <td class="poke-stats-value">${pokeData.attack}</td>
        </tr>
        <tr>
          <td class="poke-stats">Defense</td>
          <td class="poke-stats-value">${pokeData.defense}</td>
        </tr>
        <tr>
          <td class="poke-stats">Speed</td>
          <td class="poke-stats-value">${pokeData.speed}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
`;
};

export const makeAllPokemonCardHTML = (allPokemonData) => {
  const allPokemoneHTMLcards = [];

  for (const pokemon in allPokemonData) {
    allPokemoneHTMLcards.push(makePokemonCardHTML(allPokemonData[pokemon]));
  }

  return allPokemoneHTMLcards.join("\n");
};
