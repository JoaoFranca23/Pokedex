/* Função para buscar os dados da api*/
const pokemonName = document.querySelector(".pokemonName");
const pokemonNumber = document.querySelector(".pokemonNumber");
const pokemonImage = document.querySelector(".pokemonImage");

const form = document.querySelector(".form");
const input = document.querySelector(".inputSearch");
const btnPrev = document.querySelector(".btnPrev");
const btnNext = document.querySelector(".btnNext");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

/* pegar os dados e jogar na tela*/

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";
  const data = await fetchPokemon(pokemon);
  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    input.value = "";
    searchPokemon = data.id;
    pokemonImage.style.display = "block";
  } else {
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Not found :(";
    pokemonNumber.innerHTML = "";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
  input.value = "";
});

btnPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});
btnNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});
renderPokemon(searchPokemon);
