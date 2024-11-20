const express = require('express');
const patientDetails = require('../model/signup.js');

const router = express.Router();



// Create a new entry
router.post('/signup', async (req, res) => {
  const { name, email ,password} = req.body;

  try {
    const newcustomer = new patientDetails({ name, email ,password});
    await newcustomer.save();
    res.status(201).json(newcustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await patientDetails.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if password matches
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Successful login
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

