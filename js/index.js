
import Anuncio_auto,{Anuncio} from "./anuncio.js"
import crearTabla,{obtenerAnuncio, mostrarAnuncio, onCambioId} from './controllers.js'

let lista;
let frm;
let proximoId;
let divTabla;

window.addEventListener('load', inicializarManejadores);

function inicializarManejadores(){
    lista = obtenerAnuncios();
    
    divTabla = document.getElementById('divTabla');
    
    actualizarTabla();
    frm = document.forms[0];
    proximoId = obtenerId();
    onCambioId(frm);
    frm.cancelar.addEventListener('click', e=>{
        frm.id.value = '';
        onCambioId(frm);
    })
    frm.addEventListener('submit', e=>{
        e.preventDefault();
        if(e.submitter.id == "alta"){
            if ( confirm( 'Seguro que desea guardar este anuncio?' ) ) { 

                const nuevoAnuncio = obtenerAnuncio(proximoId, frm);

                if(nuevoAnuncio){

                    lista.push(nuevoAnuncio);

                    proximoId++;

                    guardarDatos();

                    actualizarTabla();

                    frm.reset();
                    msj('Agregando', 'El anuncio se agrego correctamente! ', 'Cerrar');
               }   
            

            } else {   

                frm.reset();   

            }

        }
        if(e.submitter.id == "modificar"){

            if ( confirm( 'Seguro que desea modificar este anuncio?' ) ) { 
                const nuevoAnuncio = obtenerAnuncio(Number(frm.id.value), frm);
                console.log(nuevoAnuncio);
                lista = lista.map(function(obj){
                    if(obj.id == nuevoAnuncio.id){
                        return nuevoAnuncio;
                    }else{
                        return obj;
                    }
                });
                guardarDatos();
                actualizarTabla();
                frm.reset();
                frm.id.value = '';
                onCambioId(frm);
                
                msj('Modificando', ' El anuncio se modifico correctamente!', 'Cerrar');

            } else {   

                frm.reset(); 
                frm.id.value = '';
                onCambioId(frm);  

            }

        }
        if(e.submitter.id == "baja"){
            if ( confirm( 'Seguro que desea eliminar este anuncio?' ) ) { 
                const id = Number(frm.id.value);
                lista = lista.filter(function(obj){
                    return obj.id != id;
                });
                guardarDatos();
                actualizarTabla();
                frm.reset();
                frm.id.value = '';
                onCambioId(frm);
                msj('Eliminando', ' El anuncio se elimino correctamente!', 'Cerrar');
            }else {   

                frm.reset();   
                frm.id.value = '';
            }
                
        }
        
    })

}



function obtenerAnuncios(){
    return JSON.parse(localStorage.getItem('anuncio')) || [];
}

function obtenerId(){
    return JSON.parse(localStorage.getItem('nextId')) || 20000;
}



function guardarDatos(){
    localStorage.setItem('anuncio', JSON.stringify(lista));
    localStorage.setItem('nextId', proximoId);
}

function actualizarTabla(){
    console.log(divTabla);
    vaciarElemento(divTabla);
    insertarSpinner(divTabla);
    
    setTimeout(() => {
        
        vaciarElemento(divTabla);
        divTabla.appendChild(crearTabla(lista));
    }, 3000);
}

function vaciarElemento(elemento){
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
      }
}
function insertarSpinner(elemento){
  const div = document.createElement('div');
  div.setAttribute('align', 'center')
  div.className = 'spinner'

  elemento.appendChild(div);
}
/*******Recuperatorio******************* */
function borrar(id) {var elem = document.getElementById(id); return elem.parentNode.removeChild(elem);}
function msj(titulo, contenido, idioma) {
var padre = document.createElement('div');
padre.id = 'modal';
document.body.appendChild(padre);
var bc = idioma ? idioma : 'Aceptar';
var ModalData = document.getElementById("modal");
var boton = "";
ModalData.innerHTML = '<div id="modal-back"></div><div class="modal"><div id="modal-c"><h3>'+titulo+'</h3><span id="mc">'+contenido+'</span><div id="buttons"><a id="mclose" href="#">'+bc+'</a>'+boton+'</div></div></div>';
document.querySelector(".modal").style.height = document.getElementById("mc").offsetHeight+100 + 'px';
document.getElementById('mclose').onclick=function(){ borrar('modal'); };
document.getElementById('modal-back').onclick=function(){ borrar('modal'); }
}
/************************* */
document.documentElement.style.setProperty("--mainColor", localStorage.getItem("userThemeColor"));

var colorInput = document.querySelector("#choose-theme-color");

colorInput.addEventListener("change", function() {
  
  // Theme the site!
  document.documentElement.style.setProperty("--mainColor", this.value);
  
  // Save the value for next time page is visited.
  localStorage.setItem("userThemeColor", this.value);
  
});

