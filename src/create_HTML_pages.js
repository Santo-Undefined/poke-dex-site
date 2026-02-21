import { POKEMON_TYPES } from "./pokemone_types.js";
import { makeNavigation } from "./make_sidebar_navigation.js";
import { makeAllPokemonCardHTML } from "./make_pokemon_HTML_cards.js";

const HTML_HEAD = `<head>
    <title>Pokedex</title>
    <link rel="stylesheet" href="/style.css">
    <link rel="stylesheet" href="/styles/card-style.css">
    <link rel="stylesheet" href="/styles/colors.css">
    <style>
    </style>
  </head>`;

const makeGallery = (pokemonesOfType) =>
  `<div class="gallery">
  ${makeAllPokemonCardHTML(pokemonesOfType)}
  </div>`;

const filterPokemoneOnType = (allPokemonData, type) => {
  const filteredPokemons = {};
  for (const pokemon in allPokemonData) {
    if (allPokemonData[pokemon].types.includes(type)) {
      filteredPokemons[pokemon] = allPokemonData[pokemon];
    }
  }
  return filteredPokemons;
};

const createHTMLpage = (pokemonData, type) =>
  `<html>
      ${HTML_HEAD}
      <body>
        <div class="main-page">
          ${makeNavigation(type)}
          ${makeGallery(pokemonData)}
        </div>
      </body>
    </html>`;

const readLocalPokemonData = () => {
  const rawData = Deno.readTextFileSync("./resources/pokemon_local_data.json");
  const allPokemonData = JSON.parse(rawData);
  return allPokemonData;
};

const createTypePages = () => {
  const allPokemonData = readLocalPokemonData();
  for (const type of POKEMON_TYPES) {
    const pokemonesOfType = filterPokemoneOnType(allPokemonData, type);
    const page = createHTMLpage(pokemonesOfType, type);

    Deno.writeTextFileSync(`./pages/${type}.html`, page);
  }
};

const createIndexPage = () => {
  const allPokemonData = readLocalPokemonData();
  const page = createHTMLpage(allPokemonData, "all");
  Deno.writeTextFileSync(`./index.html`, page);
};

createIndexPage();
createTypePages();
