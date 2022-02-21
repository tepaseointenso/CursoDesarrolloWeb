const baseDatos = [
  {
     "id":1,
     "nombre":"Manchester City",
     "ciudad":"Manchester",
     "pais":"inglaterra",
     "estadio":"Etihad Stadium",
     "partidosGanados":20,
     "partidosEmpatados":3,
     "partidosPerdidos":2,
     "partidosJugados":25,
     "puntos":63
  },
  {
     "id":2,
     "nombre":"Liverpool",
     "ciudad":"Liverpool",
     "pais":"inglaterra",
     "estadio":"Anfield",
     "partidosGanados":16,
     "partidosEmpatados":6,
     "partidosPerdidos":2,
     "partidosJugados":24,
     "puntos":54
  },
  {
     "id":3,
     "nombre":"Chelsea",
     "ciudad":"Londres",
     "pais":"inglaterra",
     "estadio":"Stamford Bridge",
     "partidosGanados":13,
     "partidosEmpatados":8,
     "partidosPerdidos":3,
     "partidosJugados":24,
     "puntos":47
  },
  {
     "id":4,
     "nombre":"West Ham",
     "ciudad":"Londres",
     "pais":"inglaterra",
     "estadio":"London Stadium",
     "partidosGanados":12,
     "partidosEmpatados":5,
     "partidosPerdidos":8,
     "partidosJugados":25,
     "puntos":41
  },
  {
     "id":5,
     "nombre":"Manchester United",
     "ciudad":"Manchester",
     "pais":"inglaterra",
     "estadio":"Old Trafford",
     "partidosGanados":11,
     "partidosEmpatados":7,
     "partidosPerdidos":6,
     "partidosJugados":24,
     "puntos":40
  },
  {
     "id":6,
     "nombre":"Arsenal",
     "ciudad":"Londres",
     "pais":"inglaterra",
     "estadio":"Emirates Stadium",
     "partidosGanados":12,
     "partidosEmpatados":3,
     "partidosPerdidos":7,
     "partidosJugados":22,
     "puntos":39
  },
  {
     "id":7,
     "nombre":"Wolverhampton",
     "ciudad":"Wolverhampton",
     "pais":"inglaterra",
     "estadio":"Molineux Stadium",
     "partidosGanados":11,
     "partidosEmpatados":4,
     "partidosPerdidos":8,
     "partidosJugados":23,
     "puntos":37
  },
  {
     "id":8,
     "nombre":"Tottenham Hotspur",
     "ciudad":"Tottenham",
     "pais":"inglaterra",
     "estadio":"Tottenham Hotspur Stadium",
     "partidosGanados":11,
     "partidosEmpatados":3,
     "partidosPerdidos":8,
     "partidosJugados":22,
     "puntos":36
  },
  {
     "id":9,
     "nombre":"Brighton & Hove Albion",
     "ciudad":"Brighton & Hove",
     "pais":"inglaterra",
     "estadio":"Falmer Stadium",
     "partidosGanados":7,
     "partidosEmpatados":12,
     "partidosPerdidos":4,
     "partidosJugados":23,
     "puntos":33
  },
  {
     "id":10,
     "nombre":"Southampton Football Club",
     "ciudad":"Southampton",
     "pais":"inglaterra",
     "estadio":"St Mary's Stadium",
     "partidosGanados":6,
     "partidosEmpatados":11,
     "partidosPerdidos":7,
     "partidosJugados":24,
     "puntos":29
  },
  {
     "id":11,
     "nombre":"Leicester City",
     "ciudad":"Leicester",
     "pais":"inglaterra",
     "estadio":"King Power Stadium",
     "partidosGanados":7,
     "partidosEmpatados":6,
     "partidosPerdidos":9,
     "partidosJugados":22,
     "puntos":27
  },
  {
     "id":12,
     "nombre":"Aston Villa",
     "ciudad":"Birmingham",
     "pais":"inglaterra",
     "estadio":"Villa Park",
     "partidosGanados":8,
     "partidosEmpatados":3,
     "partidosPerdidos":12,
     "partidosJugados":23,
     "puntos":27
  },
  {
     "id":13,
     "nombre":"Crystal Palace",
     "ciudad":"Londres",
     "pais":"inglaterra",
     "estadio":"Selhurst Park Stadium",
     "partidosGanados":5,
     "partidosEmpatados":11,
     "partidosPerdidos":8,
     "partidosJugados":24,
     "puntos":26
  },
  {
     "id":14,
     "nombre":"Brentford FC",
     "ciudad":"Londres",
     "pais":"inglaterra",
     "estadio":"Brentford Community Stadium",
     "partidosGanados":6,
     "partidosEmpatados":6,
     "partidosPerdidos":13,
     "partidosJugados":25,
     "puntos":24
  },
  {
     "id":15,
     "nombre":"Leeds United",
     "ciudad":"Leeds",
     "pais":"inglaterra",
     "estadio":"Elland Road",
     "partidosGanados":5,
     "partidosEmpatados":8,
     "partidosPerdidos":10,
     "partidosJugados":23,
     "puntos":23
  },
  {
     "id":16,
     "nombre":"Everton FC",
     "ciudad":"Liverpool",
     "pais":"inglaterra",
     "estadio":"Goodison Park",
     "partidosGanados":6,
     "partidosEmpatados":4,
     "partidosPerdidos":12,
     "partidosJugados":22,
     "puntos":22
  },
  {
     "id":17,
     "nombre":"Newcastle United",
     "ciudad":"Newcastle",
     "pais":"inglaterra",
     "estadio":"St James' Park",
     "partidosGanados":4,
     "partidosEmpatados":9,
     "partidosPerdidos":10,
     "partidosJugados":23,
     "puntos":21
  },
  {
     "id":18,
     "nombre":"Norwich City",
     "ciudad":"Norwich",
     "pais":"inglaterra",
     "estadio":"Carrow Road",
     "partidosGanados":4,
     "partidosEmpatados":5,
     "partidosPerdidos":15,
     "partidosJugados":24,
     "puntos":17
  },
  {
     "id":19,
     "nombre":"Watford FC",
     "ciudad":"Watford",
     "pais":"inglaterra",
     "estadio":"Vicarage Road",
     "partidosGanados":4,
     "partidosEmpatados":3,
     "partidosPerdidos":16,
     "partidosJugados":23,
     "puntos":15
  },
  {
     "id":20,
     "nombre":"Burnley FC",
     "ciudad":"Lancashire",
     "pais":"inglaterra",
     "estadio":"Turf Moor",
     "partidosGanados":1,
     "partidosEmpatados":11,
     "partidosPerdidos":9,
     "partidosJugados":21,
     "puntos":14
  }
];

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

