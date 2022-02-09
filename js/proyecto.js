
let ingresar = "si";
const todosEquipos = new Array();
let totalEquipos = 0;

class Equipo {
  constructor(nombre,pais,ciudad,estadio,partidosGanados,partidosEmpatados,partidosPerdidos) {
    this.id = totalEquipos+1;
    this.nombre = nombre;
    this.ciudad = ciudad;
    this.pais = pais;
    this.estadio = estadio;
    this.partidosGanados = parseInt(partidosGanados);
    this.partidosEmpatados = parseInt(partidosEmpatados);
    this.partidosPerdidos = parseInt(partidosPerdidos);
    
  }
  puntos() {
    return (this.partidosGanados * 3 +this.partidosEmpatados * 1 + this.partidosPerdidos * 0);
  }
  partidosJugados(){
    return(this.partidosGanados+this.partidosEmpatados+this.partidosPerdidos);
  }
}

let addForm = document.getElementById("agregarEquipo");
addForm.addEventListener("submit", crearEquipo);

let clrTeams = document.getElementById("btnClear");
clrTeams.addEventListener("click", clearTeams);

function crearEquipo(e){
  console.log("pulsaste boton");
  e.preventDefault();
  let nuevoEquipo = new Equipo(
    document.getElementById("nombre").value,
    document.getElementById("pais").value,
    document.getElementById("ciudad").value,
    document.getElementById("estadio").value,
    document.getElementById("ganados").value,
    document.getElementById("empatados").value,
    document.getElementById("perdidos").value
  );
  addForm.reset();
  todosEquipos.push(nuevoEquipo);
  localStorage.setItem("listaEquipos", todosEquipos);
  let mensaje = document.getElementById("mensaje");
  mensaje.innerHTML = "&#9989; Se agrego correctamente el equipo"
  setTimeout(function() {
    mensaje.innerHTML = ""
    }, 5000);
}

function clearTeams(){
  if (confirm("¿Esta seguro de borrar todos los equipos?")){
    localStorage.clear();
  }
}

function hideAddTeam(){
  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("contain").style.visibility = "hidden";
  });
}

let loadTeams = document.getElementById("cargar");
loadTeams.addEventListener("click", tabla);

function tabla(){
  let equipos = localStorage.getItem("listaEquipos");
  alert(equipos);
  $(".tabla").append(`
                      <tr>
                        <td>${equipos[1].nombre}</td>
                        <td>${equipos[1].partidosJugados()}</td>
                        <td>${equipos[1].partidosGanados}</td>
                        <td>${equipos[1].partidosEmpatados}</td>
                        <td>${equipos[1].partidosPerdidos}</td>
                        <td>${equipos[1].puntos()}</td>
                      </tr>
                        `);
}

