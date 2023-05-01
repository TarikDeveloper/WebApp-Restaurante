// controllers/auth.js
const db = require("../database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  db.run(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Error registering new user" });
      }
      res.status(201).json({ message: "User registered successfully" });
    }
  );
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Error logging in" });
    }

    if (!row) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, row.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = jwt.sign({ id: row.id }, "secret_key", { expiresIn: "1h" });
    res.status(200).json({ message: "Logged in successfully", token });
  });
};
