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
                const mainElement = document.querySelector("main");
                for(var n of noticias){
                    var titulo = n.split('_')[0];
                    var entradilla = n.split('_')[1];
                    var texto = n.split('_')[2];
                    var autor = n.split('_')[3];

                    var noticia = document.createElement("p");
                    noticia.innerHTML = " <h4>"+titulo+"</h4> " + " <p><strong>"+entradilla+"</strong></p> " + " <p>"+texto+"</p> " + " <p>"+autor+"</p> "
                    mainElement.appendChild(noticia);
                }
            }

            lector.readAsText(archivo);

        }
        else {
            alert("Error : ¡¡¡ Archivo no válido !!!");
        }
    }

    crearNoticia(){
        const mainElement = document.querySelector("main");
        var titulo = document.getElementsByName("titulo")[0].value;
        var entradilla = document.getElementsByName("entradilla")[0].value;
        var texto = document.getElementsByName("contenido")[0].value;
        var autor = document.getElementsByName("autor")[0].value;

        var noticia = document.createElement("p");
        noticia.innerHTML = " <h4>"+titulo+"</h4> " + " <p><strong>"+entradilla+"</strong></p> " + " <p>"+texto+"</p> " + " <p>"+autor+"</p> "
        mainElement.appendChild(noticia);
    }

}