class BlackJack {
  constructor(playertable, croupiertable) {
    this.playerTable = document.querySelector(playertable);
    this.croupierTable = document.querySelector(croupiertable);
    this.playerCounter = document.querySelector(".counterPlayer");
    this.croupierCounter = document.querySelector(".counterCroupier");
    this.options = Array.from(document.querySelectorAll(".btn"));
    this.usedNumber = new Array();
    this.playerPoints = 0;
    this.croupierPoints = 0;
    this.tail = new Array();
    this.charsList = ["♣", "♠", "♦", "♥"];
    this.numbersList = [
      "2",
      "3",
      "4",
      // "5",
      // "6",
      // "7",
      // "8",
      // "9",
      // "10",
      "J",
      // "Q",
      "K"
      // "A"
    ];
    this.initialGame();
  }

  renderCard = who => {
    let random;
    random = _.random(0, this.tail.length - 1);
    const renderedCard = this.tail[random];
    if (who) {
      this.playerPoints += this.getValueCard(
        renderedCard.getAttribute("value")
      );
      this.playerCounter.innerHTML = this.playerPoints;
      this.playerTable.appendChild(renderedCard);
    } else {
      console.log(renderedCard);
      this.croupierPoints += this.getValueCard(
        renderedCard.getAttribute("value")
      );
      this.croupierCounter.innerHTML = this.croupierPoints;

      this.croupierTable.appendChild(renderedCard);
    }

    this.usedNumber.push(renderedCard);
    this.tail.splice(random, 1);
  };

  //
  //
  initialGame = () => {
    this.generateTail();
    this.renderCard(0);
    this.renderCard(0);
    this.renderCard(1);

    this.options.forEach(option => {
      option.addEventListener("click", () => {
        switch (option.getAttribute("option")) {
          case "hit":
            return this.hit();
          case "split":
            return this.split();
          case "double":
            return this.double();
          case "stand":
            return this.stand();
        }
      });
    });

    // this.buttonHit.addEventListener("click", () =>
    //   this.renderCard(_.random(0, 1))
    // );
  };
  stand = () => {};
  hit = () => {
    this.renderCard(1);
  };

  getValueCard = number => {
    switch (number) {
      case "J":
        return 10;
      case "Q":
        return 10;
      case "K":
        return 10;
      case "A":
        return 10;
      default:
        return parseInt(number);
    }
  };
  generateCenter(char) {
    let center = document.createElement("DIV");
    center.setAttribute("class", "center");
    let centerText = document.createTextNode(char);
    center.appendChild(centerText);

    return center;
  }
  generateNumber(char, number, rotate) {
    var cardnumber = document.createElement("DIV");
    rotate
      ? cardnumber.setAttribute("class", "number number--rotate")
      : cardnumber.setAttribute("class", "number");
    var cardnumberOne = document.createElement("DIV");
    var cardnumberOneText = document.createTextNode(number);
    cardnumberOne.appendChild(cardnumberOneText);
    cardnumber.appendChild(cardnumberOne);

    cardnumberOne = document.createElement("DIV");
    cardnumberOneText = document.createTextNode(char);
    cardnumberOne.appendChild(cardnumberOneText);
    cardnumber.appendChild(cardnumberOne);
    return cardnumber;
  }

  generateTail = () => {
    this.numbersList.map((number, index) => {
      this.charsList.forEach((char, indexchar) => {
        const card = document.createElement("DIV");
        card.setAttribute("class", "card");
        card.setAttribute("value", number);
        card.setAttribute("idTail", `${number}${char}`);
        indexchar > 1 ? card.setAttribute("class", " card card-red") : null;
        card.appendChild(this.generateNumber(char, number, 0));
        //center
        card.appendChild(this.generateCenter(char));
        //   // bottom
        card.appendChild(this.generateNumber(char, number, 1));

        this.tail.push(card);
      });
    });
  };
}
