class BingoCasino {
    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!this.currentUser) {
            window.location.href = 'login.html';
        }
        this.balance = this.currentUser.balance;
        this.numbers = [];
        this.calledNumbers = [];
        this.isGameActive = false;
        this.speechSynth = window.speechSynthesis;
        this.voices = [];
        
        this.initVoices();
        this.initGame();
    }

    initVoices() {
        this.speechSynth.onvoiceschanged = () => {
            this.voices = this.speechSynth.getVoices();
        };
    }

    initGame() {
        this.updateBalance();
        document.querySelectorAll('.bingo-cell').forEach(cell => {
            cell.onclick = () => this.toggleCell(cell);
        });
    }

    newGame() {
        if (this.balance < 50) {
            this.showStatus("Insufficient funds!", "red");
            return;
        }

        this.balance -= 50;
        this.numbers = this.generateNumbers();
        this.calledNumbers = [];
        this.isGameActive = true;
        this.renderBoard();
        this.showStatus("New game started! Match 5 to win $500!", "gold");
        this.updateBalance();
    }

    generateNumbers() {
        const numbers = new Set();
        while(numbers.size < 25) {
            numbers.add(Math.floor(Math.random() * 75) + 1);
        }
        return Array.from(numbers);
    }

    callNumber() {
        if (!this.isGameActive) return;

        const remaining = this.numbers.filter(n => !this.calledNumbers.includes(n));
        if (remaining.length === 0) {
            this.showStatus("All numbers called!",
