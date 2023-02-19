// Constantes -> Cada constantes hace referencia a cada Select del HTML:

const marca = document.querySelector('#marca');

const year = document.querySelector('#year');
// Las siguientes dos constantes servirán para que el Select de 'año' siempre tenga como opciones el año actual hasta 10 años más antiguos:
const max = new Date().getFullYear();
const min = max - 10;

const minimo = document.querySelector('#minimo');

const maximo = document.querySelector('#maximo');

const puertas = document.querySelector('#puertas');

const transmision = document.querySelector('#transmision');

const color = document.querySelector('#color');


// Contenedor para los resultados:
const resultado = document.querySelector('#resultado');


// Objeto que lee los valores de los input:
const datosInput = {
  marca: '',
  year: '',
  minimo: '',
  maximo: '',
  puertas: '',
  transmision: '',
  color: '',
};


// Array autos: está en el archivo "js/db.js"








// Eventos

// Cuando termine de cargar el DOM...
document.addEventListener('DOMContentLoaded', () => {
  // Ejecuta la función mostrarAutos, como parámetro colocamos el array 'autos' (está en el archivo "js/db.js"):
  mostrarAutos(autos);
  // Llena las opciones del select de 'año':
  llenarSelectYear();
});


// Listeners de los Select (selectores de búsqueda):

// El Listener 'change' ejecuta una función cada vez que se elija un valor en un Select...
// Cuando en la web seleccionemos un valor de un Select, este valor será el valor de la propiedad correspondiente en el objeto datosInput.
marca.addEventListener('change', e => {
  datosInput.marca = e.target.value;
  filtrarAuto();
});

year.addEventListener('change', e => {
  datosInput.year = e.target.value;
  filtrarAuto();
});

minimo.addEventListener('change', e => {
  datosInput.minimo = e.target.value;
  filtrarAuto();
});

maximo.addEventListener('change', e => {
  datosInput.maximo = e.target.value;
  filtrarAuto();
});

puertas.addEventListener('change', e => {
  datosInput.puertas = e.target.value;
  filtrarAuto();
});

transmision.addEventListener('change', e => {
  datosInput.transmision = e.target.value;
  filtrarAuto();
});

color.addEventListener('change', e => {
  datosInput.color = e.target.value;
  filtrarAuto();
});









// Funciones

function mostrarAutos(autos) {
  // Se ejecuta en el 1er evento y en la función filtrarAuto.

  limpiarHTML(); // Elimina el HTML del contenedor de resultados.

  // por cada elemento del array colocado como parámetero en el momento de ejecutar la función, crea un párrafo HTML:
  autos.forEach(elemento => {
    const autoHTML = document.createElement('p');
    const { marca, modelo, year, precio, puertas, color, transmision } = elemento;
    autoHTML.textContent = `
      ${marca} - ${modelo} - año: ${year} - puertas: ${puertas} - color: ${color} - transmisión: ${transmision} - precio: $${precio}
    `
    resultado.appendChild(autoHTML); // inserta el nuevo párrafo en el Contenedor de resultados de HTML.
  });

};




function llenarSelectYear() {
  // Se ejecuta en el 1er evento.
  // Llena las opciones del select de año.
  for (let i = max; i >= min; i--) {
    const opcion = document.createElement('option');
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion);
  }
};




function limpiarHTML() {
  // Se ejecuta en la función mostrarAutos y en la función noHayResultados.
  // Elimina el HTML del contenedor de resultados. 

  // Forma lenta: resultado.innerHTML = '';

  // Forma rápida:
  while(resultado.firstChild){
    resultado.removeChild(resultado.firstChild);
  }
};





function filtrarAuto() {
  // Se ejecuta en los Listeners de los Select.
  // Filtra en base a lo seleccionado en los Select.

  const resultadoFiltrado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor) 
  // La constante 'resultadoFiltrado' será un array, compuesto por los elementos retornados en cada uno de los .filter que tiene la constante.
  // Cada método .filter ejecuta su FUNCIÓN (que está entre paréntesis) en CADA elemento del array 'autos', y va colocando sólo los elementos retornados (en dicha FUNCIÓN) en un mismo nuevo array.
  
  if (resultadoFiltrado.length){
  // Si el resultadoFiltrado contiene algún elemento, ejecuta la función mostrarAutos para colocar SOLAMENTE el nuevo resultadofiltrado en el Contenedor de resultados:
    mostrarAutos(resultadoFiltrado);
  // Si no, muestra un aviso.
  } else noHayResultados(); 
  
};


function filtrarMarca(elemento) {
// Se ejecuta en la función filtrarAuto().

  // Por cada elemento (auto) del array 'autos', se ejecuta esta condición:
  if (datosInput.marca) {
  // si la propiedad 'marca' del objeto datosInput es true (porque tiene asignado un valor), solamente retornará al elemento iterado si cumple la siguiente condición:

    return elemento.marca === datosInput.marca;
    // Si el valor de la propiedad 'marca' del elemento iterado es igual a la del objeto datosInput, retorna dicho elemento. Si el valor no coincide, no lo retorna.
    // Como el método es '.filter', devuelve el elemento. Si fuese '.map', devolvería true o false.

  } else {
  // si la propiedad 'marca' NO tiene asignado un valor, retornará el elemento iterado sin verificar ninguna condición:
    return elemento;
  }

};

function filtrarYear(elemento) {
// Se ejecuta en la función filtrarAuto().
  if (datosInput.year) {
    return elemento.year == datosInput.year;
  } 
  return elemento;
};

function filtrarMinimo(elemento) {
// Se ejecuta en la función filtrarAuto().  
  if (datosInput.minimo) {
    return elemento.precio >= datosInput.minimo;
  } 
  return elemento;
};

function filtrarMaximo(elemento) {
// Se ejecuta en la función filtrarAuto().  
  const {maximo} = datosInput;
  if (maximo) {
    return elemento.precio <= maximo;
  } 
  return elemento;
};

function filtrarPuertas(elemento) {
// Se ejecuta en la función filtrarAuto().  
  const {puertas} = datosInput;
  if (puertas) {
    return elemento.puertas == puertas;
  } 
  return elemento;
};

function filtrarTransmision(elemento) {
// Se ejecuta en la función filtrarAuto().  
  const {transmision} = datosInput;
  if (transmision) {
    return elemento.transmision === transmision;
  } 
  return elemento;
};

function filtrarColor(elemento) {
// Se ejecuta en la función filtrarAuto().
  const {color} = datosInput;
  if (color) {
    return elemento.color === color;
  } 
  return elemento;
};

function noHayResultados(){
// Se ejecuta en la función filtrarAuto().
  limpiarHTML();
  const aviso = document.createElement('p');
  aviso.classList.add('error');
  aviso.textContent = 'No hay autos con las características seleccionadas.';
  resultado.appendChild(aviso);
};