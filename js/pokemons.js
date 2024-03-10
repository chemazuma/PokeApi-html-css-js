const galeria = document.getElementById('galeria');

// Función para obtener imágenes de Pokémon y crear la galería
async function crearGaleria() {
    try {
        // Realizar solicitud a la PokeAPI para obtener los primeros 20 Pokémon
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        const listaPokemon = data.results;

        // Iterar sobre la lista de Pokémon y obtener la información deseada de cada uno
        for (const pokemon of listaPokemon) {
            const pokemonData = await getPokemonData(pokemon.url);
            const pokemonName = capitalizeFirstLetter(pokemonData.name);
            const pokemonId = pokemonData.id;
            //const pokemonIMG = pokemonData.sprites.other["official-artwork"].front_default;
            const pokemonIMG = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`
            const pokemonTypes = pokemonData.types.map(type => type.type.name).join(', ');
        
            // Crear un elemento div para mostrar la información del Pokémon
            const pokemonInfo = document.createElement('div');
            pokemonInfo.classList.add('pokemon-info');

            // Crear elementos para mostrar el nombre, ID, imagen y tipos del Pokémon
            const namePokemon = document.createElement('p');
            namePokemon.textContent = `${pokemonName}`;

            const idPokemon = document.createElement('p');
            idPokemon.textContent = `#${pokemonId}`;

            const imgPokemon = document.createElement('img');
            imgPokemon.src = pokemonIMG;
            imgPokemon.alt = pokemonName;

            const tiposPokemon = document.createElement('p');
            tiposPokemon.textContent = `${pokemonTypes}`;

            // Agregar los elementos al contenedor de información del Pokémon
            pokemonInfo.appendChild(namePokemon);
            pokemonInfo.appendChild(idPokemon);
            pokemonInfo.appendChild(imgPokemon);
            pokemonInfo.appendChild(tiposPokemon);

            // Agregar el contenedor del Pokémon a la galería
            galeria.appendChild(pokemonInfo);
        }
    } catch (error) {
        console.error('Error, no esta:', error);
    }
}

// Función para obtener los datos de un Pokémon
async function getPokemonData(url) {
    const response = await fetch(url);
    return await response.json();
}

// Capitalizar la primera letra de una cadena
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Llamar a la función para crear la galería al cargar la página
window.addEventListener('DOMContentLoaded', crearGaleria);