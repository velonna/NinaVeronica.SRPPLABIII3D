export class Anuncio{
    constructor(id, titulo,transaccion, descripcion, precio ){
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
    }

}

export default class Anuncio_auto extends Anuncio{
    constructor(id, titulo,transaccion, descripcion, precio ,  puerta, kms, potencia, tipos){
        super(id, titulo,transaccion,  descripcion, precio )        
        this.puerta = puerta;
        this.kms = kms;
        this.potencia = potencia;
        this.tipos =tipos;
    }

}