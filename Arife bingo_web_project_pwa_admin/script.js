if (window.innerWidth < 768 || /Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    alert("This application is only available on desktop.");
    window.location.href = "https://your-redirect-url.com"; // Optional: Redirect mobile users
}
class BingoCasino {
    constructor() {
        this.balance = 1000;
        this.currentNumbers = [];
        this.calledNumbers = [];
        this.isGameActive = false;
    }

    newGame() {
        if (this.balance < 50) {
            this.showStatus("Insufficient funds!", "red");
            return;
        }
        
        this.balance -= 50;
        this.updateBalance();
        this.generateBoard();
        this.isGameActive = true;
        this.showStatus("New game started! Match 5 in a row to win $500!", "gold");
    }

    generateBoard() {
        const board = document.getElementById("board");
        board.innerHTML = "";
        
        // Generate 25 unique numbers (1-75)
        this.currentNumbers = [];
        while(this.currentNumbers.length < 25) {
            const num = Math.floor(Math.random() * 75) + 1;
            if (!this.currentNumbers.includes(num)) this.currentNumbers.push(num);
        }

        // Create cells
        this.currentNumbers.forEach((num, index) => {
            const cell = document.createElement("div");
            cell.className = "bingo-cell";
            cell.textContent = num;
            cell.onclick = () => this.markCell(cell);
            board.appendChild(cell);
        });
    }

    callNumber() {
        if (!this.isGameActive) return;
        
        const remaining = this.currentNumbers.filter(n => !this.calledNumbers.includes(n));
        if (remaining.length === 0) {
            this.showStatus("All numbers called!", "red");
            return;
        }

        const number = remaining[Math.floor(Math.random() * remaining.length)];
        this.calledNumbers.push(number);
        this.showStatus(`Called Number: ${number}`, "white");
    }

    markCell(cell) {
        if (!this.isGameActive) return;
        cell.classList.toggle("marked");
    }

    checkWin() {
        const cells = Array.from(document.getElementsByClassName("bingo-cell"));
        const winPatterns = [
            // Rows
            [0,1,2,3,4], [5,6,7,8,9], [10,11,12,13,14],
            [15,16,17,18,19], [20,21,22,23,24],
            // Columns
            [0,5,10,15,20], [1,6,11,16,21], [2,7,12,17,22],
            [3,8,13,18,23], [4,9,14,19,24],
            // Diagonals
            [0,6,12,18,24], [4,8,12,16,20]
        ];

        for (const pattern of winPatterns) {
            if (pattern.every(index => cells[index].classList.contains("marked"))) {
                this.balance += 500;
                this.updateBalance();
                this.isGameActive = false;
                this.showStatus("BINGO! You won $500! 🎉", "green");
                return;
            }
        }
        
        this.showStatus("No winning pattern yet...", "gold");
    }

    updateBalance() {
        document.getElementById("balance").textContent = this.balance;
    }

    showStatus(message, color) {
        const status = document.getElementById("status");
        status.textContent = message;
        status.style.color = color;
    }
}

// Initialize game
const casino = new BingoCasino();
