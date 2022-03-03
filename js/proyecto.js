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
fetch("/js/bundes.json")
  .then(response => response.json())
  .then(parsed_data => {
    baseDatosBundes = parsed_data;
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

const arrayImg = new Array();
arrayImg[0] = "victoria.png";
arrayImg[1] = "derrota.png";
arrayImg[2] = "empate.png";

const visitado = localStorage.getItem("primeraVisita");


if(!visitado){
  if((localStorage.getObj("premierEquipos") === null) && (localStorage.getObj("laLigaEquipos") === null) && (localStorage.getObj("serieAequipos") === null) && (localStorage.getObj("bundesEquipos") === null)){
    Swal.fire({
      title: '¡Bienvenido!',
      text: "Hemos detectado que no existe ninguna base de datos. ¿Deseas cargar la base de datos por defecto? [RECOMENDADO]",
      icon: 'info',
      color: 'white',
      showCancelButton: true,
      background: '#37003A',
      confirmButtonColor: '#FF57A8',
      cancelButtonColor: '#FF57A8',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        laLigaEquipos = baseDatosLiga;
        premierEquipos = baseDatosPremier;
        serieAequipos = baseDatosSerieA;
        bundesEquipos = baseDatosBundes;
        localStorage.setObj("laLigaEquipos", laLigaEquipos);
        localStorage.setObj("premierEquipos", premierEquipos);
        localStorage.setObj("serieAequipos", serieAequipos);
        localStorage.setObj("bundesEquipos", bundesEquipos);
        localStorage.setItem("primeraVisita", false);
        Swal.fire({
          background: '#37003A',
          color: 'white',
          title: 'Base de datos restablecida!',
          text: 'La base de datos se ha restablecido correctamente',
          icon: 'success',
          confirmButtonText: 'Listo',
          confirmButtonColor: '#FF57A8'
        })
      }
      else{
        localStorage.setItem("primeraVisita", false);
      }
    })
  }
}

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
  constructor(logo,nombre,pais,ciudad,estadio,partidosGanados,partidosEmpatados,partidosPerdidos) {
    this.id = totalEquipos+1;
    this.logo = logo;
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

$(".añadirEquipo").click(() => {
    document.location.href = 'equipos.html#containerEquipo';
  }); 
$(".verFooter").click(() => {
    document.location.href = '#footer';
  }); 

$(".btnForm").click(() => {
  $("#agregarEquipo")[0].reset();
});

if($("#logoEquipo").length === 0){
  $("#logoEquipo").val('/assets/placeholder.png');
}


function crearEquipo(e){
  e.preventDefault();
  let nuevoEquipo = new Equipo(
    $("#logoEquipo").val(),
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
  else if ($("#pais").val() == 'alemania'){
    liga = 'bundesEquipos';
  }
  $("#agregarEquipo")[0].reset();
  totalEquipos++;
  ligaActual = window[liga];
  ligaActual.push(nuevoEquipo);
  ordenPT = false;
  ordenarTabla("PT", liga);
  localStorage.setObj(liga, ligaActual);
  confirmation();
}

function confirmation(){
  let timerInterval
Swal.fire({
  title: 'El equipo se agregó correctamente',
  timer: 2000,
  didOpen: () => {
    const b = Swal.getHtmlContainer().querySelector('b')
    timerInterval = setInterval(() => {
      b.textContent = Swal.getTimerLeft()
    }, 100)
  },
  willClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  location.reload();
  if (result.dismiss === Swal.DismissReason.timer) {
  }
})
}
function clearTeams(){
  Swal.fire({
    title: '¿Estás seguro?',
    text: "Se borraran todos los equipos de esta liga",
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
      localStorage.removeItem(ligaElegida);
      Swal.fire({
        background: '#37003A',
        color: 'white',
        confirmButtonColor: '#FF57A8',
        cancelButtonColor: '#FF57A8',
        title: 'Eliminado!',
        text: `La informacion de la liga ${ligaElegida} ha sido eliminada`,
        icon: 'success'
      }).then((result) => {
        if (result.isConfirmed){
          mostrarTabla(ligaElegida);
          location.reload();
        }
      })
    }
  })

}
function clearAll(){
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
      localStorage.clear();
      Swal.fire({
        background: '#37003A',
        color: 'white',
        confirmButtonColor: '#FF57A8',
        cancelButtonColor: '#FF57A8',
        title: 'Eliminado!',
        text: `Todas las bases de datos fueron eliminadas.`,
        icon: 'success'
      })
    }
  })

}

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
        let nombreModal = 'modal' + equipo.id;
        let containModal = 'contain' + equipo.id;
        let idContainModal = '#' + containModal;
        $(divLigaElegida).append(`
                            <tr>
                              <td class="clubName"><span class="logosTabla mx-3"><img src=${equipo.logo}></img></span>${equipo.nombre}</td>
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
  $("html, body").animate({ scrollTop: $(".footer").scrollTop() }, 1000);
}

$("#baseDatos").click(() => {
  loadBD();
});
$(".btnClear").click(() => {
  clearTeams();
});
$("#btnClearAll").click(() => {
  clearAll();
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
      bundesEquipos = baseDatosBundes;
      localStorage.setObj("laLigaEquipos", laLigaEquipos);
      localStorage.setObj("premierEquipos", premierEquipos);
      localStorage.setObj("serieAequipos", serieAequipos);
      localStorage.setObj("bundesEquipos", bundesEquipos);
      localStorage.setItem("primeraVisita", false);
      Swal.fire({
        background: '#37003A',
        color: 'white',
        title: 'Base de datos restablecida!',
        text: 'La base de datos se ha restablecido correctamente',
        icon: 'success',
        confirmButtonText: 'Listo',
        confirmButtonColor: '#FF57A8'
      }).then((result2) => {
        if (result2.isConfirmed){
          location.reload();
        }
      })
    }
  })
}


$("#premierLeagueTab").click(()=>{
  ligaElegida = 'premierEquipos';
  localStorage.setItem('pais','inglaterra');
  mostrarTabla(ligaElegida);
});
$("#laLigaTab").click(()=>{
  ligaElegida = 'laLigaEquipos';
  localStorage.setItem('pais','españa');
  mostrarTabla(ligaElegida);
});
$("#serieAtab").click(()=>{
  ligaElegida = 'serieAequipos';
  localStorage.setItem('pais','italia');
  mostrarTabla(ligaElegida);
});
$("#bundesligaTab").click(()=>{
  ligaElegida = 'bundesEquipos';
  localStorage.setItem('pais','alemania');
  mostrarTabla(ligaElegida);
});

if (premierEquipos.length != 0){
  for (equipo of premierEquipos){
    let nombreModal = 'modalp' + equipo.id;
    let containModal = 'containp' + equipo.id;
    let idContainModal = '#' + containModal;
    $('.list-group-premier').append(`
                          <div class="col-lg-1 col-md-2 col-sm-3" align="center">
                            <a href="#" data-bs-toggle="modal" data-bs-target=${idContainModal}>
                            <div class="modal fade " id=${containModal} tabindex="-1" aria-labelledby=${nombreModal} aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                              <div class="modal-content bg-dark">
                                <div class="modal-header">
                                  <h5 class="modal-title" id=${nombreModal}>${equipo.nombre}</h5>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                  <div class="row">
                                    <div class="col-6">
                                      <img class="modalLogo" src=${equipo.logo}>
                                    </div>
                                    <div class="col-6">
                                      <div class="row infoEquipo" align="left">
                                        <p class="tituloAtributo">Estadio: </p><span class="atributoModal">${equipo.estadio}</span>
                                        <p class="tituloAtributo">Ciudad: </p><span class="atributoModal">${equipo.ciudad}</span>
                                        <p class="tituloAtributo">Partidos Jugados: </p><span class="atributoModal">${equipo.partidosJugados}</span>
                                        <p class="tituloAtributo">Puntos: </p><span class="atributoModal">${equipo.puntos}</span>
                                        <p class="tituloAtributo">Ultimos partidos: </p>
                                        <span class="atributoModal">${getRandomImage(arrayImg, "")}${getRandomImage(arrayImg, "")}${getRandomImage(arrayImg, "")}${getRandomImage(arrayImg, "")}${getRandomImage(arrayImg, "")}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="modal-footer justify-content-center">
                                  <p>Clasificacion actual: 1</p>
                                </div>
                              </div>
                            </div>
                          </div>
                                <div class="teamCard">
                                  <img src=${equipo.logo} class="card-img-top" alt="...">
                                  <p class="card-title-equipos">${equipo.nombre}</p>
                                </div>
                            </a>
                          </div>`);
  }
}
else{
  $('.list-group-premier').html(`<h2 class="tituloBanner">No existen equipos en esta liga. Por favor, agreguelos manualmente o cargue una base de datos.</h2>`)
}

if (laLigaEquipos.length != 0){
  for (equipo of laLigaEquipos){
    let nombreModal = 'modall' + equipo.id;
    let containModal = 'containl' + equipo.id;
    let idContainModal = '#' + containModal;
    $('.list-group-liga').append(`
    <div class="col-lg-1 col-md-2 col-sm-3" align="center">
    <a href="#" data-bs-toggle="modal" data-bs-target=${idContainModal}>
    <div class="modal fade " id=${containModal} tabindex="-1" aria-labelledby=${nombreModal} aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content bg-dark">
        <div class="modal-header">
          <h5 class="modal-title" id=${nombreModal}>${equipo.nombre}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-6">
              <img class="modalLogo" src=${equipo.logo}>
            </div>
            <div class="col-6">
              <div class="row infoEquipo" align="left">
                <p class="tituloAtributo">Estadio: </p><span class="atributoModal">${equipo.estadio}</span>
                <p class="tituloAtributo">Ciudad: </p><span class="atributoModal">${equipo.ciudad}</span>
                <p class="tituloAtributo">Partidos Jugados: </p><span class="atributoModal">${equipo.partidosJugados}</span>
                <p class="tituloAtributo">Puntos: </p><span class="atributoModal">${equipo.puntos}</span>
                <p class="tituloAtributo">Ultimos partidos: </p>
                <span class="atributoModal">${getRandomImage(arrayImg, "")}${getRandomImage(arrayImg, "")}${getRandomImage(arrayImg, "")}${getRandomImage(arrayImg, "")}${getRandomImage(arrayImg, "")}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer justify-content-center">
          <p>Clasificacion actual: 1</p>
        </div>
      </div>
    </div>
  </div>
        <div class="teamCard">
          <img src=${equipo.logo} class="card-img-top" alt="...">
          <p class="card-title-equipos">${equipo.nombre}</p>
        </div>
    </a>
  </div>`);
}
}
else{
  $('.list-group-liga').html(`<h2 class="tituloBanner">No existen equipos en esta liga. Por favor, agreguelos manualmente o cargue una base de datos.</h2>`)
}

if (serieAequipos.length != 0){
  for (equipo of serieAequipos){
    let nombreModal = 'modals' + equipo.id;
    let containModal = 'contains' + equipo.id;
    let idContainModal = '#' + containModal;
    $('.list-group-serieA').append(`
    <div class="col-lg-1 col-md-2 col-sm-3" align="center">
    <a href="#" data-bs-toggle="modal" data-bs-target=${idContainModal}>
    <div class="modal fade " id=${containModal} tabindex="-1" aria-labelledby=${nombreModal} aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content bg-dark">
        <div class="modal-header">
          <h5 class="modal-title" id=${nombreModal}>${equipo.nombre}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-6">
              <img class="modalLogo" src=${equipo.logo}>
            </div>
            <div class="col-6">
              <div class="row infoEquipo" align="left">
                <p class="tituloAtributo">Estadio: </p><span class="atributoModal">${equipo.estadio}</span>
                <p class="tituloAtributo">Ciudad: </p><span class="atributoModal">${equipo.ciudad}</span>
                <p class="tituloAtributo">Partidos Jugados: </p><span class="atributoModal">${equipo.partidosJugados}</span>
                <p class="tituloAtributo">Puntos: </p><span class="atributoModal">${equipo.puntos}</span>
                <p class="tituloAtributo">Ultimos partidos: </p>
                <span class="atributoModal">${getRandomImage(arrayImg, "")}${getRandomImage(arrayImg, "")}${getRandomImage(arrayImg, "")}${getRandomImage(arrayImg, "")}${getRandomImage(arrayImg, "")}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer justify-content-center">
          <p>Clasificacion actual: 1</p>
        </div>
      </div>
    </div>
  </div>
        <div class="teamCard">
          <img src=${equipo.logo} class="card-img-top" alt="...">
          <p class="card-title-equipos">${equipo.nombre}</p>
        </div>
    </a>
  </div>`);
}
}
else{
  $('.list-group-serieA').html(`<h2 class="tituloBanner">No existen equipos en esta liga. Por favor, agreguelos manualmente o cargue una base de datos.</h2>`)
}

if (bundesEquipos.length != 0){
  for (equipo of bundesEquipos){
    let nombreModal = 'modalb' + equipo.id;
    let containModal = 'containb' + equipo.id;
    let idContainModal = '#' + containModal;
    $('.list-group-bundes').append(`
                                  <div class="col-lg-1 col-md-2 col-sm-3" align="center">
                                  <a href="#" data-bs-toggle="modal" data-bs-target=${idContainModal}>
                                  <div class="modal fade " id=${containModal} tabindex="-1" aria-labelledby=${nombreModal} aria-hidden="true">
                                  <div class="modal-dialog modal-lg">
                                    <div class="modal-content bg-dark">
                                      <div class="modal-header">
                                        <h5 class="modal-title" id=${nombreModal}>${equipo.nombre}</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                      </div>
                                      <div class="modal-body">
                                        <div class="row">
                                          <div class="col-6">
                                            <img class="modalLogo" src=${equipo.logo}>
                                          </div>
                                          <div class="col-6">
                                            <div class="row infoEquipo" align="left">
                                              <p class="tituloAtributo">Estadio: </p><span class="atributoModal">${equipo.estadio}</span>
                                              <p class="tituloAtributo">Ciudad: </p><span class="atributoModal">${equipo.ciudad}</span>
                                              <p class="tituloAtributo">Partidos Jugados: </p><span class="atributoModal">${equipo.partidosJugados}</span>
                                              <p class="tituloAtributo">Puntos: </p><span class="atributoModal">${equipo.puntos}</span>
                                              <p class="tituloAtributo">Ultimos partidos: </p>
                                              <span class="atributoModal">${getRandomImage(arrayImg, "")}${getRandomImage(arrayImg, "")}${getRandomImage(arrayImg, "")}${getRandomImage(arrayImg, "")}${getRandomImage(arrayImg, "")}</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="modal-footer justify-content-center">
                                        <p>Clasificacion actual: 1</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                      <div class="teamCard">
                                        <img src=${equipo.logo} class="card-img-top" alt="...">
                                        <p class="card-title-equipos">${equipo.nombre}</p>
                                      </div>
                                  </a>
                                </div>`);
                              }
}
else{
  $('.list-group-bundes').html(`<h2 class="tituloBanner">No existen equipos en esta liga. Por favor, agreguelos manualmente o cargue una base de datos.</h2>`)
}


function getRandomImage(imgAr, path) {
    path = path || '/assets/formIcons/'; // default path here
    var num = Math.floor( Math.random() * imgAr.length );
    var img = imgAr[ num ];
    var imgStr = '<img class="iconForma" src="' + path + img + '" alt = "">';
    return imgStr;
}