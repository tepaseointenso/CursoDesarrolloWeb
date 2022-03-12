fetch("/database/laliga.json")
  .then(response => response.json())
  .then(parsed_data => {
    baseDatosLiga = parsed_data;
  });
fetch("/database/premier.json")
  .then(response => response.json())
  .then(parsed_data => {
    baseDatosPremier = parsed_data;
  });
fetch("/database/serieA.json")
  .then(response => response.json())
  .then(parsed_data => {
    baseDatosSerieA = parsed_data;
});
fetch("/database/bundes.json")
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
let ranking = 0;
let ligaElegida = 'premierEquipos';
let todasLigas = [];
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
        todasLigas = ['laLigaEquipos','premierEquipos', 'serieAequipos', 'bundesEquipos'];
        localStorage.setObj("laLigaEquipos", laLigaEquipos);
        localStorage.setObj("premierEquipos", premierEquipos);
        localStorage.setObj("serieAequipos", serieAequipos);
        localStorage.setObj("bundesEquipos", bundesEquipos);
        localStorage.setObj("todasLigas", todasLigas);
        localStorage.setItem("primeraVisita", false);
        calcularPosicion();
        Swal.fire({
          background: '#37003A',
          color: 'white',
          title: 'Base de datos restablecida!',
          text: 'La base de datos se ha restablecido correctamente',
          icon: 'success',
          confirmButtonText: 'Listo',
          confirmButtonColor: '#FF57A8'
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
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

if(localStorage.getObj("bundesEquipos") === null){
  var bundesEquipos = [];
}
else{
  var equipos = localStorage.getObj("bundesEquipos");
  var bundesEquipos = Object.values(equipos);
}

if (localStorage.getItem("todasLigas")){
  for (liga of todasLigas){
    if (!window[liga]){
      window[liga] = [];
    }
  }
  calcularPosicion();
  mostrarModalesLigas();
  llenarSelect();
  llenarTabsClasificacion();
  tabsClasificacion();
  llenarContenidoClasificacion();

}

class Equipo {
  constructor(id,logo,nombre,pais,ciudad,estadio,partidosGanados,partidosEmpatados,partidosPerdidos,ranking) {
    this.id = id;
    this.logo = logo;
    this.nombre = nombre;
    this.ciudad = ciudad;
    this.pais = pais;
    this.estadio = estadio;
    this.partidosGanados = parseInt(partidosGanados);
    this.partidosEmpatados = parseInt(partidosEmpatados);
    this.partidosPerdidos = parseInt(partidosPerdidos);
    this.partidosJugados = (this.partidosGanados + this.partidosEmpatados + this.partidosPerdidos);
    this.puntos = (this.partidosGanados*3 + this.partidosEmpatados*1 + this.partidosPerdidos*0);
    this.ranking = ranking;
  }
}



$(".añadirEquipo").click(() => {
    document.location.href = 'equipos.html#containerEquipo';
  }); 
$(".verFooter").click(() => {
    document.location.href = '#footer';
  }); 

$(".btnForm").click(() => {
  $("#agregarEquipo")[0].reset();
});



function crearEquipo(e){
  e.preventDefault();
  if ($("#pais").val() == 'nuevaLiga'){
    ligaElegida = $("#nombreNuevaLiga").val().toLowerCase();
    ligaElegida = ligaElegida.replace(/\s/g, '');
    ligas = localStorage.getObj("todasLigas");
    todasLigas = Object.values(ligas);

    if(!todasLigas.includes(ligaElegida)){
      todasLigas.push(ligaElegida);
      localStorage.setObj('todasLigas', todasLigas);
      ligaActual = [];
    }
    else{
      alert("Esta liga ya existe, seleccionela en la lista.");
    }
  }
  else{
    ligaElegida = $("#pais").val();
    equipos = localStorage.getObj(ligaElegida);
    ligaActual = Object.values(equipos);
  }

  pais = ligaElegida;
  

  if($("#logoEquipo").val().length === 0){
    $("#logoEquipo").val('/assets/placeholder.png');
  }


  idEquipo = ligaActual.length + 1;

  
  let nuevoEquipo = new Equipo(
    idEquipo,
    $("#logoEquipo").val(),
    $("#nombre").val(),
    pais,
    $("#ciudad").val(),
    $("#estadio").val(),
    $("#ganados").val(),
    $("#empatados").val(),
    $("#perdidos").val()
    );

  $("#agregarEquipo")[0].reset();

  ligaActual.push(nuevoEquipo);
  localStorage.setObj(ligaElegida, ligaActual);
  ordenarTabla("PT", ligaElegida);
  ordenPT = false;

  confirmation(nuevoEquipo.nombre, ligaElegida);
  
}

$("#agregarEquipo").submit(crearEquipo);

function confirmation(nombre,liga){
  tabLiga = "tab" + liga;
  divTab = "#" + tabLiga;
  Swal.fire({
    title: '¡Equipo agregado!',
    text: `El equipo ${nombre} fue agregado correctamente ${liga}`,
    icon: 'success',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ver Clasificacion',
    cancelButtonText: 'Agregar más equipos'
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "../clasificacion.html"; 
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
      ligasName = localStorage.getObj("todasLigas");
      todasLigas = Object.values(ligasName);
      let indice = todasLigas.indexOf(ligaElegida);
      todasLigas.splice(indice,1);
      localStorage.setObj("todasLigas", todasLigas);
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



$('.nav-link-teams').ready(function(){
  $('.nav-link-teams')[0].click();
});

$("#v-pills-tab").ready(function(){
  $("#v-pills-tab button:first-child")[0].click();
});



function ordenarTabla(filtro,ligaElegida){
 

  if (ligaActual.length != 1){
    equipos = localStorage.getObj(ligaElegida);
    ligaActual = Object.values(equipos);
  if (filtro === "Club"){
    ordenPT = false;
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
    ordenPT = false;
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
      ordenPT = false;
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
        ordenPT = false;
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
          ordenPT = false;
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
                else if (a.partidosJugados<b.partidosJugados){
                  if (ordenPT == true){
                    return 1;
                  }
                  else{
                    return -1;
                  }
                }
                else{
                  if (a.partidosGanados<b.partidosGanados){
                    if (ordenPT == true){
                      return -1;
                    }
                    else{
                      return 1;
                    }
                  }
                  else if (a.partidosGanados>b.partidosGanados){
                    if (ordenPT == true){
                      return 1;
                    }
                    else{
                      return -1;
                    }
                  }
                  else{
                    if (a.nombre<b.nombre){
                      if (ordenPT == true){
                        return -1;
                      }
                      else{
                        return 1;
                      }
                    }
                    else if (a.nombre>b.nombre){
                      if (ordenPT == true){
                        return 1;
                      }
                      else{
                        return -1;
                      }
                    }
                  }
                  if (ordenPT == true){
                    return 1;
                  }
                  else return -1;
                }
              }
              });
              ordenPT = !ordenPT;
            }
    localStorage.setObj(ligaElegida,ligaActual)
    mostrarTabla(ligaElegida);
  }
}


function mostrarTabla(ligaElegida){
  divLigaElegida = "#" + ligaElegida;
  ligaActual = localStorage.getObj(ligaElegida);
  if ($(divLigaElegida).ready()){
    if (ligaActual.length === 0){
      $(divLigaElegida).html("");
      $(divLigaElegida).append(`<h2 class="tituloBanner">No existen equipos en la base de datos. Por favor, agreguelos manualmente o cargue una base de datos.</h2>`)    
    }
    else{
      $(divLigaElegida).html("");
        $(divLigaElegida).append(`
                            <tr class="cabeceraTabla">
                            <td><a onclick="ordenarTabla('PT',ligaElegida);">Pos.</td>
                            <td><a onclick="ordenarTabla('Club',ligaElegida);">Club</td>
                            <td><a onclick="ordenarTabla('PJ',ligaElegida);">PJ</a></td>
                            <td><a onclick="ordenarTabla('GA',ligaElegida);">G</td>
                            <td><a onclick="ordenarTabla('EM',ligaElegida);">E</td>
                            <td><a onclick="ordenarTabla('PE',ligaElegida);">P</td>
                            <td><a onclick="ordenarTabla('PT',ligaElegida);">Pts</td>
                        </tr>
                          `)
      for (equipo of ligaActual){
        let clubID = ligaElegida + equipo.id;
        let divClub = '#' + clubID;

        $(divLigaElegida).append(`
                            <tr id=${clubID}>
                              <td class="nPosicion">${equipo.ranking}</td>
                              <td class="clubName"><span class="logosTabla mx-3"><img src=${equipo.logo}></img></span>${equipo.nombre}</td>
                              <td>${equipo.partidosJugados}</td>
                              <td>${equipo.partidosGanados}</td>
                              <td>${equipo.partidosEmpatados}</td>
                              <td>${equipo.partidosPerdidos}</td>
                              <td>${equipo.puntos}</td>
                            </tr>
                              `);
        if(ordenPT){
          if(equipo.ranking <= 4){
            $(divClub).css("backgroundColor", '#4285F45d');
          }
          else if(equipo.ranking === 5){
            $(divClub).css("backgroundColor", '#FA7B175d');
          }
          else if(equipo.ranking > ligaActual.length-3){
            $(divClub).css("backgroundColor", '#EA43355d');
          }
          else if((ligaElegida === 'laLigaEquipos' || ligaElegida === 'serieAequipos')  && equipo.ranking === 6){
            $(divClub).css("backgroundColor", '#34A8535d');
          }
        }
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
      todasLigas = ['laLigaEquipos','premierEquipos', 'serieAequipos', 'bundesEquipos'];
      localStorage.setObj("laLigaEquipos", laLigaEquipos);
      localStorage.setObj("premierEquipos", premierEquipos);
      localStorage.setObj("serieAequipos", serieAequipos);
      localStorage.setObj("bundesEquipos", bundesEquipos);
      localStorage.setObj("todasLigas", todasLigas);
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




$("#pais").change(() =>{
  if($("#pais").val() === 'nuevaLiga'){
    $("#ligaOpcional").html("");
    $("#ligaOpcional").append(`<p>
                                <label for="">Nombre de la nueva liga</label>
                                <input type="text" placeholder="Ingresa el nombre de la liga" id="nombreNuevaLiga"/>
                                </p>`)
  }
  else{
    $("#ligaOpcional").html("");
  }
})



function mostrarModalesLigas(){
  if(localStorage.getItem("todasLigas")){
    ligas = localStorage.getObj("todasLigas");
    for (nombreLiga of ligas){
      nombreLigaNoSpace = nombreLiga.replace(/\s/g, '');
      if(nombreLiga == "laLigaEquipos"){
        tituloTab = 'laLiga Santander';
      }
      else if (nombreLiga == "premierEquipos"){
        tituloTab = 'Premier League';
      }
      else if (nombreLiga == "serieAequipos"){
        tituloTab = "Serie A";
      }
      else if (nombreLiga == "bundesEquipos"){
        tituloTab = "Bundesliga";
      }
      else{
        tituloTab = nombreLiga;
      }
      noDuplicateId = nombreLigaNoSpace + "tab";
      idRefLiga = "#" + noDuplicateId;
      $("#tabsLigas").append(`<li class="nav-item-teams">
                                <a class="nav-link-teams"  data-bs-toggle="tab" href="${idRefLiga}" >${tituloTab}</a>
                              </li>`);
      divInfoEquipo = `list-group-${nombreLigaNoSpace}`;
      classInfoEquipo = ".list-group-" + nombreLigaNoSpace;
      row = divInfoEquipo + " row";
      $("#bodyTabsLigas").append(`
                              <div class="tab-pane fade" id=${noDuplicateId}>
                                <div id="listadoEquipos" class="${row}"></div>
                              </div>`);                       

      liga = localStorage.getObj(nombreLigaNoSpace);
      ligaActual = Object.values(liga);
      if (ligaActual.length != 0){
        for (equipo of ligaActual){
          let nombreModal = "modal" + nombreLiga + equipo.id;
          let containModal = 'contain' + nombreLiga + equipo.id;
          let idContainModal = '#' + containModal;
          $(classInfoEquipo).append(`
              <div class="col-lg-2 col-md-4 col-sm-6" align="center">
              <a href="#" data-bs-toggle="modal" data-bs-target=${idContainModal}>
              <div class="modal fade " id=${containModal} tabindex="-1" aria-labelledby=${nombreModal} aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered modal-lg">
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
                    <p>Clasificacion actual: ${equipo.ranking}</p>
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
        $(classInfoEquipo).html(`<h2 class="tituloBanner">No existen equipos en esta liga. Por favor, agreguelos manualmente o cargue una base de datos.</h2>`)
      }
    }
  }
}


function getRandomImage(imgAr, path) {
    path = path || '/assets/formIcons/'; // default path here
    var num = Math.floor( Math.random() * imgAr.length );
    var img = imgAr[ num ];
    var imgStr = '<img class="iconForma" src="' + path + img + '" alt = "">';
    return imgStr;
}



function calcularPosicion(){
  ligas = localStorage.getObj("todasLigas");
  todasLigas = Object.values(ligas);
  for (liga of todasLigas){
    equipos = localStorage.getObj(liga);
    ligaActual = Object.values(equipos);
    ordenPuntos(ligaActual);
    for (equipo of ligaActual){
      let ranking = ligaActual.findIndex( ele => ele.id == equipo.id ) + 1;
      equipo.ranking = ranking;
    }
    localStorage.setObj(liga, ligaActual);
  }
  return ligaActual;
}


function ordenPuntos(liga){
    ordenPT = false;
    liga.sort(function(a,b){
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
        else if (a.partidosJugados<b.partidosJugados){
          if (ordenPT == true){
            return 1;
          }
          else{
            return -1;
          }
        }
        else{
          if (a.partidosGanados<b.partidosGanados){
            if (ordenPT == true){
              return -1;
            }
            else{
              return 1;
            }
          }
          else if (a.partidosGanados>b.partidosGanados){
            if (ordenPT == true){
              return 1;
            }
            else{
              return -1;
            }
          }
          if (ordenPT == true){
            return 1;
          }
          else return -1;
        }
      }
      });
      ordenPT = true;
      return ligaActual;
    }

function llenarSelect(){
  
$.each(todasLigas, function(val, text) {
  textNoSpace = text.replace(/\s/g, '');
  if(text === "premierEquipos"){
    $('#pais').append( $('<option></option>').val("premierEquipos").html("Premier League (Inglaterra)"));
  }
  else if (text === "serieAequipos"){
    $('#pais').append( $('<option></option>').val("serieAequipos").html("Serie A (Italia)"));
  }
  else if (text === "laLigaEquipos"){
    $('#pais').append( $('<option></option>').val("laLigaEquipos").html("laLiga (España)"));
  }
  else if (text === "bundesEquipos"){
    $('#pais').append( $('<option></option>').val("bundesEquipos").html("Bundesliga (Alemania)"));
  }
  else $('#pais').append( $('<option></option>').val(textNoSpace).html(text));
  })
  $('#pais').append( $('<option></option>').val("nuevaLiga").html("Crear nueva liga"));
}


function llenarTabsClasificacion(){
  $('#v-pills-tab').empty();      
  $.each(todasLigas, function(val, text) {
    textNoSpace = text.replace(/\s/g, '');
    idTab = "#tab" + textNoSpace;
    tituloTab = textNoSpace + "Tab";
    tituloNuevaLiga = text.replace('Equipos', '');
    if(text === "premierEquipos"){
      $('#v-pills-tab').append( $(`<button class="menuBtn btnRight" id=${tituloTab} data-bs-toggle="pill" data-bs-target=${idTab} type="button" role="tab" aria-controls="${textNoSpace}" aria-selected="false">Premier League</button>`));
    }
    else if(text === "serieAequipos"){
      $('#v-pills-tab').append( $(`<button class="menuBtn btnRight" id=${tituloTab} data-bs-toggle="pill" data-bs-target=${idTab} type="button" role="tab" aria-controls="${textNoSpace}" aria-selected="false">Serie A</button>`));
    }
    else if(text === "laLigaEquipos"){
      $('#v-pills-tab').append( $(`<button class="menuBtn btnRight" id=${tituloTab} data-bs-toggle="pill" data-bs-target=${idTab} type="button" role="tab" aria-controls="${textNoSpace}" aria-selected="false">laLiga Santander</button>`));
    }
    else if(text === "bundesEquipos"){
      $('#v-pills-tab').append( $(`<button class="menuBtn btnRight" id=${tituloTab} data-bs-toggle="pill" data-bs-target=${idTab} type="button" role="tab" aria-controls="${textNoSpace}" aria-selected="false">Bundesliga</button>`));
    }
    else{
      $('#v-pills-tab').append( $(`<button class="menuBtn btnRight" id=${tituloTab} data-bs-toggle="pill" data-bs-target=${idTab} type="button" role="tab" aria-controls="${textNoSpace}" aria-selected="false">${tituloNuevaLiga}</button>`));
    }
    
  });
}

function llenarContenidoClasificacion(){

  $('#v-pills-tabContent').empty();      
  $.each(todasLigas, function(val, text) {
    textNoSpace = text.replace(/\s/g, '');
    nameTab = "tab" + textNoSpace;
    $('#v-pills-tabContent').append( $(`<div class="tab-pane fade" id=${nameTab} role="tabpanel" aria-labelledby=${nameTab}>
                                          <table id=${textNoSpace}>
                                          </table>
                                        <div id="parteInferior">
                                          <div class="updated">ACTUALIZADO A 23 DE FEBRERO DE 2022</div>
                                          <div id="leyenda" class="row justify-content-center mt-3 mb-3">
                                            <div class="col-12">
                                              <div class="row">
                                                <div class="col-1 championsLeague"></div>
                                                <div class="col-11">
                                                  Clasifica a UEFA Champions League
                                                </div>
                                              </div>
                                            </div>
                                            <div class="col-12">
                                              <div class="row">
                                                <div class="col-1 europaLeague"></div>
                                                <div class="col-11">
                                                Clasifica a UEFA Europa League
                                                </div>
                                              </div>
                                            </div>
                                            <div class="col-12">
                                              <div class="row">
                                                <div class="col-1 descenso"></div>
                                                <div class="col-11">
                                                  Descenso directo
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row justify-content-center">
                                              <div class="col-lg-6">
                                                  <button type="button" class="añadirEquipo full-width">Agregar nuevo equipo a esta liga</button>
                                              </div>
                                              <div class="col-lg-6">
                                                  <button type="button" class="btnClear full-width full-width">Borrar liga</button>
                                              </div>
                                          </div>
                                      </div>
                                      </div>`));
    $("#leyenda").html("");
    $("#leyenda").append(`
                        <div id="leyenda" class="row justify-content-center mt-3">
                          <div class="col-12">
                            <div class="row">
                              <div class="col-1 championsLeague"></div>
                              <div class="col-11">
                                Clasifica a UEFA Champions League
                              </div>
                            </div>
                          </div>
                          <div class="col-12">
                            <div class="row">
                              <div class="col-1 europaLeague"></div>
                              <div class="col-11">
                              Clasifica a UEFA Europa League
                              </div>
                            </div>
                          </div>
                          <div class="col-12">
                            <div class="row">
                              <div class="col-1 descenso"></div>
                              <div class="col-11">
                                Descenso directo
                              </div>
                            </div>
                          </div>
                        </div>`);
  });
}


function tabsClasificacion(){
  for (var s in todasLigas) {
    var sector = todasLigas[s];
    (function(liga){
      ligaTab = liga + "Tab";
      $("#" + ligaTab).on("click", function(e){
        ligaElegida = liga;
        equipos = localStorage.getObj(ligaElegida);
        ligaActual = Object.values(equipos);
        mostrarTabla(ligaElegida);
      });
    }(sector));
  }
}

