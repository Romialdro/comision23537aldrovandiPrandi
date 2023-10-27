window.addEventListener('DOMContentLoaded', () => {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const peliculasContainer = document.getElementById('peliculas-container');
      const filtroTitulo = document.getElementById('filtro-titulo');
      const filtroGenero = document.getElementById('filtro-genero');
      const filtroBtn = document.getElementById('filtro-btn');

      function mostrarPeliculas(peliculas) {
        peliculasContainer.innerHTML = '';

        peliculas.forEach(pelicula => {
          const card = document.createElement('div');
          card.className = 'col-sm-6';
          card.innerHTML = `
            <div class="card" style="background-color: black; border: 2px none; box-shadow: none;">
              <img src="${pelicula.poster_path}" class="card-img-top" alt="${pelicula.Título}">
              <div class="card-body" style="background-color: black; border: none; box-shadow: white;">
                <h5 class="card-title" style="color: white;">${pelicula.Título}</h5>
                <p class="card-text" style="color: white;">With supporting text below as a natural lead-in to additional content.</p>
                <a href="${pelicula.Enlace}" class="btn btn-danger" target="_blank" style="background-color: red; color: black;">Reproducir</a>
              </div>
            </div>
          `;
          peliculasContainer.appendChild(card);
        });
      }

      // Mostrar todas las películas de este genero    
 mostrarPeliculas(data["Genero Drama"]); 
      // Agregar evento de clic al botón de filtro
      filtroBtn.addEventListener('click', () => {
        const titulo = filtroTitulo.value;
        const genero = filtroGenero.value;

        // Filtrar películas basadas en el título y el género
        const peliculasFiltradas = data[genero].filter(pelicula => {
          return titulo === '' || pelicula.Título.toLowerCase().includes(titulo.toLowerCase());
        });

        // Mostrar las películas filtradas
        mostrarPeliculas(peliculasFiltradas);
      });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
});

