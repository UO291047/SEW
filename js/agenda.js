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
                
                //Presentación de los datos contenidos en XML
                $('Race',datos).each(function(i, item){
                    var stringDatos = "<h4>Carrera " + i + " </h4>"
                    stringDatos += "<ul><li>Carrera: " + $('RaceName',item).text() + "</li>";
                    stringDatos += "<li>Circuito: " + $('CircuitName',item).text() + "</li>";
                    stringDatos += "<li>Coordenadas: [" + $('Location',item).attr('lat') + "," + $('Location',datos).attr('long') + "]</li>";
                    stringDatos += "<li>Fecha: " + $('Date:first',item).text() + "</li>";
                    stringDatos += "<li>Hora: " + $('Time:first',item).text() + "</li>";

                    $("pre").append(stringDatos);
                });
                
            },
            error:function(){
                $("h3").remove();
                //$("h5").remove();
                $("pre").remove();
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
        //this.crearElemento("h5", "", "h4") 
        this.crearElemento("pre","","footer");
        const now = new Date().getTime();
        if (this.last_api_call == null || now - this.last_api_call >= this.delayBetweenCalls){
            this.cargarDatos();
            this.las_api_result = $("pre").html();
            this.last_api_call = now;
        }else{
            $("pre").html() = this.las_api_result;
        }
        $("button").attr("disabled","disabled");
    }

}