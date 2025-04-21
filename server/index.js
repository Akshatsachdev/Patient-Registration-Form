const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PatientDB',
    password: 'ak1102s',
    port: 5432,
});

// Create table if not exists
pool.query(`
  CREATE TABLE IF NOT EXISTS patients (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER,
    gender TEXT,
    contact TEXT,
    email TEXT,
    aadhar TEXT,
    purpose TEXT,
    patient_id TEXT
  )
`);


// Register patient
app.post('/register', async (req, res) => {
  const { name, age, gender, contact, email, aadhar, purpose } = req.body;

  const patientId = `PAT-${contact.slice(-4)}-${Math.floor(100 + Math.random() * 900)}`;

  try {
    await pool.query(
      'INSERT INTO patients (name, age, gender, contact, email, aadhar, purpose, patient_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [name, age, gender, contact, email, aadhar, purpose, patientId]
    );

    res.status(200).json({ message: 'Patient registered', patientId });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering patient');
  }
});

  

// 🔍 Get ALL patients
app.get('/patients', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM patients');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Error fetching patients');
  }
});

// 🔍 Get patient by contact number
app.get('/patient/:contact', async (req, res) => {
    const { contact } = req.params;
    console.log("Searching for contact:", contact); // 👈 LOG IT
    try {
      const result = await pool.query('SELECT * FROM patients WHERE contact = $1', [contact]);
      console.log("Query result:", result.rows); // 👈 LOG RESULT
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).send('Patient not found');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching patient');
    }
  });
  

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
