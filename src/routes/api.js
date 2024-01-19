// import PatientController

// import express
const express = require("express");

// membuat object router
const router = express.Router();
// import controller
const patientController = require("../controllers/patientController");

/**
 * Membuat routing
 */
router.get("/", (req, res) => {
  res.send("Hello Covid API Express");
});

// Membuat routing patient
// Get All Resources
router.get('/patients', patientController.index);

// Add Resource
router.post('/patients', patientController.store);

// Edit Resource
router.put('/patients/:id', patientController.update);

// Delete Resource
router.delete('/patients/:id', patientController.destroy);

// Get One Resource
router.get('/patients/:id', patientController.show);

// Search Resource by Name
router.get('/patients/search/:name', patientController.search);

// Get Positive Resources
router.get('/patients/status/positive', patientController.positive);

// Get Recovered Resources
router.get('/patients/status/recovered', patientController.recovered);

// Get Dead Resources
router.get('/patients/status/dead', patientController.dead);

module.exports = router;