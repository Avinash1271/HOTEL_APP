const express = require('express');
const router = express.Router();
const Users = require('../models/users');

router.post("/book/create", async (req, res) => {
    
    console.log('endpoint called');
    const newuser = new Users(req.body);
    console.log(req.body);
    try {
        const user = await newuser.save();
        res.send("Booking successful");
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: error });
    }
});


router.get("/view", async (req, res) => {
    try {
      const user = await Users.find({});
      res.send(user);
    } catch (error) {
      return res.status(400).send({ message: error });
    }
});

// Update user by ID
router.put('/update/:id', async (req, res) => {
    console.log(req.body);
    console.log(req.params.id);

    try {
      const user = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.send(user);
    } catch (error) {
        console.log(error);
      return res.status(400).send({ message: error });
    }
});


// Delete user by ID
router.delete('/delete/:id', async (req, res) => {
    try {
      const user = await Users.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.send(user);
    } catch (error) {
        console.log(error);
      return res.status(400).send({ message: error });
    }
});

module.exports = router;
