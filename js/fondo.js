"use strict";
class Fondo{
    constructor(pais, capital, circuito){
        this.pais = pais;
        this.capital = capital;
        this.circuito = circuito;
    }

    setFondo() {
        var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        $.getJSON(flickrAPI, 
                {
                    tags: this.circuito,
                    tagmode: "any",
                    format: "json"
                })
            .done(function(data) {
                    $.each(data.items, function(i, item) {
                        var media = item.media.m;
                        $("body").css({
                            "background-image": "url(" + media.replace("_m", "_b") + ")",
                            "background-repeat": "no-repeat",
                            "background-size": "cover"
                        });
                        if(i==1)
                            return false;
                    });
        });
    }
}