document.addEventListener('DOMContentLoaded', () => {
  let originalData = [];
  let peliculasContainer = document.getElementById('peliculas-container');
  let filtroTitulo = document.getElementById('filtro-titulo');
  let filtroGenero = document.getElementById('filtro-genero');
  let filtroBtn = document.getElementById('filtro-btn');

  // Función para mostrar las películas en el contenedor
  function mostrarPeliculas(peliculas) {
    peliculasContainer.innerHTML = '';

    peliculas.forEach(pelicula => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="card-body">
          <img src="${pelicula.poster_path}" alt="${pelicula.Título}" class="card-img-top">
          <h5 class="card-title">${pelicula.Título}</h5>
          <p class="card-text">Follow the link if you want to see this movie tittle</p>
          <a href="${pelicula.Enlace}" class="btn btn-danger" target="_blank"><button style= "background-color: red; border-radius: 5px; border: 3px solid red; color: white;">Reproducir</button></a>
        </div>
      `;
      peliculasContainer.appendChild(card);
    });
  }

  // Cargar datos desde el archivo JSON
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      // Almacenar los datos originales
      originalData = Object.values(data).flat();

      // Mostrar todas las películas al principio
      mostrarPeliculas(originalData);

      // Agregar evento al botón de filtro
      filtroBtn.addEventListener('click', function () {
        const titulo = filtroTitulo.value.toLowerCase();
        const genero = filtroGenero.value.toLowerCase();

        // Filtrar las películas según los criterios
        const peliculasFiltradas = originalData.filter(pelicula => {
          const tituloCoincide = titulo === '' || pelicula.Título.toLowerCase().includes(titulo);
          const generoCoincide = genero === '' || (pelicula.Genero && pelicula.Genero.toLowerCase() === genero);

          return tituloCoincide && generoCoincide;
        });

        // Mostrar las películas filtradas
        mostrarPeliculas(peliculasFiltradas);
      });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
});


