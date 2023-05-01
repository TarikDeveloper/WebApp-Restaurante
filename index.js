const express = require("express");
const app = express();
const db = require("./database");
const authRoutes = require("./routes/auth");
const reservationRoutes = require("./routes/reservations");

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/reservations", reservationRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
