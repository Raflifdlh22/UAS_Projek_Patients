// import database
const db = require("../config/database");
// membuat class Patient
class PatientModel {
  // Mendapatkan semua data pasien
  get() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM patients', (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Menambahkan data pasien baru
  store(patientData) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO patients SET ?', [patientData], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  // Memperbarui data pasien berdasarkan ID
  update(patientId, patientData) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE patients SET ? WHERE id = ?', [patientData, patientId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  // Menghapus data pasien berdasarkan ID
  destroy(patientId) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM patients WHERE id = ?', [patientId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  // Mendapatkan data pasien berdasarkan ID
  show(patientId) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM patients WHERE id = ?', [patientId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }

  // Mencari data pasien berdasarkan nama
  search(name) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM patients WHERE name LIKE ?', [`%${name}%`], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Mendapatkan data pasien berdasarkan status positif
  positive() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM patients WHERE status = ?', ['positive'], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Mendapatkan data pasien berdasarkan status sembuh
  recovered() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM patients WHERE status = ?', ['recovered'], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Mendapatkan data pasien berdasarkan status meninggal
  dead() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM patients WHERE status = ?', ['dead'], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = new PatientModel();