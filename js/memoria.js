"use strict";
class Memoria {

    elements = {
        "card1": {
            "element": "RedBull",
            "source": "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg",
            "data-state": "init"
        },
        "card2": {
            "element": "RedBull",
            "source": "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg",
            "data-state": "init"
        },
        "card3": {
            "element": "McLaren",
            "source": "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg",
            "data-state": "init"
        },
        "card4": {
            "element": "McLaren",
            "source": "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg",
            "data-state": "init"
        },
        "card5": {
            "element": "Alpine",
            "source": "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg",
            "data-state": "init"
        },
        "card6": {
            "element": "Alpine",
            "source": "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg",
            "data-state": "init"
        },
        "card7": {
            "element": "AstonMartin",
            "source": "https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg",
            "data-state": "init"
        },
        "card8": {
            "element": "AstonMartin",
            "source": "https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg",
            "data-state": "init"
        },
        "card9": {
            "element": "Ferrari",
            "source": "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg",
            "data-state": "init"
        },
        "card10": {
            "element": "Ferrari",
            "source": "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg",
            "data-state": "init"
        },
        "card11": {
            "element": "Mercedes",
            "source": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg",
            "data-state": "init"
        },
        "card12": {
            "element": "Mercedes",
            "source": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg",
            "data-state": "init"
        }
    }

    constructor(){
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firtsCard = null;
        this.secondCard = null;

        this.shuffleElements = this.shuffleElements.bind(this);
        this.unflipCards = this.unflipCards.bind(this);
        this.resetBoard = this.resetBoard.bind(this);
        this.checkForMatch = this.checkForMatch.bind(this);
        this.disableCards = this.disableCards.bind(this);

        this.shuffleElements();
        this.createElements();
        this.addEventListeners();
    }

    shuffleElements(){
        const values = Object.values(this.elements);
        values.sort(() => Math.random() - 0.5);
        this.shuffleElements = values;
    }

    unflipCards(){
        this.lockBoard = true;

        //Se añade como parte de las propuestas de las pruebas de usuario
        this.firtsCard["data-state"] = 'fail';
        this.firtsCard.dataset.state = this.firtsCard["data-state"];
        this.secondCard["data-state"] = 'fail';
        this.secondCard.dataset.state = this.secondCard["data-state"];

        setTimeout(() => {
            this.firtsCard["data-state"] = 'init';
            this.firtsCard.dataset.state = this.firtsCard["data-state"];

            this.secondCard["data-state"] = 'init';
            this.secondCard.dataset.state = this.secondCard["data-state"];
    
            this.resetBoard();
        }, 1000);
        
    }

    resetBoard(){
        this.firtsCard = null;
        this.secondCard = null;
        this.hasFlippedCard = false;
        this.lockBoard = false;
    }

    checkForMatch() {
        const isMatch = this.firtsCard.dataset.element === this.secondCard.dataset.element;
    
        isMatch ? this.disableCards() : this.unflipCards();
    }

    disableCards(){
        this.firtsCard["data-state"] = "revealed";
        this.firtsCard.dataset.state = this.firtsCard["data-state"];
        this.secondCard["data-state"] = "revealed";
        this.secondCard.dataset.state = this.secondCard["data-state"];
        this.resetBoard();
    }

    createElements() {
        const container = document.querySelector("body > section");
        for (const card of this.shuffleElements) {
            const article = document.createElement("article");
            article.dataset.element = card["element"];
            article.dataset.state = card["data-state"];
            article.innerHTML = "<h3> Tarjeta de Memoria </h3>" +
                "<img src=" + card["source"] + " alt=" + card["element"] + ">";
            container.appendChild(article);
        }
    }

    flipCard(card) {
        if (this.lockBoard || card.getAttribute("data-state") === "revealed" || card.getAttribute("data-state") === "flip") {
            return;
        }
    
        document.querySelector("audio").play();

        card["data-state"] = 'flip';
        card.dataset.state = card["data-state"];
    
        if (!this.hasFlippedCard) {
            // Primera carta volteada
            this.hasFlippedCard = true;
            this.firtsCard = card;
        } else {
            // Segunda carta volteada
            this.secondCard = card;
            this.checkForMatch();
        }
    }

    addEventListeners(){
        const cards = document.querySelectorAll("article");
        for (const card of cards) {
            card.addEventListener("click", () => this.flipCard(card));
        }
    }

    recargarPagina(){
        window.location.reload();
    }

    addEventListenerReload(){
        const reload = document.querySelector("button");
        reload.addEventListener("click", () => this.recargarPagina());
    }

}