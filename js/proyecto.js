fetch("/js/laliga.json")
  .then(response => response.json())
  .then(parsed_data => {
    baseDatosLiga = parsed_data;
  });
fetch("/js/premier.json")
  .then(response => response.json())
  .then(parsed_data => {
    baseDatosPremier = parsed_data;
  });
fetch("/js/serieA.json")
  .then(response => response.json())
  .then(parsed_data => {
    baseDatosSerieA = parsed_data;
});

Storage.prototype.setObj = function(key,obj){
  return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key){
  return JSON.parse(this.getItem(key))
}

let ordenClub = false;
let ordenPJ = false;
let ordenGA = false;
let ordenEM = false;
let ordenPE = false;
let ordenPT = true;
let ligaElegida = 'premierEquipos';
let ligaActual = [];
let divLigaElegida = "#" + ligaElegida;

let totalEquipos = 0;


if(localStorage.getObj("premierEquipos") === null){
  var premierEquipos = [];
}
else{
  var equipos = localStorage.getObj("premierEquipos");
  var premierEquipos = Object.values(equipos);
}

if(localStorage.getObj("laLigaEquipos") === null){
  var laLigaEquipos = [];
}
else{
  var equipos = localStorage.getObj("laLigaEquipos");
  var laLigaEquipos = Object.values(equipos);
}
if(localStorage.getObj("serieAequipos") === null){
  var serieAequipos = [];
}
else{
  var equipos = localStorage.getObj("serieAequipos");
  var serieAequipos = Object.values(equipos);
}

if(localStorage.getObj("bundesEquipos") === null){
  var bundesEquipos = [];
}
else{
  var equipos = localStorage.getObj("bundesEquipos");
  var bundesEquipos = Object.values(equipos);
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

$("#agregarEquipo").submit(crearEquipo);
$(".btnClear").click(clearTeams);
$(".btnForm").click(() => {
  $("#agregarEquipo")[0].reset();
});


function crearEquipo(e){
  e.preventDefault();
  let nuevoEquipo = new Equipo(
    $("#nombre").val(),
    $("#pais").val(),
    $("#ciudad").val(),
    $("#estadio").val(),
    $("#ganados").val(),
    $("#empatados").val(),
    $("#perdidos").val()
  );
  if ($("#pais").val() == 'españa'){
    liga = 'laLigaEquipos';
  }
  else if ($("#pais").val() == 'inglaterra'){
    liga = 'premierEquipos';
  }
  else if ($("#pais").val() == 'italia'){
    liga = 'serieAequipos';
  }
  $("#agregarEquipo")[0].reset();
  totalEquipos++;
  ligaActual = window[liga];
  ligaActual.push(nuevoEquipo);
  ordenPT = false;
  ordenarTabla("PT", liga);
  localStorage.setObj(liga, ligaActual);
  $("#confirmation").html(`<p>&#9989; Se agrego correctamente el equipo</p>`);
  setTimeout(function() {
    confirmation.innerHTML = ""
    }, 5000);
}

function clearTeams(){
  Swal.fire({
    title: '¿Estás seguro?',
    text: "Se borraran todos los equipos",
    icon: 'warning',
    color: 'white',
    showCancelButton: true,
    background: '#37003A',
    confirmButtonColor: '#FF57A8',
    cancelButtonColor: '#FF57A8',
    confirmButtonText: 'Si, borrar todo',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      ligaActual = [];
      console.log(ligaActual.length);
      localStorage.removeItem(ligaElegida);
      mostrarTabla(ligaElegida);
      Swal.fire({
        background: '#37003A',
        color: 'white',
        confirmButtonColor: '#FF57A8',
        cancelButtonColor: '#FF57A8',
        title: 'Eliminado!',
        text: 'Todas las bases de datos fueron eliminadas',
        icon: 'success'
      }
      )
    }
  })

}
console.log(typeof(ligaActual));
console.log(ligaActual.length);

