
"use strict";
class Memoria {

    elements = {
        "card1": {
            "element": "HTML5",
            "source": "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg",
            "data-state": "init"
        },
        "card2": {
            "element": "HTML5",
            "source": "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg",
            "data-state": "init"
        },
        "card3": {
            "element": "CSS3",
            "source": "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg",
            "data-state": "init"
        },
        "card4": {
            "element": "CSS3",
            "source": "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg",
            "data-state": "init"
        },
        "card5": {
            "element": "JS",
            "source": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg",
            "data-state": "inti"
        },
        "card6": {
            "element": "JS",
            "source": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg",
            "data-state": "init"
        },
        "card7": {
            "element": "PHP",
            "source": "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg",
            "data-state": "init"
        },
        "card8": {
            "element": "PHP",
            "source": "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg",
            "data-state": "init"
        },
        "card9": {
            "element": "SVG",
            "source": "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg",
            "data-state": "init"
        },
        "card10": {
            "element": "SVG",
            "source": "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg",
            "data-state": "init"
        },
        "card11": {
            "element": "W3C",
            "source": "https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg",
            "data-state": "init"
        },
        "card12": {
            "element": "W3C",
            "source": "https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg",
            "data-state": "init"
        }
    }

    constructor(){
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firtsCard = null;
        this.secondCard = null;
    }

    shuffleElements(){
        suffle(this.elements);
    }

    unflipCards(){
        this.lockBoard = true;
        setTimeout(this.elements.forEach(card => {
            card["state"] = init;
        }), 2000);
    }

    resetBoard(){
        this.firtsCard = null;
        this.secondCard = null;
        this.hasFlippedCard = false;
        this.lockBoard = false;
    }

    checkForMatch(){
        if(this.firtsCard == this.secondCard){
            this.disableCards();
        }else{
            this.resetBoard();
        }
    }

    disableCards(){
        this.firtsCard["data-state"] = "revealed";
        this.secondCard["data-state"] = "revealed";
        this.resetBoard();
    }

    createElements(){
        this.elements.forEach(
            card => {
                document.write("<article class=flex-item data-element=" + card["data-state"] + ">" + 
                        "<h2> Tarjeta de Memoria </h2>" +
                        "<img src=" + card["source"] + "alt=" + card["element"] + ">"
                    + "</article>");
            }
        );
        
    }

}