fetch('https://pokeapi.co/api/v2/type/')
  .then(response => response.json())
  .then(data => {
    // Filtramos los resultados para obtener solo los tipos de Pokémon
    const tiposPokemon = data.results.filter(resultado);

    // Luego, llamamos a una función para construir el menú de los tipos de pokemons
    construirMenu(tiposPokemon);
  })
  .catch(error => {
    console.error('Error al obtener los tipos de Pokémon:', error);
  });

async function construirMenu() {
    const nav = document.getElementById('nav_menu');

    try {
        const response = await fetch('https://pokeapi.co/api/v2/type/');
        const data = await response.json();

        const PokeTipos = data.results;
		PokeTipos.forEach(tipo => {
			
			//mis variables
            const nombrePokeTipo = tipo.name;
            const formatoNombre = nombrePokeTipo.charAt(0).toUpperCase() + nombrePokeTipo.slice(1);
			const btnPokeTipo = document.createElement('button');
		
			//tipos de boton
			btnPokeTipo.textContent = formatoNombre;
			btnPokeTipo.type = 'button';
			btnPokeTipo.classList.add('btn', nombrePokeTipo)
			btnPokeTipo.addEventListener('click', () => {
                window.location.href = `https://pokeapi.co/api/v2/type/${nombrePokeTipo}`;
            });
            nav.appendChild(btnPokeTipo);
        });
    } catch (error) {
        console.error('Error al sacar el menu de pojkemons', error);
    }
}
// Llamo a la función para construir el menu
document.addEventListener('DOMContentLoaded', construirMenu);







