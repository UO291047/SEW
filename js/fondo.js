class Fondo{
    constructor(nombre_pais, nombre_capital, coords){
        this.nombre_pais = nombre_pais;
        this.nombre_capital = nombre_capital;
        this.coords = coords;
    }

    setFondo() {
        var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        $.getJSON(flickrAPI, 
                {
                    tags: this.nombre_capital,
                    tagmode: "any",
                    format: "json"
                })
            .done(function(data) {
                    $.each(data.items, function(i, item) {
                        var media = item.media.m;
                        $("body").css("background-image", media.replace("-n.jpg", "-b.jpg"));
                        return false;
                    });
        });
    }
}
