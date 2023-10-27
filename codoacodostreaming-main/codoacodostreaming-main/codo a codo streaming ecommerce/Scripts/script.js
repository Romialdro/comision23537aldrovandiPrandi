// Función para mostrar el alert
  function mostrarAlert() {
    alert("DEBES COMPLETAR EL REGISTRO PRIMERO");
  }
  
  const buttons = document.querySelectorAll(".btn.btn-danger.text-white");
  buttons.forEach((button) => {
    button.addEventListener("click", mostrarAlert);
  });
    
//aca carrosuel con movimiento 
const fila = document.querySelector('.contenedor-carousel');
const peliculas = document.querySelectorAll('.pelicula');

const flechaIzquierda = document.getElementById('flecha-izquierda');
const flechaDerecha = document.getElementById('flecha-derecha');

// Event Listener para la flecha derecha
flechaDerecha.addEventListener('click', () => {
	fila.scrollLeft += fila.offsetWidth;

	const indicadorActivo = document.querySelector('.indicadores .activo');
	if(indicadorActivo.nextSibling){
		indicadorActivo.nextSibling.classList.add('activo');
		indicadorActivo.classList.remove('activo');
	}
});

// Event Listener para la flecha izquierda. 
flechaIzquierda.addEventListener('click', () => {
	fila.scrollLeft -= fila.offsetWidth;

	const indicadorActivo = document.querySelector('.indicadores .activo');
	if(indicadorActivo.previousSibling){
		indicadorActivo.previousSibling.classList.add('activo');
		indicadorActivo.classList.remove('activo');
	}
});

// Paginacion
const numeroPaginas = Math.ceil(peliculas.length / 5);
for(let i = 0; i < numeroPaginas; i++){
	const indicador = document.createElement('button');

	if(i === 0){
		indicador.classList.add('activo');
	}

	document.querySelector('.indicadores').appendChild(indicador);
	indicador.addEventListener('click', (e) => {
		fila.scrollLeft = i * fila.offsetWidth;

		document.querySelector('.indicadores .activo').classList.remove('activo');
		e.target.classList.add('activo');
	});
}

//Hover 
peliculas.forEach((pelicula) => {
	pelicula.addEventListener('mouseenter', (e) => {
		const elemento = e.currentTarget;
		setTimeout(() => {
			peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
			elemento.classList.add('hover');
		}, 300);
	});
});

fila.addEventListener('mouseleave', () => {
	peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
});


window.addEventListener('DOMContentLoaded', () => {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const { catalogoUno, catalogoDos, catalogoTres } = data;

      const populares = document.getElementById('populares');
      const estrenos = document.getElementById('estreno');
      const vistas = document.getElementById('vistas');

      function crearPelicula(pelicula, contenedor) {
        const article = document.createElement('article');
        article.classList.add('pelicula');
        const img = document.createElement('img');

        img.src = pelicula.poster_path;

        article.append(img);
        contenedor.append(article);
      }

      catalogoUno.results.forEach(pelicula => {
        crearPelicula(pelicula, populares);
      });

      catalogoDos.results.forEach(pelicula => {
        crearPelicula(pelicula, estrenos);
      });

      catalogoTres.results.forEach(pelicula => {
        crearPelicula(pelicula, vistas);
      });
    });
});