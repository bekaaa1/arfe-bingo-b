function registerUser(username, password) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    localStorage.setItem(username, hashedPassword);
    alert("User registered successfully!");
}

// Predefined admin account
const adminUsername = "admin";
const adminPassword = "admin123";
const adminSalt = bcrypt.genSaltSync(10);
const adminHashedPassword = bcrypt.hashSync(adminPassword, adminSalt);
localStorage.setItem(adminUsername, adminHashedPassword);

function loginUser(username, password) {
    const storedHash = localStorage.getItem(username);
    if (storedHash && bcrypt.compareSync(password, storedHash)) {
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password.");
    }
}
