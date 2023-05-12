const start = document.getElementById("start");

start.addEventListener("click", () => {
    start.style.display = "none";
    let m = new Memory();
});

class Memory {
    constructor() {
        this.watch = new Watch(); //this class has properties that are instantiations of an entirely different class
        this.deck = this.makeCards();
        this.renderCards();
        this.i = document.getElementById('instructions');
        this.players = [new Player('Num1'), new Player('Num2')];
        this.currentPlayer = this.players[0];
        this.startGame();
    }

    startGame() {
        this.i.innerText = `Both players, start memorizing. You have 10 seconds`;
        // this.i.innerText = `${this.currentPlayer.name}, it's your turn`;
    }

    nextRound(card) {

        //this function makes sense, but it is so incomplete that it will likely lead to several bugs if you don't fully understand this code, and the way to code moving forward;

        //Reach out if you have questions!

        let player = this.currentPlayer;
        player.hand.push(card);
        console.log(`${player.name} picked a ${card.color} ${card.emoji}`);
        if (player.hand.length < 2) { return }

        if (player.hand[0].emoji === player.hand[1].emoji) {
            console.log(`You have a match!`);
        } else {
            console.log(`No match!`);
            player.hand = [];
            this.currentPlayer = this.players[0].name === player.name ? this.players[1] : this.players[0];
        }
        console.log(player.hand);
    }

    makeCards() {
        let cards = [];
        let emojies = ['🦄','🐲','🐢','🐉','🦖','🦎','🦦','🦈','🐬','🐳','🦜','🦤','🐧',];
        let colors = ["red","blue","yellow","green"];

        
        for (let e of emojies) {
            for (let c of colors) {
                cards.push(new Card(e,c))
            }
        }
        
        for (var i = cards.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
        }
        
        return cards;
    }

    renderCards() {
        let board = document.getElementById('memoryBg');
        
        board.innerHTML = '';
        board.setAttribute('class','board');
        for (let c of this.deck) {
            //make a card
            let card = document.createElement('h2');
            card.setAttribute('class','card');
            card.style.backgroundColor = c.color;
            card.innerText = c.emoji;
            card.addEventListener('click', () => {
                this.nextRound(c);
            });
            board.append(card);

        }
        

    }

    startTimer() {
        this.watch.startTimer();
    }
    
}

class Watch {
    constructor() {
        this.mode = "timer"; //timer counts down, stop watch counts up 
        //only switch between "TIMER" AND "STOPWATCH"
        this.count = 1
        this.seconds = 10;
        this.miliseconds = 1000;
        // get the timer element
        this.stopwatchFace = document.getElementById("time");

    }
    
    startTimer() {
        const miliSeconds = 100 * this.seconds; 
        let time = miliSeconds; 
        this.timer(time);
      
        const interval = setInterval(() => { 
          time--; 
          if (time >= 0) {
            document.getElementById("time").innerText = this.formatTime(time);
          } else {
            clearInterval(interval);
            document.getElementById("time").innerText = "Time's Up!";
            startButton.style.display = "block";
          }
        }, 10);
    }
    
    timer(time) {
        document.getElementById("time").innerText = this.formatTime(time);
    }
    
    formatTime(time) {
        let minutes = Math.floor(time / 6000);
        let seconds = Math.floor((time % 6000) / 100);
        let miliSeconds = time % 100;
    
        // format values to have at least two digits
        
        minutes = minutes.toString().padStart(2, '0');
        seconds = seconds.toString().padStart(2, '0');
        miliSeconds = miliSeconds.toString().padStart(2, '0');
    
        return `${minutes}:${seconds}:${miliSeconds}`;
    }
    
}

class Player{
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.hand = [];
    }
}

class Card {
    constructor(emoji, color) {
        this.emoji = emoji;
        this.color = color;
    }
}
