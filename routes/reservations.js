const express = require("express");
const router = express.Router();
const { getAllReservations, createReservation, updateReservation, deleteReservation } = require("../controllers/reservations");

router.get("/", getAllReservations);
router.post("/", createReservation);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);

module.exports = router;