window.onload = mostrarTabla(ligaElegida);

function ordenarTabla(filtro,ligaElegida){
  ligaActual = window[ligaElegida];
  if (filtro === "Club"){
    if (ordenClub == true){
      ligaActual.reverse();
      ordenClub = false;
    }
    else{
      ligaActual.sort((a, b) => a.nombre.localeCompare(b.nombre));
      ordenClub = true;
    }
  }
  else if (filtro === "PJ"){
    ligaActual.sort(function(a,b){
      if (a.partidosJugados>b.partidosJugados){
        if (ordenPJ == true){
          return 1;
        }
        else{
          return -1;
        }
      }
      if (a.partidosJugados<b.partidosJugados){
        if (ordenPJ == true){
          return -1
        }
        else{
          return 1;
        }
      }
      else{
        if(a.partidosGanados>b.partidosGanados){ //en caso de igualdad de puntos, situa por encima al que mas partidos ganados tenga
          if (ordenPJ == true){
            return 1;
          }
          else{
            return -1;
          }
        }
        else return 1;
      }
      });
      ordenPJ = !ordenPJ;
    }
    else if (filtro === "GA"){
      ligaActual.sort(function(a,b){
        if (a.partidosGanados>b.partidosGanados){
          if (ordenGA == true){
            return 1;
          }
          else{
            return -1;
          }
        }
        if (a.partidosGanados<b.partidosGanados){
          if (ordenGA == true){
            return -1
          }
          else{
            return 1;
          }
        }
        else{
          if(a.puntos>b.puntos){ //en caso de igualdad de puntos, situa por encima al que mas puntos tenga
            if (ordenGA == true){
              return 1;
            }
            else{
              return -1;
            }
          }
          else return 1;
        }
        });
        ordenGA = !ordenGA;
      }
      else if (filtro === "EM"){
        ligaActual.sort(function(a,b){
          if (a.partidosEmpatados>b.partidosEmpatados){
            if (ordenEM == true){
              return 1;
            }
            else{
              return -1;
            }
          }
          if (a.partidosEmpatados<b.partidosEmpatados){
            if (ordenEM == true){
              return -1
            }
            else{
              return 1;
            }
          }
          else{
            if(a.puntos>b.puntos){ //en caso de igualdad de puntos, situa por encima al que mas puntos tenga
              if (ordenEM == true){
                return 1;
              }
              else{
                return -1;
              }
            }
            else return 1;
          }
          });
          ordenEM = !ordenEM;
        }
        else if (filtro === "PE"){
          ligaActual.sort(function(a,b){
            if (a.partidosPerdidos>b.partidosPerdidos){
              if (ordenPE == true){
                return 1;
              }
              else{
                return -1;
              }
            }
            if (a.partidosPerdidos<b.partidosPerdidos){
              if (ordenPE == true){
                return -1
              }
              else{
                return 1;
              }
            }
            else{
              if(a.puntos>b.puntos){ //en caso de igualdad de puntos, situa por encima al que mas puntos tenga
                if (ordenPE == true){
                  return 1;
                }
                else{
                  return -1;
                }
              }
              else return 1;
            }
            });
            ordenPE = !ordenPE;
          }
          else if (filtro === "PT"){
            ligaActual.sort(function(a,b){
              if (a.puntos>b.puntos){
                if (ordenPT == true){
                  return 1;
                }
                else{
                  return -1;
                }
              }
              if (a.puntos<b.puntos){
                if (ordenPT == true){
                  return -1
                }
                else{
                  return 1;
                }
              }
              else{
                if(a.partidosJugados>b.partidosJugados){ //en caso de igualdad de puntos, situa por encima al que menos partidos jugados tenga
                  if (ordenPT == true){
                    return -1;
                  }
                  else{
                    return 1;
                  }
                }
                else return -1;
              }
              });
              ordenPT = !ordenPT;
            }
    localStorage.setObj(ligaElegida,ligaActual)
    $("#tabla").html("");
    mostrarTabla(ligaElegida);

}


