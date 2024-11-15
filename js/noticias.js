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
            var lector = new FileReader();

            lector.onload = function(event){
                const noticias = lector.result.split('\n');
                for(var n of noticias){
                    var titular = n.split('_')[0];
                    var entradilla = n.split('_')[1];
                    var autor = n.split('_')[2];

                    var noticia = "<article>" 
                                    + " <h4>" + titular + "</h4> " 
                                    + " <p>" + entradilla + "</p> " 
                                    + " <p>" + autor + "</p> " 
                                + "</article>";
                    $("section:last").html($("section:last").html() + noticia);
                }
            }

            lector.readAsText(archivo);

        }
        else {
            alert("Error : ¡¡¡ Archivo no válido !!!");
        }
    }

    crearNoticia(){
        var titular = document.getElementsByName("titular")[0];
        var entradilla = document.getElementsByName("entradilla")[0];
        var autor = document.getElementsByName("autor")[0];

        var noticia = "<article>" 
                        + " <h4>" + titular.value + "</h4> " 
                        + " <p>" + entradilla.value + "</p> " 
                        + " <p>" + autor.value + "</p> " 
                    + "</article>";
        $("section:last").html($("section:last").html() + noticia);

        titular.value = "";
        entradilla.value = "";
        autor.value = "";
    }

}