
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

        setTimeout(() => {
            this.firtsCard["data-state"] = 'init';
            this.firtsCard.classList.remove('flip');

            this.secondCard["data-state"] = 'init';
            this.secondCard.classList.remove('flip');
    
            this.resetBoard();
        }, 2000);
        
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
        this.secondCard["data-state"] = "revealed";
        this.resetBoard();
    }

    createElements() {
        const container = document.querySelector(".flex-container");
        for (const card of this.shuffleElements) {
            const article = document.createElement("article");
            article.dataset.element = card["element"];
            article.innerHTML = "<h3> Tarjeta de Memoria </h3>" +
                "<img src=" + card["source"] + " alt=" + card["element"] + ">";
            container.appendChild(article);
        }
    }
    

    flipCard(card) {
        if (this.lockBoard || card.classList.contains('revealed')) {
            return;
        }
    
        card.classList.add('flip');
    
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

}

