import Anuncio_Macota,{Anuncio} from "./anuncio.js"

function obtenerAnuncio(proximoId, frm){
    let valoresCheck = [];

    const cbs = document.querySelectorAll('input[name="chkTipos"]:checked');

    cbs.forEach((cb) => {

        console.log(cb);

        valoresCheck.push(cb.value);

    });
    let transaccion="Venta";
    if(document.getElementById("rdoA").checked){
        transaccion="Alquiler";
    }
    const nuevoAnuncio = new Anuncio_Macota(proximoId, frm.titulo.value,
        transaccion,  frm.descripcion.value, frm.precio.value,  frm.puerta.value
    , frm.kms.value, frm.potencia.value,valoresCheck);
    return nuevoAnuncio;    
}


function mostrarAnuncio(anuncio){

    const frm = document.forms[0];
    frm.id.value = anuncio.id;
    frm.titulo.value = anuncio.titulo;
    frm.descripcion.value = anuncio.descripcion;
    frm.precio.value = anuncio.precio;
    if(anuncio.transaccion=="Alquiler"){
        document.getElementById("rdoA").checked=true;
    }else{document.getElementById("rdoV").checked=true;}
    frm.puerta.value = anuncio.puerta;
    frm.kms.value = anuncio.kms
    frm.potencia.value = anuncio.potencia;
    const cbs = document.querySelectorAll('input[name="chkTipos"]');

    cbs.forEach((cb) => {

        console.log(cb);

        console.log(anuncio.tipos);

        console.log(cb.value);

        if(anuncio.tipos.includes(cb.value)){

            cb.checked = true;

        }

    });
    onCambioId(frm);
}


function onCambioId(frm){
    if(frm.id.value == ''){
        frm.alta.hidden = false;
        frm.modificar.hidden = true;
        frm.baja.hidden = true;
        frm.cancelar.hidden = false;
        const checkboxes = document.querySelectorAll('input[name="chkTipos"]');      

        checkboxes.forEach((checkbox) => {

           checkbox.checked= false;

        });

    }else{
        console.log(frm.alta);
        frm.alta.hidden = true;
        frm.modificar.hidden = false;
        frm.baja.hidden = false;
        frm.cancelar.hidden = false;

    }
}
export default function crearTabla(lista){
    const tabla = document.createElement('table');
    tabla.appendChild(crearCabecera(lista[0]));
    tabla.appendChild(crearCuerpo(lista));

    return tabla;
}

function crearCabecera(item){
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    for(const key in item){
        const th = document.createElement('th');
        const texto = document.createTextNode(key);
        th.appendChild(texto);
        tr.appendChild(th);
    }
    thead.appendChild(tr);
    return thead;

}

function crearCuerpo(lista){
    const tbody = document.createElement('tbody');

    lista.forEach(element => {
        const tr = document.createElement('tr');
        for (const key in element) {
            const td = document.createElement('td');
            const texto = document.createTextNode(element[key]);
            td.appendChild(texto);
            tr.appendChild(td);  

        }
        if(element.hasOwnProperty('id')){
            tr.setAttribute('data-id', element['id']);
        }
        agregarManejadorTR(tr, lista);
        tbody.appendChild(tr);
    });
    return tbody;
}
function agregarManejadorTR(tr, lista){
    if(tr){
        tr.addEventListener("click", function(e){
            
            mostrarAnuncio(
                (lista.filter((el) => el.id == e.target.parentNode.dataset.id ))[0]
            );
          
        })

    }
}

export {obtenerAnuncio, mostrarAnuncio, onCambioId}