//Array con las opcines del sorteo
const peluches = [
  "Panda rojo",
  "Jumbito",
  "Truffy",
  "Cuncunita",
  "Vainilla",
  "Nutri",
  "Caramel macciato",
  "Mapache",
  "Ardillita",
  "Ballenita",
  "Oso muy gloton",
  "Margarita",
  "Choco",
  "Oso panda",
  "Conejita",
  "Teddy",
];
//Definimos los elementos de HTML
const cancion = document.getElementById("cancion");
const participantes = document.getElementById("participantes");
const ganador = document.getElementById("ganador");
const historico = document.getElementById("historico");
const iniciar = document.getElementById("iniciar");
const guardar = document.getElementById("guardar");

//Canción de bienvenida en versos
const song1 = "🎵 El sorteo ya llegó,";
const song2 = " anunciando su canción";
const song3 = " y grito con emoción ";
const song4 = " ¡ S O R T E O ! 🎶";
const fullSong = [song1, song2, song3, song4]; //Array canción completa

//Función que despliega la canción con tempo
function reproducirCancion() {
  for (let i = 0; i < fullSong.length; i++) {
    setTimeout(() => {
      let Verso = fullSong[i];
      let fragment = document.createElement("h3");
      fragment.innerText = Verso;
      cancion.appendChild(fragment);
    }, i * 2500); //modifica el tempo.
  }
}
window.addEventListener("DOMContentLoaded", () => {
  reproducirCancion();
}); //Se activa al recargar pagina

//Crea los participantes de manera dinamica
function mostrarParticipantes() {
  for (let i = 0; i < peluches.length; i++) {
    let peluche = peluches[i];
    let button = document.createElement("button");
    button.className = "participante";
    button.id = peluche.replaceAll(" ", "-"); //Asignamos el ID para CSS
    button.innerText = peluche;
    participantes.appendChild(button);
  }
  return participantes;
}
mostrarParticipantes();

//Quita al participante al darle click.
function eliminarParticipante(nombre) {
  const participante = document.getElementById(nombre);
  participante.remove();
}
participantes.addEventListener("click", (event) => {
  const nombre = event.target.id;
  eliminarParticipante(nombre);
});

//Crea una lista de los participantes visibles.
function crearLista() {
  const candidatos = document.querySelectorAll(".participante");
  const listaParticipantes = [];
  for (let i = 0; i < candidatos.length; i++) {
    const Candidato = candidatos[i];
    listaParticipantes.push(Candidato.textContent);
  }
  return listaParticipantes;
}

//Funcion de selección aleatoria
function elegirGanador(lista) {
  const indice = Math.floor(Math.random() * lista.length); //indice aleatorio.
  const ganador = lista[indice];
  //console.log(ganador); Descomentar para depuración.
  return ganador;
}
iniciar.addEventListener("click", () => {
  //Boton iniciar sorteo
  const lista = crearLista();
  const pelucheGanador = elegirGanador(lista);
  ganador.innerHTML =
    `El peluche ganador es: <br> <strong id="` + //Mostramos la elección
    pelucheGanador.replaceAll(" ", "-") + //Asignamos el mismo ID para CSS.
    `">` +
    pelucheGanador +
    `</strong>`;
  const historial = document.createElement("li"); //Mostramos en historial
  historial.id = pelucheGanador.replaceAll(" ", "-"); //Asignamos el mismo ID para CSS.
  historial.innerHTML = pelucheGanador;
  historico.appendChild(historial);
});

//Permite guardar la lista del historial para futuros sorteos o metricas.
function guardarLista() {
  const ul = document.getElementById("historico");
  const elementos = Array.from(ul.querySelectorAll("li"));
  elementos.map((e) => e.textContent);
  localStorage.setItem("ListaHistorico", ul.innerHTML);
  alert("Lista guardada ✅");
}
guardar.addEventListener("click", guardarLista);

//Despliega el historial guardado con anterioridad
window.addEventListener("DOMContentLoaded", () => {
  // localStorage.removeItem("ListaHistorico");              //Descomentar ésta linea para limpiar los datos.
  const datosGuardados = localStorage.getItem("ListaHistorico");
  const ul = document.getElementById("historico");
  ul.innerHTML = datosGuardados;
});
