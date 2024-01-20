// import Model Patient
const express = require('express');
const router = express.Router();

const PatientController = require('../controllers/patientController');
const PatientModel = require("../models/patientModel");


// buat class PatientController
class PatientController {
  // Get All Resources
  async index(req, res) {
    try {
      const result = await PatientModel.getAll();

      if (result.length > 0) {
        res.status(200).json({
          message: 'Get All Resource',
          data: result,
          statusCode: 200
        });
      } else {
        res.status(200).json({
          message: 'Data is empty',
          statusCode: 200
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // Add Resource
  async store(req, res) {
    try {
      // Dapatkan data dari request body
      const patientData = req.body;
  
      // Validasi data
      if (!patientData.name || !patientData.age || !patientData.status) {
        return res.status(422).json({
          message: 'All fields must be filled correctly',
          statusCode: 422
        });
      }
  
      // Menambahkan data pasien baru ke database
      const result = await PatientModel.add(patientData);
  
      // Kirim hasil operasi ke client
      res.status(201).json({
        message: 'Resource is added successfully',
        data: result,
        statusCode: 201
      });
    } catch (error) {
      // Tangani kesalahan yang mungkin terjadi selama proses
      console.error('Error in store:', error);
      res.status(500).json({
        message: 'Internal Server Error',
        statusCode: 500
      });
    }
  }
  

  // Edit Resource
  async update(req, res) {
    try {
      // Dapatkan ID dari parameter URL
      const patientId = req.params.id;
      // Dapatkan data dari request body
      const patientData = req.body;

      const existingPatient = await PatientModel.getPatientById(patientId);

      // Validasi apakah resource ditemukan
      if (!existingPatient) {
        return res.status(404).json({
          message: 'Resource not found',
          statusCode: 404
        });
      }

      // Update resource dengan data yang diberikan
      const result = await PatientModel.updatePatient(patientId, patientData);

      res.status(200).json({
        message: 'Resource is updated successfully',
        data: result,
        statusCode: 200
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }


  // Delete Resource
  async destroy(req, res) {
    try {
      // Dapatkan ID dari parameter URL
      const patientId = req.params.id;

      const existingPatient = await PatientModel.getPatientById(patientId);

      // Validasi apakah resource ditemukan
      if (!existingPatient) {
        return res.status(404).json({
          message: 'Resource not found',
          statusCode: 404
        });
      }

      // Hapus resource dengan ID yang diberikan
      await PatientModel.deletePatient(patientId);

      res.status(200).json({
        message: 'Resource is deleted successfully',
        statusCode: 200
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // Get One Resource
  async show(req, res) {
    try {
      // Dapatkan ID dari parameter URL
      const patientId = req.params.id;

      // Mendapatkan single resource dengan ID yang diberikan
      const result = await PatientModel.getPatientById(patientId);

      // Validasi apakah resource ditemukan
      if (!result) {
        return res.status(404).json({
          message: 'Resource not found',
          statusCode: 404
        });
      }

      res.status(200).json({
        message: 'Get Detail Resource',
        data: result,
        statusCode: 200
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // Search Resource by Name
  async search(req, res) {
    try {
      // Dapatkan nama dari parameter URL
      const name = req.params.name;

      // Mencari resource berdasarkan nama
      const result = await PatientModel.searchByName(name);

      // Validasi apakah resource ditemukan
      if (result.length > 0) {
        res.status(200).json({
          message: 'Get searched resource',
          data: result,
          statusCode: 200
        });
      } else {
        res.status(404).json({
          message: 'Resource not found',
          statusCode: 404
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // Get Positive Resources
  async positive(req, res) {
    try {
      // Mendapatkan resource yang positif
      const result = await PatientModel.getPositive();

      res.status(200).json({
        message: 'Get positive resource',
        total: result.length,
        data: result,
        statusCode: 200
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // Get Recovered Resources
  async recovered(req, res) {
    try {
      // Mendapatkan resource yang sembuh
      const result = await PatientModel.getRecovered();

      res.status(200).json({
        message: 'Get recovered resource',
        total: result.length,
        data: result,
        statusCode: 200
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // Get Dead Resources
  async dead(req, res) {
    try {
      // Mendapatkan resource yang meninggal
      const result = await PatientModel.getDead();

      res.status(200).json({
        message: 'Get dead resource',
        total: result.length,
        data: result,
        statusCode: 200
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new PatientController();