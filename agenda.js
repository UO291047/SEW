class Agenda{

    constructor(){
        this.url = "https://ergast.com/api/f1/current"; //La url debe ser siempre https
        this.last_api_call = null;
        this.las_api_result = null;
    }

    cargarDatos(){
        $.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: function(datos){
                //$("h5").text((new XMLSerializer()).serializeToString(datos));
                
                //Presentación de los datos contenidos en XML
                $('Race',datos).each(function(item){
                    var stringDatos = "<ul><li>Carrera: " + $('RaceName',item).text() + "</li>";
                    stringDatos += "<li>Circuito: " + $('CircuitName',item).text() + "</li>";
                    stringDatos += "<li>Coordenadas: [" + $('Location',item).attr('lat') + "," + $('Location',datos).attr('long') + "]</li>";
                    stringDatos += "<li>Fecha: " + $('Date',item).text() + "</li>";
                    stringDatos += "<li>Hora: " + $('Time',item).text() + "</li>";

                    $("pre").html(stringDatos);
                });
                
            },
            error:function(){
                $("h4").remove();
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
        this.crearElemento("h4", "Datos", "footer")  
        //this.crearElemento("h5", "", "h4") 
        this.crearElemento("pre","","footer"); // Crea un elemento con DOM para el string con JSON
        this.cargarDatos();
        $("button").attr("disabled","disabled");
    }

}