function mostrarTabla(ligaElegida){

  divLigaElegida = "#" + ligaElegida;

  ligaActual = window[ligaElegida];
  if ($(divLigaElegida).ready()){
    if (ligaActual.length === 0){
      console.log('entrooo');
      $(divLigaElegida).html("");
      $(divLigaElegida).append(`<h2 class="tituloBanner">No existen equipos en la base de datos. Por favor, agreguelos manualmente o cargue una base de datos.</h2>`)    
    }
    else{
      $(divLigaElegida).html("");
        $(divLigaElegida).append(`
                            <tr class="cabeceraTabla">
                            <td><a onclick="ordenarTabla('Club',ligaElegida);">Club</td>
                            <td><a onclick="ordenarTabla('PJ',ligaElegida);">PJ</a></td>
                            <td><a onclick="ordenarTabla('GA',ligaElegida);">G</td>
                            <td><a onclick="ordenarTabla('EM',ligaElegida);">E</td>
                            <td><a onclick="ordenarTabla('PE',ligaElegida);">P</td>
                            <td><a onclick="ordenarTabla('PT',ligaElegida);">Pts</td>
                        </tr>
                          `)
      for (equipo of ligaActual){
        $(divLigaElegida).append(`
                            <tr>
                              <td class="clubName">${equipo.nombre}</td>
                              <td>${equipo.partidosJugados}</td>
                              <td>${equipo.partidosGanados}</td>
                              <td>${equipo.partidosEmpatados}</td>
                              <td>${equipo.partidosPerdidos}</td>
                              <td>${equipo.puntos}</td>
                            </tr>
                              `);
      }
    }
  }
  }

function scrollFooter(){
  $("html, body").animate({ scrollTop: $("#footer").scrollTop() }, 1000);
}

$("#baseDatos").click(() => {
  loadBD()
});

function loadBD(){
  Swal.fire({
    title: '¿Estás seguro?',
    text: "Se restablecera la base de datos por defecto",
    icon: 'warning',
    color: 'white',
    showCancelButton: true,
    background: '#37003A',
    confirmButtonColor: '#FF57A8',
    cancelButtonColor: '#FF57A8',
    confirmButtonText: 'Si, restablecer base de datos',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear();
      laLigaEquipos = baseDatosLiga;
      premierEquipos = baseDatosPremier;
      serieAequipos = baseDatosSerieA;
      localStorage.setObj("laLigaEquipos", laLigaEquipos);
      localStorage.setObj("premierEquipos", premierEquipos);
      localStorage.setObj("serieAequipos", serieAequipos);
      Swal.fire({
        background: '#37003A',
        color: 'white',
        title: 'Base de datos restablecida!',
        text: 'La base de datos se ha restablecido correctamente',
        icon: 'success',
        confirmButtonText: 'Listo',
        confirmButtonColor: '#FF57A8'
      }
      )
    }
  })
}


$("#premierLeagueTab").click(()=>{
  ligaElegida = 'premierEquipos';
  mostrarTabla(ligaElegida);
});
$("#laLigaTab").click(()=>{
  ligaElegida = 'laLigaEquipos';
  mostrarTabla(ligaElegida);
});
$("#serieAtab").click(()=>{
  ligaElegida = 'serieAequipos';
  mostrarTabla(ligaElegida);
});
$("#bundesligaTab").click(()=>{
  ligaElegida = 'bundesEquipos';
  mostrarTabla(ligaElegida);
});

$(function() {
  $(".toggle").on("click", function() { 
    if ($(".item").hasClass("active")) { 
      $(".item").removeClass("active"); $(this).find("a").html("<i class='fa fa-bars'></i>"); 
      } 
      else { $(".item").addClass("active"); $(this).find("a").html("<i class='fa fa-times'></i>"); }
    }); 
});
