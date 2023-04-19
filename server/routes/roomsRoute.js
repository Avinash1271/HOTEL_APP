const express = require('express');
const router = express.Router();
const Rooms = require('../models/rooms');

router.get("/getAllRooms", async (req, res) => {
  try {
    const rooms = await Rooms.find({});
    res.send(rooms);
  } catch (error) {
    return res.status(400).send({ message: error });
  }
});

router.post("/getRoomById", async (req, res) => {
  const roomid = req.body.roomid;
  try {
    const room = await Rooms.findOne({ _id: roomid });
    res.send(room);
  } catch (error) {
    return res.status(400).send({ message: error });
  }
});

module.exports = router;
