class Noticias{

    constructor(){
        if(!(window.File && window.FileReader && window.FileList && window.Blob)){  
            alert("Este navegador NO soporta el API File y este programa no puede funcionar correctamente");
        }
    }

    readInputFile(files){
        var archivo = files[0];
        var tipoTexto = /text.*/;
        if (archivo.type.match(tipoTexto)) 
        {
            var result;
            var lector = new FileReader();

            lector.onload = function (evento) {
                this.parseNoticias(lector.result);
            }

            lector.readAsText(archivo);

        }
        else {
            alert("Error : ¡¡¡ Archivo no válido !!!");
        }
    }

    parseNoticias(result){
        
    }

}