let totalEquipos = 0;
let laLigaEquipos = [];
let equiposSerieA = [];
let equiposBundes = [];

if(localStorage.getObj("listaEquipos") === null){
  var todosEquipos = [];
}
else{
  var listaEquipos = localStorage.getObj("listaEquipos");
  var todosEquipos = Object.values(listaEquipos);
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
    $("#nombre").val(),
    $("#pais").val(),
    $("#ciudad").val(),
    $("#estadio").val(),
    $("#ganados").val(),
    $("#empatados").val(),
    $("#perdidos").val()
  );
  addForm.reset();
  totalEquipos++;
  todosEquipos.push(nuevoEquipo);
  ordenPT = false;
  ordenarTabla("PT");
  localStorage.setObj("listaEquipos", todosEquipos);
  $("#confirmation").html(`<p>&#9989; Se agrego correctamente el equipo</p>`);
  setTimeout(function() {
    confirmation.innerHTML = ""
    }, 5000);
}



function clasificarPts(){
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
  Swal.fire({
    title: '¿Estás seguro?',
    text: "Se borraran todos los equipos",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borrar todo',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear();
      todosEquipos =[];
      $("#tabla").empty();
      $("#mensaje").empty();
      mostrarTabla();
      Swal.fire(
        'Eliminado!',
        'Todas las bases de datos fueron eliminadas',
        'success'
      )
    }
  })
}

function hideAddTeam(){
  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("contain").style.visibility = "hidden";
  });
}


function ordenarTabla(filtro){

  if (filtro === "Club"){
    if (ordenClub == true){
      todosEquipos.reverse();
      ordenClub = false;
    }
    else{
      todosEquipos.sort((a, b) => a.nombre.localeCompare(b.nombre));
      ordenClub = true;
    }
  }
  else if (filtro === "PJ"){
    todosEquipos.sort(function(a,b){
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
      todosEquipos.sort(function(a,b){
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
        todosEquipos.sort(function(a,b){
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
          todosEquipos.sort(function(a,b){
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
            todosEquipos.sort(function(a,b){
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
    localStorage.setObj("listaEquipos",todosEquipos)
    $("#tabla").html("");
    mostrarTabla();

}
window.onload = mostrarTabla();

function mostrarTabla(){
  if (todosEquipos.length === 0){
    $("#tabla").html("");
    $("#tabla").append(`<h2 class="tituloBanner">No existen equipos en la base de datos. Por favor, agreguelos manualmente o cargue una base de datos.</h2>`)    
  }
  else{
    $("#tabla").html("");
      $("#tabla").append(`
                          <tr class="cabeceraTabla">
                          <td><a onclick="ordenarTabla('Club');">Club</td>
                          <td><a onclick="ordenarTabla('PJ');">PJ</a></td>
                          <td><a onclick="ordenarTabla('GA');">G</td>
                          <td><a onclick="ordenarTabla('EM');">E</td>
                          <td><a onclick="ordenarTabla('PE');">P</td>
                          <td><a onclick="ordenarTabla('PT');">Pts</td>
                      </tr>
                        `)
    for (equipo of todosEquipos){
      $("#tabla").append(`
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

function scrollFooter(){
  $("html, body").animate({ scrollTop: $("#footer").scrollTop() }, 1000);
}

$("#baseDatos").click(loadBD);

function loadBD(){
  confirm("Seguro que quiere borrar y cargar la base de datos?");
  localStorage.clear();
  todosEquipos = baseDatos;
  localStorage.setObj("listaEquipos", todosEquipos);
  $("#confirmation").html(`<p>&#9989; Base de datos cargada correctamente</p>`);
  setTimeout(function() {
    confirmation.innerHTML = ""
    }, 5000);
}


$("#premierLeagueTab").click(()=>{
  mostrarTabla(todosEquipos)
});
$("#laLigaTab").click(()=>{
  mostrarTabla(laLigaEquipos)
});
$("#serieAtab").click(()=>{
  mostrarTabla(equiposSerieA)
});
$("#bundesligaTab").click(()=>{
  mostrarTabla(equiposBundes)
});

$(function() {
  $(".toggle").on("click", function() { 
    if ($(".item").hasClass("active")) { 
      $(".item").removeClass("active"); $(this).find("a").html("<i class='fa fa-bars'></i>"); 
      } 
      else { $(".item").addClass("active"); $(this).find("a").html("<i class='fa fa-times'></i>"); }
    }); 
});
