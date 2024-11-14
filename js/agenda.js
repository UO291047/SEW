class Agenda{

    constructor(){
        this.url = "https://ergast.com/api/f1/current";
        this.last_api_call = null;
        this.las_api_result = null;
        this.delayBetweenCalls = 10 * 60 * 1000; // 10 minutos en milisegundos
    }

    cargarDatos(){
        $.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: function(datos){
                //$("h5").text((new XMLSerializer()).serializeToString(datos));
                var h4 = "";
                var article = "";
                
                //Presentación de los datos contenidos en XML
                $('Race',datos).each(function(i, item){
                    var stringDatos = "<p>Carrera: " + $('RaceName',item).text() + "</p>";
                    stringDatos += "<p>Circuito: " + $('CircuitName',item).text() + "</p>";
                    stringDatos += "<p>Coordenadas: [" + $('Location',item).attr('lat') + "," + $('Location',datos).attr('long') + "]</p>";
                    stringDatos += "<p>Fecha: " + $('Date:first',item).text() + "</p>";
                    stringDatos += "<p>Hora: " + $('Time:first',item).text().split("Z")[0] + "</p>";

                    h4 = "<h4> " + "Carrera " + (i+1) + "</h4>";
                    article = "<article> " + h4 + stringDatos + "</article>";
                    $("section").html($("section").html() + article);
                });
                
            },
            error:function(){
                $("h3").remove();
                //$("h5").remove();
                $("section").remove();
            }
        });
    }

    crearElemento(tipoElemento, texto, insertarAntesDe){
        // Crea un nuevo elemento modificando el árbol DOM
        // El elemnto creado es de 'tipoElemento' con un 'texto' 
        // El elemnto se coloca antes del elemnto 'insertarAntesDe'
        var elemento = document.createElement(tipoElemento); 
        elemento.innerHTML = texto;
        $(insertarAntesDe).before(elemento);
    }

    verXML(){

        //Muestra el archivo XML recibido   
        this.crearElemento("h3", "Datos", "footer")
        this.crearElemento("section","","footer");
        const now = new Date().getTime();
        if (this.last_api_call == null || now - this.last_api_call >= this.delayBetweenCalls){
            this.cargarDatos();
            this.las_api_result = $("section").html();
            this.last_api_call = now;
        }else{
            $("section").html() = this.las_api_result;
        }
        $("button").attr("disabled","disabled");
    }

}