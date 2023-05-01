// controllers/reservations.js
const db = require("../database");

exports.getAllReservations = async (req, res) => {
  db.all("SELECT * FROM reservations", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Error retrieving reservations" });
    }
    res.status(200).json(rows);
  });
};

exports.createReservation = async (req, res) => {
  const { table_number, start_time, end_time, user_id } = req.body;

  // Implementar a lógica para verificar disponibilidade e horário permitido

  db.run(
    "INSERT INTO reservations (table_number, start_time, end_time, user_id) VALUES (?, ?, ?, ?)",
    [table_number, start_time, end_time, user_id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Error creating reservation" });
      }
      res.status(201).json({ message: "Reservation created successfully", id: this.lastID });
    }
  );
};

exports.updateReservation = async (req, res) => {
  const { id } = req.params;
  const { table_number, start_time, end_time, user_id } = req.body;

  // Implementar a lógica para verificar disponibilidade e horário permitido

  db.run(
    "UPDATE reservations SET table_number = ?, start_time = ?, end_time = ?, user_id = ? WHERE id = ?",
    [table_number, start_time, end_time, user_id, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Error updating reservation" });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Reservation not found" });
      }
      res.status(200).json({ message: "Reservation updated successfully" });
    }
  );
};

exports.deleteReservation = async (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM reservations WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Error deleting reservation" });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.status(200).json({ message: "Reservation deleted successfully" });
  });
};
