import { POKEMON_TYPES } from "./pokemone_types.js";

const makePagePath = (type) => type === "all" ? "/" : `/${type}.html`;

const makeTypesNavigation = (pageType) => {
  const navigationHTML = [];
  for (const type of POKEMON_TYPES) {
    const navBGcolor = type === pageType ? `active-nav` : `nav-item`;
    navigationHTML.push(
      `<li class="${type}" ><a class="${navBGcolor}" href="${
        makePagePath(type)
      }">${type}</a></li>`,
    );
  }
  return navigationHTML.join("\n");
};

export const makeNavigation = (pageType) =>
  `<div class="side-bar">
      <nav>
        <ul>
          ${makeTypesNavigation(pageType)}
        </ul>
      </nav>
    </div>`;
