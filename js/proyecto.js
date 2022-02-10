Storage.prototype.setObj = function(key,obj){
  return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key){
  return JSON.parse(this.getItem(key))
}



let totalEquipos = 0;
if(localStorage.getObj("listaEquipos") === null){
  var todosEquipos = [];
}
else{
  var todosEquipos = localStorage.getObj("listaEquipos");
}

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
    this.partidosJugados = (this.partidosGanados + this.partidosEmpatados + this.partidosPerdidos);
    this.puntos = (this.partidosGanados*3 + this.partidosEmpatados*1 + this.partidosPerdidos*0)
  }
}


let addForm = document.getElementById("agregarEquipo");
if (addForm){
  addForm.addEventListener("submit", crearEquipo);
}


let clrTeams = document.getElementById("btnClear");
if (clrTeams){
  clrTeams.addEventListener("click", clearTeams);
}

function crearEquipo(e){
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
  // addForm.reset();
  todosEquipos.push(nuevoEquipo);
  clasificar();
  localStorage.setObj("listaEquipos", todosEquipos);
  $("#confirmation").html(`<p>&#9989; Se agrego correctamente el equipo</p>`);
  setTimeout(function() {
    confirmation.innerHTML = ""
    }, 5000);
}



function clasificar(){
  todosEquipos.sort(function(a,b){
    if (a.puntos>b.puntos){
      return -1;
    }
    if (a.puntos<b.puntos){
      return 1;
    }
    else{
      if(a.partidosGanados>b.partidosGanados){ //en caso de igualdad de puntos, situa por encima al que mas partidos ganados tenga
        return -1;
      }
      else return 1;
    };
  })
}


function clearTeams(){
  if (confirm("¿Esta seguro de borrar todos los equipos?")){
    localStorage.clear();
    $("#mensaje").empty();
  }
}

function hideAddTeam(){
  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("contain").style.visibility = "hidden";
  });
}

console.log(todosEquipos[0].partidosJugados);


$(" #reload ").click(sortPJ);

function sortPJ(){
  todosEquipos.sort(function(a,b){
    if (a.partidosJugados>b.partidosJugados){
      return -1;
    }
    if (a.partidosJugados<b.partidosJugados){
      return 1;
    }
    else{
      if(a.partidosGanados>b.partidosGanados){ //en caso de igualdad de puntos, situa por encima al que mas partidos ganados tenga
        return -1;
      }
      else return 1;
    };
    });
    console.log(todosEquipos[0].partidosJugados);
}


window.onload = mostrarTabla;

function mostrarTabla(){
  for (equipo of todosEquipos){
    $("#tabla").append(`
                        <tr>
                          <td>${equipo.nombre}</td>
                          <td>${equipo.partidosJugados}</td>
                          <td>${equipo.partidosGanados}</td>
                          <td>${equipo.partidosEmpatados}</td>
                          <td>${equipo.partidosPerdidos}</td>
                          <td>${equipo.puntos}</td>
                        </tr>
                          `);
  }
}


function ordenTablaPJ(todosEquipos){
  let ordenNuevo = todosEquipos.sort((a,b) => b.partidosJugados - a.partidosJugados);
  localStorage.setObj("ordenPJ", ordenNuevo);
}
