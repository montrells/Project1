/*
*--------------------------------------------------------------------------------------------------------
*                                GOOFIE_FRUITYPANTS
*                                ZEB- INSPIRE;
*                                JOE- ENFORCES;
*
* */




montrellGame =goofieFruityFunpants(); //calling the game



function goofieFruityFunpants() {  //making a kind of object out of this program with "this" changed all the named functions /Thus calling everything as a single function
    this.goofieDiv = document.getElementById("GOOFIE_FRUITY_FUNPANTS")//GOOFIE_FRUITY_FUNPANTS is now stored in goofieDiv

//goofieDiv.innerHTML = "Hello World!"; //now goofieDiv is calling innerHTML method to display "Hello World" //TESTING
    /*
    * ---------------------------------------------------------------------------------------------------
    *
    *                                  8 PROPERTIES
    *
    *
    *
    *
    * */

    this.sizeOfCard = 150; //created a variable of the size parameter inside the function
    this.cardSpacing = 10; //same way below
    this.gameWidth = 4;
    this.gameHeight = 4;
    this.card1 = null;
    this.card2 = null;
    this.timeOut =null;
    this.match = 0;


    /*
   * -----------------------------------------------------------------------------------------------------
   *                                         FUNCTIONS
   *                                   1*goofieFruityFunpants()= the object
   *
   *                                   ---------------encapsulated--------------------
   *
   *                                   1*gridCreation =Draws out the grid //called at the end of the program
   *                                   2*createCard() =Creates and Position cards/ beautify
   *                                   3*cardClicking() = Detects events
   *                                   4*checkCardsWait() =delays the cardClicking function 1 second
   *                                   5*won()          =Displays you won after a win
   *
   * ----------------------------------------------------------------------------------------------------
   * */



    this.gridCreation=function(horizontal, vertical) {
        //  var cardArray = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7]; //for testing only
        var cardArray = []; //to loop through all the cards;

        for (var i=0; i<gameWidth*gameHeight/2; i++){
            cardArray.push(i);
            cardArray.push(i);
        }

        //The shuffle array
        var shuffle = [];
        while (cardArray.length > 0) {//while something is still inside, that's 16 cards...
            var random = Math.floor(Math.random()*cardArray.length); //Math.floor makes the resulting pick and integer
            shuffle.push(cardArray[random]); //pushing shuffle to the cardArray at random number chosen pushed out
            cardArray.splice(random,1); //get's rid of the saved card. Refresh start.
        }
        for (var x = 0; x < horizontal; x++) {  //column loop
            for (var y = 0; y < vertical; y++) {  //row loop
                cardCreate(shuffle.pop(), x, y);  //uses the last value, now shuffled
            }
        }
    }
//-------------------------------------------------------
//below is test code
    /*
    //creating a card at position 0/0
    cardCreate(1,0,0);    //adjusting the x and y axis
    cardCreate(4,1,0);    //card, x, y
    cardCreate(5,1,1);
    ------------------------------------------------------------*/


//put this code inside a function called cardCreation
    this.cardCreate=function(cardNumber, positionX, positionY) {
//create a card
        var card = document.createElement("img");// creating a new image "tag"
        card.number = cardNumber; //I am creating a property named number to use on the images
//source property will show to the card what image, and give it a path to access it.
        card.src = "images/cardback.png"; //concatenating card number to the word card .png
        card.style.position = "absolute";
        //card.style.border = "solid"; // giving it a solid border
        card.style.left = (positionX*(sizeOfCard+cardSpacing)+cardSpacing)+"px"; //adjusting position of picture x axis ... using concatenation (pixel+margin+...)
        card.style.top = (positionY*(sizeOfCard+cardSpacing)+cardSpacing)+"px";  // y axis
        card.style.width = "150px"; //adjusting the width of the picture
        card.style.height = "150px"; //adjusting height
        card.onclick = cardClicking; //calling the click card function into the onclick for every card created
        goofieDiv.appendChild(card);
//appending the card to the game
        goofieDiv.appendChild(card);
    }


//goofieDiv is linked with the cardClicking function to detect events
    this.cardClicking=function(event) { //lets us know what card was clicked
        // playSound("click.mp3");  //for adding sound later
        if (timeOut !== null){  //if customer is not patient, clear the one second wait and just start again
            clearTimeout(timeOut); //clearing the time only to call the checkCardsWait method again. to speed things up
            checkCardsWait();
        }
        var card = event.target;  //storing the result of the clicking inside the card variable
        //alert(card.number);  //is for testing
        card.src = "images/card" + card.number + ".png"; //This line shows the card, if statement is also protecting the code

        if (card1 == null) {
            card1 = card;  //setting the variable card equal to these two new conditions.
        } else if (card1 === card){
            //if the same card is click a second time,-- nothing to do. no code.
            //or
            card1.src = "images/cardback.png"; // Turns the card back over if clicked
            card1 = null;

        }else if (card2 == null) {
            card2 = card;
            timeOut=setTimeout(checkCardsWait, 1000); //saying wait one second before proceeding
        }
    }

    this.checkCardsWait=function() { //function performs after one second

        if (card1.number === card2.number){  //checking to see if the cards are the same
            goofieDiv.removeChild(card1);  //if so disappear
            goofieDiv.removeChild(card2);
            // playSound("match.mp3"); for adding sound later
            match++;
            if (match >= gameWidth*gameHeight/2){
                won();
            }
        }else {
            card1.src = "images/cardback.png"; //Turns the card back over.
            card2.src = "images/cardback.png";
        }
        card1=null; //setting cards 1 and 2 back to its original state of null
        card2=null;
        timeOut=null; //setting it back to the null default
    }

    this.won=function(){
        var visible = document.getElementById("Won").style.visibility = "visible"; //Style visibility shown only after the win
        //visible.style.position("absolute");
       // visible.style.left("150px");
        //visible.style.top("150px");
    }
/*
    this.playSound=function(fileName) {
        var audio = new Audio(fileName);
        audio.play();

    }*/




    //calling the grid to make # of rows and # of columns
    this.gridCreation(gameWidth,gameHeight);


    return this; //this game
}

